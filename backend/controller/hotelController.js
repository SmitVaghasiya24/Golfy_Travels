import db from "../config/db.js";
import slugify from "slugify";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); // current JS file ka full real path
const __dirname = path.dirname(__filename); // current file ka folder


// add hotel
export const addHotel = async (req, res) => {
    try {
        const {
            hotel_name,
            country,
            city,
            price,
            discount_price,
            rating,
            review_count,
            status
        } = req.body;

        if (!hotel_name) {
            return res.status(400).json({
                success: false,
                message: "Hotel name is required",
            });
        }

        let slug = slugify(hotel_name, { lower: true, strict: true });
        let finalSlug = slug;
        let count = 1;

        while (true) {
            const [existing] = await db.execute(
                "SELECT hotel_id FROM tbl_hotels WHERE slug = ?",
                [finalSlug]
            );
            if (existing.length === 0) break;

            finalSlug = `${slug}-${count}`;
            count++;
        }

        const files = req.files?.["images"]
            ? req.files["images"].map(f => f.filename)
            : [];

        const imagesJson = JSON.stringify(files);

        const baseUrl = `${req.protocol}://${req.get("host")}/uploads/hotels`;

        await db.query(
            "CALL sp_insert_hotel(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                hotel_name,
                finalSlug,
                country,
                city,
                price || null,
                discount_price || null,
                imagesJson,
                rating || 0,
                review_count || 0,
                status || null
            ]
        );

        return res.status(201).json({
            success: true,
            message: "Hotel added successfully",
            data: {
                hotel_name,
                country,
                city,
                slug: finalSlug,
                price: price || null,
                discount_price: discount_price || null,
                rating: rating || 0,
                review_count: review_count || 0,
                status: status || "inactive",
                images: files.map(img => `${baseUrl}/${img}`)
            }
        });

    } catch (error) {
        console.error("Add hotel error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};



// get all hotels
export const getAllHotels = async (req, res) => {
    try {
        let { page = 1, limit = 10 } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);
        const offset = (page - 1) * limit;

        const [resultSets] = await db.query(
            "CALL sp_get_all_hotels(?, ?)",
            [limit, offset]
        );

        const rows = Array.isArray(resultSets) && Array.isArray(resultSets[0])
            ? resultSets[0]
            : resultSets;

        const totalCount = resultSets[1][0].total_count;

        const baseUrl = `${req.protocol}://${req.get("host")}/uploads/hotels`;

        const hotels = rows.map(row => {
            let imageArray = [];

            try {
                imageArray = Array.isArray(row.image_url)
                    ? row.image_url
                    : JSON.parse(row.image_url || "[]");
            } catch {
                imageArray = [];
            }

            const fullUrls = imageArray.map(img => `${baseUrl}/${img}`);

            return {
                ...row,
                image_url: fullUrls
            };
        });

        return res.status(200).json({
            success: true,
            page,
            limit,
            total: totalCount,
            totalPages: Math.ceil(totalCount / limit),
            hotels
        });

    } catch (error) {
        console.error("Get hotels error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};


// get hotel bu slug
export const getHotelBySlug = async (req, res) => {
    try {
        const { slug } = req.params;

        if (!slug) {
            return res.status(400).json({
                success: false,
                message: "Slug is required"
            });
        }

        const [resultSets] = await db.query(
            "CALL sp_get_hotel_with_rooms(?)",
            [slug]
        );

        const rows =
            Array.isArray(resultSets) && Array.isArray(resultSets[0])
                ? resultSets[0]
                : resultSets;

        if (!rows || rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Hotel not found"
            });
        }

        const base = rows[0];
        const baseUrl = `${req.protocol}://${req.get("host")}/uploads/hotels`;

        let hotelImages = [];
        try {
            hotelImages = Array.isArray(base.hotel_images)
                ? base.hotel_images
                : JSON.parse(base.hotel_images || "[]");
        } catch {
            hotelImages = [];
        }

        const fullHotelImages = hotelImages.map(img => `${baseUrl}/${img}`);

        const rooms = rows
            .filter(r => r.room_id !== null)
            .map(r => {
                let roomImages = [];
                try {
                    roomImages = Array.isArray(r.room_images)
                        ? r.room_images
                        : JSON.parse(r.room_images || "[]");
                } catch {
                    roomImages = [];
                }

                const roomImagesFull = roomImages.map(img => `${baseUrl}/${img}`);

                return {
                    room_id: r.room_id,
                    room_name: r.room_name,
                    slug: r.room_slug,
                    room_subtitle: r.room_subtitle,
                    price: r.price,
                    image_url: roomImagesFull,
                    description: r.room_description
                };
            });

        return res.status(200).json({
            success: true,
            hotel: {
                hotel_id: base.hotel_id,
                hotel_name: base.hotel_name,
                slug: base.slug,
                country: base.country,
                city: base.city,
                price: base.price,
                discount_price: base.discount_price,
                image_url: fullHotelImages,
                rating: base.rating,
                review_count: base.review_count,
                rooms
            }
        });

    } catch (error) {
        console.error("Error fetching hotel by slug:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};



// update hotel
export const updateHotel = async (req, res) => {
    try {
        const { id } = req.params;
        const { hotel_name, country, city, price, discount_price, rating, review_count, status } = req.body;

        if (!id || !hotel_name) {
            return res.status(400).json({
                success: false,
                message: "Hotel ID and Hotel Name are required"
            });
        }

        const [existingRows] = await db.execute(
            "SELECT * FROM tbl_hotels WHERE hotel_id = ?",
            [id]
        );

        if (existingRows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Hotel not found"
            });
        }

        const existing = existingRows[0];

        const slug = slugify(hotel_name, { lower: true, strict: true });
        let finalSlug = slug;
        let count = 1;

        while (true) {
            const [slugCheck] = await db.execute(
                "SELECT hotel_id FROM tbl_hotels WHERE slug = ? AND hotel_id != ?",
                [finalSlug, id]
            );
            if (slugCheck.length === 0) break;
            finalSlug = `${slug}-${count}`;
            count++;
        }

        const imageFiles = req.files?.["images"]
            ? req.files["images"].map(f => f.filename)
            : [];

        let existingImages = [];
        try {
            existingImages = Array.isArray(existing.image_url)
                ? existing.image_url
                : JSON.parse(existing.image_url || "[]");
        } catch {
            existingImages = [];
        }

        let keepImages = [];
        if (req.body.old_images) {
            keepImages = Array.isArray(req.body.old_images)
                ? req.body.old_images
                : JSON.parse(req.body.old_images);
        }

        existingImages.forEach(img => {
            if (!keepImages.includes(img)) {
                const filePath = path.join(__dirname, "..", "uploads", "hotels", img);
                if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            }
        });

        const finalImages = [...keepImages, ...imageFiles];
        const imagesJson = JSON.stringify(finalImages);

        await db.query(
            "CALL sp_update_hotel(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                id,
                hotel_name,
                finalSlug,
                country,
                city,
                price || null,
                discount_price || null,
                imagesJson,
                rating || 0,
                review_count || 0,
                status || null
            ]
        );

        const baseUrl = `${req.protocol}://${req.get("host")}/uploads/hotels`;
        const fullUrls = finalImages.map(img => `${baseUrl}/${img}`);

        return res.status(200).json({
            success: true,
            message: "Hotel updated successfully",
            hotel: {
                hotel_id: id,
                hotel_name,
                slug: finalSlug,
                country,
                city,
                price,
                discount_price,
                rating,
                review_count,
                status: status || existing.status,
                image_url: fullUrls
            }
        });

    } catch (error) {
        console.error("Update hotel error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};


// delete hotel
export const deleteHotel = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Hotel ID is required"
            });
        }

        const [rows] = await db.execute(
            "SELECT * FROM tbl_hotels WHERE hotel_id = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Hotel not found"
            });
        }

        const existing = rows[0];

        let images = [];
        try {
            images = Array.isArray(existing.image_url)
                ? existing.image_url
                : JSON.parse(existing.image_url || "[]");
        } catch {
            images = [];
        }

        images.forEach(img => {
            const filePath = path.join(__dirname, "..", "uploads", "hotels", img);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        });

        const [deleteResult] = await db.query("CALL sp_delete_hotel(?)", [id]);

        if (deleteResult[0][0]?.status === "NOT_FOUND") {
            return res.status(404).json({
                success: false,
                message: "Hotel not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Hotel deleted successfully",
            hotel_id: id
        });

    } catch (error) {
        console.error("Delete hotel error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};







// add hotel room
export const addRoom = async (req, res) => {
    try {
        const {
            hotel_id,
            room_name,
            room_subtitle,
            price,
            description,
            status
        } = req.body;

        if (!hotel_id || !room_name || !price) {
            return res.status(400).json({
                success: false,
                message: "Hotel ID, Room Name and Price are required"
            });
        }

        let slug = slugify(room_name, { lower: true, strict: true });
        let finalSlug = slug;
        let count = 1;

        while (true) {
            const [exists] = await db.execute(
                "SELECT room_id FROM tbl_hotel_rooms WHERE slug = ?",
                [finalSlug]
            );
            if (exists.length === 0) break;

            finalSlug = `${slug}-${count}`;
            count++;
        }

        const imageFiles = req.files?.["images"]
            ? req.files["images"].map(file => file.filename)
            : [];

        const imagesJson = JSON.stringify(imageFiles);

        const [result] = await db.query(
            "CALL sp_insert_hotel_room(?, ?, ?, ?, ?, ?, ?, ?)",
            [
                hotel_id,
                room_name,
                finalSlug,
                room_subtitle || null,
                price,
                imagesJson,
                description || null,
                status || null
            ]
        );

        const insertedId = result[0]?.room_id;

        const baseUrl = `${req.protocol}://${req.get("host")}/uploads/hotels`;
        const fullImages = imageFiles.map(img => `${baseUrl}/${img}`);

        return res.status(201).json({
            success: true,
            message: "Room added successfully",
            room: {
                room_id: insertedId,
                hotel_id,
                room_name,
                slug: finalSlug,
                room_subtitle,
                price,
                description,
                status: status || "inactive",
                images: fullImages
            }
        });

    } catch (error) {
        console.error("Add room error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};


// update room
export const updateRoom = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            room_name,
            room_subtitle,
            price,
            description,
            old_images,
            status
        } = req.body;

        if (!id || !room_name || !price) {
            return res.status(400).json({
                success: false,
                message: "Room ID, Room Name and Price are required"
            });
        }

        const [rows] = await db.execute(
            "SELECT * FROM tbl_hotel_rooms WHERE room_id = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Room not found"
            });
        }

        const existing = rows[0];

        let slug = slugify(room_name, { lower: true, strict: true });
        let finalSlug = slug;
        let count = 1;

        while (true) {
            const [exists] = await db.execute(
                "SELECT room_id FROM tbl_hotel_rooms WHERE slug = ? AND room_id != ?",
                [finalSlug, id]
            );
            if (exists.length === 0) break;

            finalSlug = `${slug}-${count}`;
            count++;
        }

        let existingImages = [];

        try {
            existingImages = Array.isArray(existing.image_url)
                ? existing.image_url
                : JSON.parse(existing.image_url || "[]");
        } catch {
            existingImages = [];
        }

        let keepImages = [];

        if (old_images) {
            keepImages = Array.isArray(old_images)
                ? old_images
                : JSON.parse(old_images);
        }

        existingImages.forEach(img => {
            if (!keepImages.includes(img)) {
                const filePath = path.join(__dirname, "..", "uploads", "hotels", img);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            }
        });

        const newImageFiles = req.files?.["images"]
            ? req.files["images"].map(f => f.filename)
            : [];

        const finalImages = [...keepImages, ...newImageFiles];

        const imagesJson = JSON.stringify(finalImages);

        await db.query(
            "CALL sp_update_hotel_room(?, ?, ?, ?, ?, ?, ?, ?)",
            [
                id,
                room_name,
                finalSlug,
                room_subtitle || null,
                price,
                imagesJson,
                description || null,
                status || null
            ]
        );

        const baseUrl = `${req.protocol}://${req.get("host")}/uploads/hotels`;
        const imageUrls = finalImages.map(img => `${baseUrl}/${img}`);

        return res.status(200).json({
            success: true,
            message: "Room updated successfully",
            room: {
                room_id: id,
                room_name,
                slug: finalSlug,
                room_subtitle,
                price,
                description,
                status: status || existing.status,
                images: imageUrls
            }
        });

    } catch (error) {
        console.error("Update room error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};



// delete room
export const deleteRoom = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await db.execute(
            "SELECT * FROM tbl_hotel_rooms WHERE room_id = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Room not found"
            });
        }

        const room = rows[0];

        let images = [];

        try {
            images = Array.isArray(room.image_url)
                ? room.image_url
                : JSON.parse(room.image_url || "[]");
        } catch {
            images = [];
        }

        images.forEach(img => {
            const filePath = path.join(__dirname, "..", "uploads", "hotels", img);

            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        });

        const [result] = await db.query("CALL sp_delete_hotel_room(?)", [id]);

        if (result[0][0]?.status === "NOT_FOUND") {
            return res.status(404).json({
                success: false,
                message: "Room not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Room deleted successfully",
            deleted_room_id: id
        });

    } catch (error) {
        console.error("Delete room error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};



// add Hotel Categories
export const addHotelCategories = async (req, res) => {
    try {
        const { hotel_id } = req.params;
        const { category_ids, status } = req.body;

        if (!hotel_id) {
            return res.status(400).json({
                success: false,
                message: "Hotel ID is required"
            });
        }

        if (!category_ids || typeof category_ids !== "string") {
            return res.status(400).json({
                success: false,
                message: "category_ids must be a comma-separated string"
            });
        }

        await db.execute(
            "CALL sp_insert_hotel_categories(?, ?, ?)",
            [hotel_id, category_ids, status || null]
        );

        return res.status(200).json({
            success: true,
            message: "Categories inserted successfully",
            hotel_id,
            category_ids,
            status: status || "inactive"
        });

    } catch (error) {
        console.error("Error adding categories:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};


// update Hotel Categories
export const updateHotelCategories = async (req, res) => {
    try {
        const { hotel_id } = req.params;
        const { category_ids, status } = req.body;

        if (!category_ids || typeof category_ids !== "string") {
            return res.status(400).json({
                success: false,
                message: "category_ids must be comma separated string"
            });
        }

        await db.execute(
            "CALL sp_update_hotel_categories(?, ?, ?)",
            [hotel_id, category_ids, status || null]
        );

        return res.status(200).json({
            success: true,
            message: "Categories updated successfully",
            hotel_id,
            added: category_ids,
            status: status || "unchanged"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal error",
            error: error.message
        });
    }
};


// delete Hotel Categories
export const deleteHotelCategories = async (req, res) => {
    try {
        const { hotel_id } = req.params;
        const { category_ids } = req.body;

        if (!category_ids || typeof category_ids !== "string") {
            return res.status(400).json({
                success: false,
                message: "category_ids must be a comma-separated string"
            });
        }

        await db.execute(
            "CALL sp_remove_hotel_categories(?, ?)",
            [hotel_id, category_ids]
        );

        return res.status(200).json({
            success: true,
            message: "Categories deleted successfully",
            hotel_id,
            deleted_ids: category_ids
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};





// add hotel tag
export const addHotelTags = async (req, res) => {
    try {
        const { hotel_id } = req.params;
        const { tag_ids, status } = req.body;

        if (!tag_ids || typeof tag_ids !== "string") {
            return res.status(400).json({
                success: false,
                message: "tag_ids must be comma separated string"
            });
        }

        await db.execute(
            "CALL sp_insert_or_update_hotel_tags(?, ?, ?)",
            [hotel_id, tag_ids, status || null]
        );

        return res.status(200).json({
            success: true,
            message: "Tags inserted/updated successfully",
            hotel_id,
            tags: tag_ids,
            status: status || "inactive"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};


// delete hotel tag
export const deleteHotelTags = async (req, res) => {
    try {
        const { hotel_id } = req.params;
        const { tag_ids } = req.body;

        if (!tag_ids || typeof tag_ids !== "string") {
            return res.status(400).json({
                success: false,
                message: "tag_ids must be a comma-separated string"
            });
        }

        await db.execute(
            "CALL sp_remove_hotel_tags(?, ?)",
            [hotel_id, tag_ids]
        );

        return res.status(200).json({
            success: true,
            message: "Tags removed successfully",
            hotel_id,
            removed_tags: tag_ids
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};


// add hotel amenity
export const insertHotelAmenities = async (req, res) => {
    try {
        const { hotel_id } = req.params;
        const { amenity_ids } = req.body;

        if (!hotel_id) {
            return res.status(400).json({
                success: false,
                message: "Hotel ID is required"
            });
        }

        if (!amenity_ids || typeof amenity_ids !== "string") {
            return res.status(400).json({
                success: false,
                message: "amenity_ids must be a comma-separated string"
            });
        }

        const admin_id = req.user ? req.user.admin_id : null;

        await db.execute(
            "CALL sp_insert_hotel_amenities(?, ?, ?)",
            [hotel_id, amenity_ids, admin_id]
        );

        return res.status(200).json({
            success: true,
            message: "Amenities added successfully",
            hotel_id,
            amenity_ids
        });

    } catch (error) {
        console.error("Error adding amenities:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

// update hotel amenity
export const updateHotelAmenities = async (req, res) => {
    try {
        const { hotel_id } = req.params;
        const { amenity_ids } = req.body;

        if (!hotel_id) {
            return res.status(400).json({
                success: false,
                message: "Hotel ID is required"
            });
        }

        if (!amenity_ids || typeof amenity_ids !== "string") {
            return res.status(400).json({
                success: false,
                message: "amenity_ids must be a comma-separated string"
            });
        }

        await db.execute(
            "CALL sp_update_hotel_amenities(?, ?)",
            [hotel_id, amenity_ids]
        );

        return res.status(200).json({
            success: true,
            message: "Amenities updated successfully",
            hotel_id,
            amenity_ids
        });

    } catch (error) {
        console.error("Error updating amenities:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

// delete hotel amenity
export const deleteHotelAmenities = async (req, res) => {
    try {
        const { hotel_id } = req.params;
        const { amenity_ids } = req.body;

        if (!hotel_id) {
            return res.status(400).json({
                success: false,
                message: "Hotel ID is required"
            });
        }

        if (!amenity_ids || typeof amenity_ids !== "string") {
            return res.status(400).json({
                success: false,
                message: "amenity_ids must be a comma-separated string"
            });
        }

        await db.execute(
            "CALL sp_delete_hotel_amenities(?, ?)",
            [hotel_id, amenity_ids]
        );

        return res.status(200).json({
            success: true,
            message: "Amenities deleted successfully",
            hotel_id,
            amenity_ids
        });

    } catch (error) {
        console.error("Error deleting amenities:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};
