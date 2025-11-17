import db from "../config/db.js";

// Add FAQ 
export const addFaq = async (req, res) => {
    const { question, answer } = req.body;

    if (!question || !answer) {
        return res.status(400).json({ message: "Question and answer are required." });
    }

    try {
        await db.query("CALL sp_add_faq(?, ?)", [question, answer]);

        const [lastIdResult] = await db.execute("SELECT LAST_INSERT_ID() AS id");
        const insertedId = lastIdResult[0].id;

        res.status(201).json({
            message: "FAQ added successfully.",
            faq: {
                id: insertedId,
                question,
                answer,
            },
        });
    } catch (err) {
        res.status(500).json({ message: "Internal server error." });
    }
};

// Get all FAQs
export const getAllFaqs = async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT * FROM tbl_faqs ORDER BY id DESC");
        res.status(200).json({
            message: "FAQs fetched successfully",
            FAQs: rows
        });
    } catch (err) {
        res.status(500).json({ message: "Internal server error." });
    }
};

// Get selected FAQ
export const getFaqById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "FAQ ID is required." });
    }

    try {
        const [rows] = await db.execute(
            "SELECT * FROM tbl_faqs WHERE id = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "FAQ not found." });
        }

        res.status(200).json(rows[0]);
    } catch (err) {
        res.status(500).json({ message: "Internal server error." });
    }
};

// Update FAQ
export const updateFaq = async (req, res) => {
    const { id } = req.params;
    const { question, answer } = req.body;

    if (!id || !question || !answer) {
        return res.status(400).json({
            message: "FAQ ID, question, and answer are required."
        });
    }

    try {
        const [existing] = await db.execute(
            "SELECT * FROM tbl_faqs WHERE id = ?",
            [id]
        );

        if (existing.length === 0) {
            return res.status(404).json({ message: "FAQ not found." });
        }

        await db.query("CALL sp_update_faq(?, ?, ?)", [
            id,
            question,
            answer
        ]);

        const [rows] = await db.execute(
            "SELECT * FROM tbl_faqs WHERE id = ?",
            [id]
        );

        const updatedFaq = rows[0];

        res.status(200).json({
            message: "FAQ updated successfully.",
            faq: {
                id: updatedFaq.id,
                question: updatedFaq.question,
                answer: updatedFaq.answer,
                updated_at: updatedFaq.updated_at,
            },
        });
    } catch (err) {
        res.status(500).json({ message: "Internal server error." });
    }
};

// Delete FAQ
export const deleteFaq = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "FAQ ID is required." });
    }

    try {
        const [existing] = await db.execute(
            "SELECT * FROM tbl_faqs WHERE id = ?",
            [id]
        );

        if (existing.length === 0) {
            return res.status(404).json({ message: "FAQ not found." });
        }

        await db.execute("DELETE FROM tbl_faqs WHERE id = ?", [id]);

        res.status(200).json({
            message: "FAQ deleted successfully.",
            deletedId: id,
        });
    } catch (err) {
        res.status(500).json({ message: "Internal server error." });
    }
};
