import bcrypt from "bcryptjs";
import db from "../config/db.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import transporter from "../config/mail.js";


// register user
export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.query(
            "CALL sp_register_user(?, ?, ?)",
            [name, email, hashedPassword]
        );

        const token = jwt.sign(
            { email, name },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
        );


        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            name,
            email,
            token
        });

    } catch (err) {
        console.error("Error:", err);

        if (err.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                success: false,
                message: "Email already exists"
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};



// login user
export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const [rows] = await db.query(
            "SELECT * FROM tbl_users WHERE email = ?",
            [email]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = rows[0];

        if (user.auth_provider !== "local") {
            return res.status(400).json({
                message: "This account is registered via Google. Please use Google login."
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { id: user.user_id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE || "7d" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.user_id,
                name: user.name,
                email: user.email,
                profile_img: user.profile_img,
            },
        });

    } catch (err) {
        next(err);
        console.error("Login error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};


// forgot-password
export const forgotPasswordLink = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ error: "Email required" });

        const [users] = await db.execute(
            "SELECT * FROM tbl_users WHERE email = ?",
            [email]
        );

        if (users.length === 0) {
            return res.status(400).json({ error: "User not found" });
        }

        const user = users[0];

        const token = crypto.randomBytes(32).toString("hex");
        const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 mins

        await db.execute(
            "INSERT INTO tbl_forgot_password (user_id, token, expires_at) VALUES (?, ?, ?)",
            [user.user_id, token, expiresAt]
        );

        const resetLink = `${process.env.FRONTEND_URL}/reset_password/${token}`;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset",
            text: `Hello Sir,

You requested a password reset. Please click the link below to reset your password:
${resetLink}

Note: This link will expire in 30 minutes.

If you did not request a password reset, please ignore this email.`
        });

        res.json({
            message: "Password reset link sent to your email",
            token
        });
    } catch (err) {
        next(err);
    }
};




// reset-password
export const resetPasswordWithLink = async (req, res, next) => {
    try {
        const { token, newPassword, confirmPassword } = req.body;

        if (!token || !newPassword || !confirmPassword) {
            return res.status(400).json({
                error: "Token, new password and confirm password are required"
            });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
        if (!passwordRegex.test(newPassword)) {
            return res.status(400).json({
                error: "Password must be at least 6 characters long, include at least one uppercase letter and one special character"
            });
        }

        const [tokenRows] = await db.execute(
            "SELECT * FROM tbl_forgot_password WHERE token = ? AND expires_at > NOW() AND used = 0",
            [token]
        );

        if (tokenRows.length === 0) {
            return res.status(400).json({ message: "Invalid, expired, or already used token" });
        }

        const tokenData = tokenRows[0];
        const userId = tokenData.user_id;

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await db.execute(
            "UPDATE tbl_users SET password = ? WHERE user_id = ?",
            [hashedPassword, userId]
        );

        await db.execute(
            "UPDATE tbl_forgot_password SET used = 1 WHERE id = ?",
            [tokenData.id]
        );

        res.json({ message: "User password has been reset successfully" });

    } catch (error) {
        next(error);
    }
};



// upload profile image
export const uploadProfileImage = async (req, res, next) => {
    try {
        const { user_id } = req.body;

        if (!req.file || !user_id) {
            return res.status(400).json({ message: "Image file and user_id required" });
        }

        const profilePath = `${req.protocol}://${req.get("host")}/uploads/profile_images/${req.file.filename}`;

        const [result] = await db.execute(
            "UPDATE tbl_users SET profile_img = ? WHERE user_id = ?",
            [profilePath, user_id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "Profile image added successfully",
            image_url: profilePath,
        });
    } catch (error) {
        next(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// get user profile
export const getUserProfile = async (req, res, next) => {
    try {
        const { user_id } = req.params;

        if (!user_id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const [rows] = await db.execute(
            "SELECT * FROM tbl_users WHERE user_id = ?",
            [user_id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = rows[0];

        res.status(200).json({
            message: "User profile fetched successfully",
            user,
        });
    } catch (error) {
        next(error);
        res.status(500).json({ message: "Internal server error" });
    }
};



// update user profile
export const updateUserProfile = async (req, res, next) => {
    try {
        const { user_id } = req.params;
        const { name, current_password, new_password, confirm_password } = req.body;

        if (!user_id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const [rows] = await db.execute(
            "SELECT * FROM tbl_users WHERE user_id = ?",
            [user_id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = rows[0];

        if (name && !new_password) {
            await db.execute(
                "UPDATE tbl_users SET name = ? WHERE user_id = ?",
                [name, user_id]
            );

            return res.status(200).json({ message: "Name updated successfully" });
        }

        if (new_password || confirm_password || current_password) {

            if (!current_password || !new_password || !confirm_password) {
                return res.status(400).json({ message: "All password fields are required" });
            }

            const match = await bcrypt.compare(current_password, user.password);

            if (!match) {
                return res.status(400).json({ message: "Current password is incorrect" });
            }

            if (new_password !== confirm_password) {
                return res.status(400).json({ message: "New passwords do not match" });
            }

            const hashedPassword = await bcrypt.hash(new_password, 10);

            await db.execute(
                "UPDATE tbl_users SET name = COALESCE(?, name), password = ? WHERE user_id = ?",
                [name, hashedPassword, user_id]
            );

            return res.status(200).json({ message: "Password updated successfully" });
        }

        res.status(400).json({ message: "Nothing to update" });

    } catch (error) {
        next(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
