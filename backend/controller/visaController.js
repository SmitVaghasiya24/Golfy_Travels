import db from "../config/db.js";
import slugify from "slugify";
import fs from "fs";
import path from "path";

// insert visa country 
export const insertVisaCountry = async (req, res) => {
    try {
        const {
            country,
            min_days,
            max_days,
            notes,
            status,
            created_by,
        } = req.body;

        // Generate slug
        let slug = slugify(country, { lower: true, strict: true });
        let finalSlug = slug;
        let count = 1;

        while (true) {
            const [existing] = await db.execute(
                "SELECT visa_id FROM tbl_visa_countries WHERE slug = ?",
                [finalSlug]
            );
            if (existing.length === 0) break;

            finalSlug = `${slug}-${count}`;
            count++;
        }

        // Thumbnail URL
        const thumbnail = req.file
            ? `${req.protocol}://${req.get("host")}/uploads/visa_country/${req.file.filename}`
            : null;

        if (!country || !min_days || !max_days) {
            return res.status(400).json({
                success: false,
                message: "country, min_days and max_days are required.",
            });
        }

        const query = `CALL sp_insert_visa_country(?, ?, ?, ?, ?, ?, ?, ?)`;

        await db.query(query, [
            country,
            finalSlug,
            min_days,
            max_days,
            notes || null,
            thumbnail,
            status || "inactive",
            created_by || null,
        ]);

        // -----------------------------------------
        // RETURN inserted data in response
        // -----------------------------------------
        return res.status(201).json({
            success: true,
            message: "Visa country added successfully",
            data: {
                country,
                slug: finalSlug,
                min_days,
                max_days,
                notes,
                thumbnail,
                status: status || "inactive",
                created_by: created_by || null,
            }
        });

    } catch (error) {
        console.error("Error inserting visa country:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

// get all visa country 
export const getAllVisaCountries = async (req, res) => {
    try {
        const query = "CALL sp_get_all_visa_countries()";
        const [rows] = await db.query(query);

        const data = rows[0];

        return res.status(200).json({
            success: true,
            count: data.length,
            data: data
        });

    } catch (error) {
        console.error("Error fetching visa countries:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

// get by slug visa country 
export const getVisaCountryBySlug = async (req, res) => {
    try {
        const { slug } = req.params;

        const query = `CALL sp_get_visa_country_with_types_by_slug(?)`;
        const [result] = await db.query(query, [slug]);

        const country = result[0][0];   // First result set = country
        const visaTypes = result[1];    // Second result set = visa types

        if (!country) {
            return res.status(404).json({
                success: false,
                message: "Country not found"
            });
        }

        return res.status(200).json({
            success: true,
            country,
            visa_types: visaTypes
        });

    } catch (error) {
        console.error("Error fetching country with visa types:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};


// update visa country 
export const updateVisaCountry = async (req, res) => {
    try {

        const { id } = req.params;

        const {
            country,
            min_days,
            max_days,
            notes,
            status,
            updated_by
        } = req.body;

        if (!id || !country) {
            return res.status(400).json({
                success: false,
                message: "visa_id and country are required."
            });
        }

        let slug = slugify(country, { lower: true, strict: true });
        let finalSlug = slug;
        let count = 1;

        while (true) {
            const [existing] = await db.execute(
                "SELECT visa_id FROM tbl_visa_countries WHERE slug = ? AND visa_id != ?",
                [finalSlug, id]
            );

            if (existing.length === 0) break;

            finalSlug = `${slug}-${count}`;
            count++;
        }

        const newThumbnail = req.file
            ? `${req.protocol}://${req.get("host")}/uploads/visa_country/${req.file.filename}`
            : null;

        let finalThumbnail = newThumbnail;

        if (!newThumbnail) {
            const [oldThumb] = await db.execute(
                "SELECT thumbnail FROM tbl_visa_countries WHERE visa_id = ?",
                [id]
            );
            finalThumbnail = oldThumb[0]?.thumbnail || null;
        }

        const query = `CALL sp_update_visa_country(?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        await db.query(query, [
            id,
            country,
            finalSlug,
            min_days,
            max_days,
            notes || null,
            finalThumbnail,
            status || "inactive",
            updated_by || null
        ]);

        return res.status(200).json({
            success: true,
            message: "Visa country updated successfully",
            data: {
                visa_id: id,
                country,
                slug: finalSlug,
                min_days,
                max_days,
                notes,
                thumbnail: finalThumbnail,
                status: status || "inactive",
                updated_by: updated_by || null
            }
        });

    } catch (error) {
        console.error("Error updating visa country:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

// delete visa country
export const deleteVisaCountry = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await db.execute(
            "SELECT thumbnail FROM tbl_visa_countries WHERE visa_id = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Country not found",
            });
        }

        const oldThumbnail = rows[0].thumbnail;

        if (oldThumbnail) {
            const filePath = path.join(
                "uploads/visa_country",
                oldThumbnail.split("/").pop()
            );

            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        const query = "CALL sp_delete_visa_country(?)";
        await db.query(query, [id]);

        return res.status(200).json({
            success: true,
            message: "Visa country deleted successfully",
        });

    } catch (error) {
        console.error("Error deleting visa country:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};


// add visa type
export const insertVisaType = async (req, res) => {
    try {
        const {
            country_id,
            type_name,
            price,
            validity_days,
            status,
            created_by
        } = req.body;

        if (!country_id || !type_name || !price) {
            return res.status(400).json({
                success: false,
                message: "country_id, type_name and price are required."
            });
        }

        const query = `CALL sp_insert_visa_type(?, ?, ?, ?, ?, ?)`;

        await db.query(query, [
            country_id,
            type_name,
            price,
            validity_days || null,
            status || "inactive",
            created_by || null
        ]);

        return res.status(201).json({
            success: true,
            message: "Visa type added successfully",
            data: {
                country_id,
                type_name,
                price,
                validity_days: validity_days || null,
                status: status || "inactive",
                created_by: created_by || null
            }
        });

    } catch (error) {
        console.error("Error inserting visa type:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

// get type by country id
export const getVisaTypesByCountry = async (req, res) => {
    try {
        const { country_id } = req.params;

        if (!country_id) {
            return res.status(400).json({
                success: false,
                message: "country_id is required."
            });
        }

        const query = `CALL sp_get_visa_types_by_country(?)`;

        const [rows] = await db.query(query, [country_id]);

        const data = rows[0];

        return res.status(200).json({
            success: true,
            count: data.length,
            data
        });

    } catch (error) {
        console.error("Error fetching visa types:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};


// update visa type
export const updateVisaType = async (req, res) => {
    try {

        const { id } = req.params;

        const {
            country_id,
            type_name,
            price,
            validity_days,
            status,
            updated_by
        } = req.body;



        if (!id || !country_id || !type_name || !price) {
            return res.status(400).json({
                success: false,
                message: "id, country_id, type_name and price are required."
            });
        }

        const query = `CALL sp_update_visa_type(?, ?, ?, ?, ?, ?, ?)`;

        await db.query(query, [
            id,
            country_id,
            type_name,
            price,
            validity_days || null,
            status || "inactive",
            updated_by || null
        ]);

        return res.status(200).json({
            success: true,
            message: "Visa type updated successfully",
            data: {
                id,
                country_id,
                type_name,
                price,
                validity_days: validity_days || null,
                status: status || "inactive",
                updated_by: updated_by || null
            }
        });

    } catch (error) {
        console.error("Error updating visa type:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};



// delete visa type
export const deleteVisaType = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Visa type id is required."
            });
        }

        const [exists] = await db.execute(
            "SELECT id FROM tbl_visa_types WHERE id = ?",
            [id]
        );

        if (exists.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Visa type not found."
            });
        }

        const query = "CALL sp_delete_visa_type(?)";
        await db.query(query, [id]);

        return res.status(200).json({
            success: true,
            message: "Visa type deleted successfully."
        });

    } catch (error) {
        console.error("Error deleting visa type:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};



export const getAllVisaTypes = async (req, res) => {
    try {
        const query = `SELECT * FROM tbl_visa_types`;  

        const [rows] = await db.query(query);

        return res.status(200).json({
            success: true,
            count: rows.length,
            data: rows
        });

    } catch (error) {
        console.error("Error fetching visa types:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};
