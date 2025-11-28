import db from "../config/db.js";
import slugify from "slugify";
import fs from "fs";
import path from "path";


export const insertGuide = async (req, res) => {
    try {
        const { name, title, experience_years, language_1, language_2, language_3, whatsapp, email, status, created_by } = req.body;

        const profile_img = req.file
            ? `${req.protocol}://${req.get("host")}/uploads/guide/${req.file.filename}`
            : null;

        let slug = slugify(name, { lower: true, strict: true });
        let finalSlug = slug;
        let count = 1;

        while (true) {
            const [existing] = await db.execute(
                "SELECT guide_id FROM tbl_guides WHERE slug = ?",
                [finalSlug]
            );
            if (existing.length === 0) break;

            finalSlug = `${slug}-${count}`;
            count++;
        }

        const query = `CALL sp_insert_guide(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [
            name,
            finalSlug,
            title,
            experience_years,
            profile_img,
            language_1,
            language_2,
            language_3,
            whatsapp,
            email,
            status,
            created_by || null
        ];

        const [insertResult] = await db.query(query, values);

        const insertedId = insertResult[0]?.inserted_id || insertResult?.insertId;

        const [lastRow] = await db.query(
            "SELECT * FROM tbl_guides WHERE slug = ? LIMIT 1",
            [finalSlug]
        );

        return res.status(201).json({
            status: 201,
            message: "Guide added successfully",
            data: lastRow[0]
        });

    } catch (err) {
        console.error("Insert Guide Error:", err);
        return res.status(500).json({
            status: 500,
            message: "Something went wrong",
            error: err.message
        });
    }
};




export const getGuides = async (req, res) => {
    try {
        const [rows] = await db.query(`CALL sp_get_guides()`);

        return res.status(200).json({
            status: 200,
            message: "Guides fetched successfully",
            data: rows[0]
        });

    } catch (err) {
        console.error("Get Guides Error:", err);
        return res.status(500).json({
            status: 500,
            message: "Something went wrong",
            error: err.message
        });
    }
};



export const getGuideBySlug = async (req, res) => {
    try {
        const { slug } = req.params;

        const [rows] = await db.query(`CALL sp_get_guide_by_slug(?)`, [slug]);

        if (!rows[0] || rows[0].length === 0) {
            return res.status(404).json({
                status: 404,
                message: "Guide not found"
            });
        }

        return res.status(200).json({
            status: 200,
            message: "Guide fetched successfully",
            data: rows[0][0]
        });

    } catch (err) {
        console.error("Get Guide By Slug Error:", err);
        return res.status(500).json({
            status: 500,
            message: "Something went wrong",
            error: err.message
        });
    }
};



export const updateGuide = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            name,
            title,
            experience_years,
            language_1,
            language_2,
            language_3,
            whatsapp,
            email,
            status,
            updated_by
        } = req.body;

        const [existingGuideResult] = await db.execute(
            "SELECT * FROM tbl_guides WHERE guide_id = ?",
            [id]
        );

        if (existingGuideResult.length === 0) {
            return res.status(404).json({ message: "Guide not found." });
        }

        const oldGuide = existingGuideResult[0];


        if (req.file && oldGuide.profile_img) {
            try {
                const oldImageName = oldGuide.profile_img.split("/").pop();
                const oldImagePath = path.join("uploads/guide", oldImageName);

                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                    console.log("Old image deleted:", oldImagePath);
                }
            } catch (error) {
                console.log("Error deleting old image:", error);
            }
        }

        const profile_img = req.file
            ? `${req.protocol}://${req.get("host")}/uploads/guide/${req.file.filename}`
            : oldGuide.profile_img;


        let slug = oldGuide.slug;

        if (name && name !== oldGuide.name) {
            let tempSlug = slugify(name, { lower: true, strict: true });
            let finalSlug = tempSlug;
            let count = 1;

            while (true) {
                const [exists] = await db.execute(
                    "SELECT guide_id FROM tbl_guides WHERE slug = ? AND guide_id != ?",
                    [finalSlug, id]
                );

                if (exists.length === 0) break;
                finalSlug = `${tempSlug}-${count}`;
                count++;
            }

            slug = finalSlug;
        }


        const query = `CALL sp_update_guide(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [
            id,
            name || oldGuide.name,
            slug,
            title || oldGuide.title,
            experience_years || oldGuide.experience_years,
            profile_img,
            language_1 || oldGuide.language_1,
            language_2 || oldGuide.language_2,
            language_3 || oldGuide.language_3,
            whatsapp || oldGuide.whatsapp,
            email || oldGuide.email,
            status || oldGuide.status,
            updated_by || null
        ];

        await db.query(query, values);

        const [updatedResult] = await db.execute(
            "SELECT * FROM tbl_guides WHERE guide_id = ?",
            [id]
        );

        return res.status(200).json({
            status: 200,
            message: "Guide updated successfully.",
            data: updatedResult[0]
        });

    } catch (err) {
        console.error("Update Guide Error:", err);
        return res.status(500).json({
            status: 500,
            message: "Something went wrong.",
            error: err.message
        });
    }
};


export const deleteGuide = async (req, res) => {
    try {
        const { id } = req.params;

        const [existingGuide] = await db.execute(
            "SELECT * FROM tbl_guides WHERE guide_id = ?",
            [id]
        );

        if (existingGuide.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "Guide not found."
            });
        }

        const guide = existingGuide[0];


        if (guide.profile_img) {
            try {
                const imageRelativePath = guide.profile_img.replace(
                    `${req.protocol}://${req.get("host")}/`,
                    ""
                );

                const imagePath = path.join(process.cwd(), imageRelativePath);

                if (fs.existsSync(imagePath)) {
                    fs.unlink(imagePath, () => { });
                    console.log("Image deleted:", imagePath);
                }
            } catch (err) {
                console.log("Image delete error:", err);
            }
        }

        await db.query("CALL sp_delete_guide(?)", [id]);

        return res.status(200).json({
            status: 200,
            message: "Guide deleted successfully.",
            guideId: id
        });

    } catch (err) {
        console.error("Delete Guide Error:", err);
        return res.status(500).json({
            status: 500,
            message: "Something went wrong.",
            error: err.message
        });
    }
};

