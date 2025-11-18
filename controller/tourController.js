import db from "../config/db.js";
import slugify from "slugify";
import fs from "fs";
import path from "path";
import { log } from "console";


// add tour
export const addTour = async (req, res, next) => {
    try {
        const {
            title,
            description,
            region_id,
            days,
            nights,
            price,
            discount_price,
            tour_type_id,
            is_featured,
            status,
            created_by
        } = req.body;

        let slug = slugify(title, { lower: true, strict: true });
        let finalSlug = slug;
        let count = 1;

        while (true) {
            const [existing] = await db.execute(
                "SELECT tour_id FROM tbl_tours WHERE slug = ?",
                [finalSlug]
            );

            if (existing.length === 0) break;

            finalSlug = `${slug}-${count}`;
            count++;
        }

        const thumbnail = req.file
            ? `${req.protocol}://${req.get("host")}/uploads/tours/${req.file.filename}`
            : null;

        await db.query(
            "CALL sp_insert_tour(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                title,
                finalSlug,
                description,
                thumbnail,
                region_id,
                days,
                nights,
                price,
                discount_price || null,
                tour_type_id,
                is_featured || 0,
                status || "inactive",
                created_by || null
            ]
        );

        const [row] = await db.execute(
            "SELECT * FROM tbl_tours WHERE slug = ?",
            [finalSlug]
        );

        res.status(201).json({
            success: true,
            message: "Tour added successfully",
            data: row[0]
        });

    } catch (error) {
        next(error);
    }
};



// get all tours
export const getAllTours = async (req, res) => {
    try {
        let { page = 1, limit = 5 } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);
        const offset = (page - 1) * limit;

        const [results] = await db.query(
            "CALL sp_get_all_tours(?, ?)",
            [limit, offset]
        );

        const tours = results[0];
        const total = results[1][0].total;

        res.status(200).json({
            success: true,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalItems: total,
            limit,
            data: tours
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
        console.log(error);
        
    }
};



// get tour by slug
export const getTourBySlug = async (req, res) => {
    try {
        const { slug } = req.params;

        const [result] = await db.query("CALL sp_get_tour_by_slug(?)", [slug]);

        const tour = result[0][0];

        if (!tour) {
            return res.status(404).json({
                success: false,
                message: "Tour not found"
            });
        }

        res.status(200).json({
            success: true,
            data: tour
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};



// update tour
export const updateTour = async (req, res) => {
    try {
        const { tour_id } = req.params;

        const {
            title,
            description,
            region_id,
            days,
            nights,
            price,
            discount_price,
            tour_type_id,
            is_featured,
            status,
            updated_by
        } = req.body;

        const [existingRows] = await db.execute(
            "SELECT * FROM tbl_tours WHERE tour_id = ?",
            [tour_id]
        );

        if (existingRows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Tour not found"
            });
        }

        const existingTour = existingRows[0];

        let baseSlug = slugify(title, { lower: true, strict: true });
        let finalSlug = baseSlug;
        let count = 1;

        while (true) {
            const [exists] = await db.execute(
                "SELECT tour_id FROM tbl_tours WHERE slug = ? AND tour_id != ?",
                [finalSlug, tour_id]
            );

            if (exists.length === 0) break;

            finalSlug = `${baseSlug}-${count}`;
            count++;
        }

        let newThumbnail = null;

        if (req.file) {
            newThumbnail = `${req.protocol}://${req.get("host")}/uploads/tours/${req.file.filename}`;

            if (existingTour.thumbnail) {
                const oldPath = path.join(
                    "uploads",
                    "tours",
                    existingTour.thumbnail.split("/").pop()
                );

                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }
        }

        const [result] = await db.query(
            "CALL sp_update_tour(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                tour_id,
                title,
                finalSlug,
                description,
                newThumbnail,
                region_id,
                days,
                nights,
                price,
                discount_price || null,
                tour_type_id,
                is_featured || 0,
                status || null,
                updated_by || null
            ]
        );

        const updatedTour = result[0][0];

        res.status(200).json({
            success: true,
            message: "Tour updated successfully",
            data: updatedTour
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};



// delete tour
export const deleteTour = async (req, res) => {
    try {
        const { tour_id } = req.params;

        const [rows] = await db.execute(
            "SELECT thumbnail FROM tbl_tours WHERE tour_id = ?",
            [tour_id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Tour not found"
            });
        }

        const thumbnail = rows[0].thumbnail;

        if (thumbnail) {
            const filePath = path.join("uploads", "tours", thumbnail.split("/").pop());
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }

        const [result] = await db.query(
            "CALL sp_delete_tour(?)",
            [tour_id]
        );

        const deletedRows = result[0][0].deleted_rows;

        if (deletedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Tour not found or already deleted"
            });
        }

        res.status(200).json({
            success: true,
            message: "Tour deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};
