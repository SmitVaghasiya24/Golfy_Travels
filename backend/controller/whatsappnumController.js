import db from "../config/db.js";

export const addOrUpdateWhatsapp = async (req, res) => {
    try {
        const { whatsapp_number } = req.body;

        if (!whatsapp_number) {
            return res.status(400).json({ message: "WhatsApp number is required" });
        }

        const [rows] = await db.execute("SELECT * FROM tbl_whatsapp_number LIMIT 1");

        if (rows.length > 0) {
            await db.execute(
                "UPDATE tbl_whatsapp_number SET whatsapp_number = ? WHERE id = ?",
                [whatsapp_number, rows[0].id]
            );
        } else {
            await db.execute(
                "INSERT INTO tbl_whatsapp_number (whatsapp_number) VALUES (?)",
                [whatsapp_number]
            );
        }

        const [latest] = await db.execute(
            "SELECT whatsapp_number FROM tbl_whatsapp_number LIMIT 1"
        );

        res.status(200).json({
            message: rows.length > 0
                ? "WhatsApp number updated successfully"
                : "WhatsApp number added successfully",
            whatsapp_number: latest[0].whatsapp_number
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};


export const getWhatsapp = async (req, res) => {
    try {
        const [rows] = await db.execute(
            "SELECT whatsapp_number FROM tbl_whatsapp_number LIMIT 1"
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "No WhatsApp number found" });
        }

        res.status(200).json({
            message: "WhatsApp number fetched successfully",
            whatsapp_number: rows[0].whatsapp_number
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};
