import db from '../config/db.js';

export const addDiscountBanner = async (req, res, next) => {
    try {
        const { title, subtitle, price, days_nights, condition_text } = req.body;

        const image = req.file
            ? `${req.protocol}://${req.get("host")}/uploads/coupon/${req.file.filename}`
            : null;

        if (!title || !image) {
            return res.status(400).json({
                success: false,
                message: "Title and image are required."
            });
        }

        const query = `
            INSERT INTO tbl_discount_banners 
            (title, subtitle, price, days_nights, condition_text, image)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        // Insert record
        const [result] = await db.query(query, [
            title,
            subtitle,
            price,
            days_nights,
            condition_text,
            image
        ]);

        // Fetch newly created banner
        const [newData] = await db.query(
            "SELECT * FROM tbl_discount_banners WHERE id = ?",
            [result.insertId]
        );

        return res.status(201).json({
            success: true,
            message: "Discount banner created successfully",
            data: newData[0]  // return created data
        });

    } catch (error) {
        console.error("Banner error:", error);
        next(error);
    }
};



export const getAllDiscountBanners = async (req, res, next) => {
    try {
        const [rows] = await db.query(`
            SELECT *
            FROM tbl_discount_banners
            ORDER BY id DESC
        `);

        return res.status(200).json({
            success: true,
            count: rows.length,
            data: rows
        });

    } catch (error) {
        console.error("Fetch banner error:", error);
        next(error);
    }
};
