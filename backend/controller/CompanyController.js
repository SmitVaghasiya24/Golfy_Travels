import db from "../config/db.js";
import slugify from "slugify";


export const addCompany = async (req, res) => {
    try {
        const { company_name, website_url, status, created_by } = req.body;

        if (!company_name) {
            return res.status(400).json({ success: false, message: "Company name is required" });
        }

        const company_slug = slugify(company_name, { lower: true });

        const company_logo = req.file ? `${req.protocol}://${req.get("host")}/uploads/company/${req.file.filename}`
            : null;

        const query = `
        INSERT INTO tbl_companies 
        (company_name, company_slug, company_logo, website_url, status, created_by) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;

        const [result] = await db.execute(query, [
            company_name,
            company_slug,
            company_logo,
            website_url || null,
            status || "active",
            created_by || null,
        ]);

        const [newCompany] = await db.execute(
            "SELECT * FROM tbl_companies WHERE company_id = ?",
            [result.insertId]
        );

        return res.status(201).json({
            success: true,
            message: "Company added successfully",
            data: newCompany[0]
        });
    } catch (error) {
        console.log("Add Company Error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const getCompanies = async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT * FROM tbl_companies ORDER BY company_id DESC");

        return res.json({
            success: true,
            count: rows.length,
            data: rows
        });
    } catch (error) {
        console.log("Get Companies Error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

