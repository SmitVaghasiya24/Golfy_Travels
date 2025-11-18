import slugify from "slugify";
import db from "../config/db.js";
import fs from "fs";
import path from "path";

// add destination
export const addDestination = async (req, res, next) => {
    try {
        const { region_id, country_name, tours, departures, guests_travelled } = req.body;

        if (!region_id || !country_name) {
            return res.status(400).json({
                success: false,
                message: "Region ID and Country Name are required",
            });
        }

        let slug = slugify(country_name, { lower: true, strict: true });
        let finalSlug = slug;
        let count = 1;

        while (true) {
            const [existing] = await db.execute(
                "SELECT id FROM tbl_destinations WHERE slug = ?",
                [finalSlug]
            );
            if (existing.length === 0) break;
            finalSlug = `${slug}-${count}`;
            count++;
        }

        const imageFiles = req.files?.["images"]
            ? req.files["images"].map(file => file.filename)
            : [];

        const baseUrl = `${req.protocol}://${req.get("host")}/uploads/destinations`;
        const imagesJson = JSON.stringify(imageFiles);

        await db.query(
            "CALL sp_insert_destination(?, ?, ?, ?, ?, ?, ?, ?)",
            [
                region_id,
                country_name,
                finalSlug,
                imagesJson,
                tours || 0,
                departures || 0,
                guests_travelled || 0,
                "inactive"
            ]
        );

        res.status(201).json({
            success: true,
            message: "Destination added successfully",
            destination: {
                region_id,
                country_name,
                slug: finalSlug,
                images: imageFiles.map(img => `${baseUrl}/${img}`),
                tours: tours || 0,
                departures: departures || 0,
                guests_travelled: guests_travelled || 0,
            },
        });
    } catch (err) {
        next(err);
    }
};

// get all destinations
export const getAllDestinations = async (req, res, next) => {
    try {
        const [resultSets] = await db.query("CALL sp_get_all_destinations()");
        const rows = Array.isArray(resultSets) && Array.isArray(resultSets[0])
            ? resultSets[0]
            : resultSets;

        const baseUrl = `${req.protocol}://${req.get("host")}/uploads/destinations`;

        const destinations = rows.map((row) => {
            let imagesArray = [];
            try {
                imagesArray = JSON.parse(row.images || "[]");
            } catch {
                imagesArray = [];
            }

            return {
                ...row,
                images: imagesArray.map((img) => `${baseUrl}/${img}`),
            };
        });

        res.status(200).json({
            success: true,
            count: destinations.length,
            destinations,
        });
    } catch (err) {
        next(err);
    }
};

// get destination by slug
export const getDestinationBySlug = async (req, res, next) => {
    try {
        const { slug } = req.params;

        const [resultSets] = await db.query("CALL sp_get_destination_by_slug(?)", [slug]);
        const rows = Array.isArray(resultSets) && Array.isArray(resultSets[0])
            ? resultSets[0]
            : resultSets;

        if (!rows || rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Destination not found",
            });
        }

        const baseUrl = `${req.protocol}://${req.get("host")}/uploads/destinations`;
        const row = rows[0];

        let imagesArray = [];
        try {
            imagesArray = JSON.parse(row.images || "[]");
        } catch {
            imagesArray = [];
        }

        res.status(200).json({
            success: true,
            destination: {
                ...row,
                images: imagesArray.map((img) => `${baseUrl}/${img}`)
            },
        });
    } catch (err) {
        next(err);
    }
};

// update destination
export const updateDestination = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { region_id, country_name, tours, departures, guests_travelled, status } = req.body;

        const [existingRows] = await db.execute(
            "SELECT * FROM tbl_destinations WHERE id = ?",
            [id]
        );

        if (existingRows.length === 0) {
            return res.status(404).json({ success: false, message: "Destination not found" });
        }

        const existing = existingRows[0];

        let slug = slugify(country_name, { lower: true, strict: true });
        let finalSlug = slug;
        let count = 1;

        while (true) {
            const [slugCheck] = await db.execute(
                "SELECT id FROM tbl_destinations WHERE slug = ? AND id != ?",
                [finalSlug, id]
            );
            if (slugCheck.length === 0) break;
            finalSlug = `${slug}-${count}`;
            count++;
        }

        const imageFiles = req.files?.["images"]
            ? req.files["images"].map((file) => file.filename)
            : [];

        let filenames = [];

        if (imageFiles.length > 0) {
            try {
                const oldImages = JSON.parse(existing.images || "[]");
                oldImages.forEach((oldImg) => {
                    const oldPath = path.join(process.cwd(), "uploads/destinations", oldImg);
                    if (fs.existsSync(oldPath)) {
                        fs.unlinkSync(oldPath);
                    }
                });
            } catch { }

            filenames = imageFiles;
        } else {
            filenames = JSON.parse(existing.images || "[]");
        }

        const imagesJson = JSON.stringify(filenames);

        await db.query(
            "CALL sp_update_destination(?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                id,
                region_id,
                country_name,
                finalSlug,
                imagesJson,
                tours || 0,
                departures || 0,
                guests_travelled || 0,
                status || "inactive"
            ]
        );



        const baseUrl = `${req.protocol}://${req.get("host")}/uploads/destinations`;

        res.status(200).json({
            success: true,
            message: "Destination updated successfully",
            destination: {
                id,
                region_id,
                country_name,
                slug: finalSlug,
                images: filenames.map((img) => `${baseUrl}/${img}`),
                tours: tours || 0,
                departures: departures || 0,
                guests_travelled: guests_travelled || 0,
                status
            },
        });
    } catch (err) {
        next(err);
    }
};

// delete destination
export const deleteDestination = async (req, res, next) => {
    try {
        const { id } = req.params;

        const [existingRows] = await db.execute(
            "SELECT * FROM tbl_destinations WHERE id = ?",
            [id]
        );

        if (existingRows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Destination not found",
            });
        }

        const destination = existingRows[0];

        try {
            const oldImages = JSON.parse(destination.images || "[]");
            oldImages.forEach((img) => {
                const imagePath = path.join(process.cwd(), "uploads/destinations", img);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            });
        } catch { }

        await db.query("CALL sp_delete_destination(?)", [id]);

        res.status(200).json({
            success: true,
            message: "Destination deleted successfully",
            deletedId: id,
        });
    } catch (err) {
        next(err);
    }
};
