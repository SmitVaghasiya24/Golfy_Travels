import db from "../config/db.js";

export const create_contact = async (req, res, next) => {
    try {
        const { full_name, email, phone, destination, message, agreed_terms } = req.body;

        if (!full_name || !email) {
            return res.status(400).json({ message: "Full name and email are required" });
        }

        const agreed = (agreed_terms === true || agreed_terms === "true") ? 1 : 0;

        const adminId = req.user?.admin_id || null;

        await db.query(
            "CALL sp_add_contact_inquiry(?, ?, ?, ?, ?, ?, ?)",
            [full_name, email, phone || null, destination || null, message || null, agreed, adminId]
        );

        res.status(201).json({
            success: true,
            message: "Your inquiry has been submitted successfully",
            contact: {
                full_name,
                email,
                phone,
                destination,
                message,
                agreed_terms: !!agreed
            },
        });
    } catch (err) {
        console.error("Error adding contact inquiry:", err);
        next(err);
    }
};
