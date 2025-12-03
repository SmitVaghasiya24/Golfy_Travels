import db from '../config/db.js';

export const addVisaApplication = async (req, res, next) => {
    try {
        const { country_id, type_id, name, dob, phone, email, age, notes, visa_criteria, created_by } = req.body;

        const file = req.file
            ? `${req.protocol}://${req.get("host")}/uploads/visa_application/${req.file.filename}`
            : null;

        const insertQuery = `CALL sp_visa_application_add(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        await db.query(insertQuery, [
            country_id,
            type_id,
            name,
            dob,
            phone,
            email,
            age,
            notes,
            file,
            visa_criteria || null,
            created_by
        ]);

        const [lastRow] = await db.query(`SELECT * FROM tbl_visa_applications ORDER BY id DESC LIMIT 1`);

        res.status(200).json({
            success: true,
            message: "Visa application submitted successfully",
            data: lastRow[0]
        });

    } catch (error) {
        console.error("Error adding visa application:", error);
        next(error);
    }
};
