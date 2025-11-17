import db from "../config/db.js";

// Category
// add category
export const addHotelCategory = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Category name is required"
            });
        }

        await db.query("CALL sp_insert_hotel_category(?)", [name]);

        return res.status(201).json({
            success: true,
            message: "Hotel category added successfully",
            data: { name }
        });

    } catch (error) {
        console.error("Error adding hotel category:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

// get all category
export const getAllHotelCategories = async (req, res) => {
    try {
        const [categories] = await db.query("CALL sp_get_all_hotel_categories()");

        return res.status(200).json({
            success: true,
            message: "Category fetched successfully",
            data: categories
        });

    } catch (error) {
        console.error("Error fetching hotel categories:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};



// update category
export const updateHotelCategory = async (req, res) => {
    try {
        const { category_id } = req.params;
        const { name } = req.body;

        if (!category_id || !name) {
            return res.status(400).json({
                success: false,
                message: "category_id and name are required"
            });
        }

        const [result] = await db.query("CALL sp_update_hotel_category(?, ?)", [
            category_id,
            name
        ]);

        const updatedCategory = result[0];

        return res.status(200).json({
            success: true,
            message: "Hotel category updated successfully",
            data: updatedCategory
        });

    } catch (error) {
        console.error("Error updating hotel category:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};


// delete category
export const deleteHotelCategory = async (req, res) => {
    try {
        const { category_id } = req.params;

        if (!category_id) {
            return res.status(400).json({
                success: false,
                message: "category_id is required"
            });
        }

        const [result] = await db.query("CALL sp_delete_hotel_category(?)", [
            category_id
        ]);

        const deletedCategory = result && result[0] ? result[0] : null;

        if (!deletedCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Hotel category deleted successfully",
            data: deletedCategory
        });

    } catch (error) {
        console.error("Error deleting hotel category:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};





// Tag
// add tag
export const addHotelTag = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Tag name is required"
            });
        }

        const [result] = await db.query(
            "CALL sp_insert_hotel_tag(?)",
            [name]
        );

        const newTag = result[0][0];

        return res.status(201).json({
            success: true,
            message: "Tag added successfully",
            data: newTag
        });

    } catch (error) {
        console.error("Error adding tag:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};


// get tag
export const getHotelTags = async (req, res) => {
    try {
        const [tags] = await db.execute(
            "SELECT * FROM tbl_hotel_tags ORDER BY created_at DESC"
        );

        return res.status(200).json({
            success: true,
            data: tags
        });

    } catch (error) {
        console.error("Error fetching tags:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};




// update tag
export const updateHotelTag = async (req, res) => {
    try {
        const { tag_id } = req.params;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Tag name is required"
            });
        }

        const [result] = await db.query(
            "CALL sp_update_hotel_tag(?, ?)",
            [tag_id, name]
        );

        const updated = result[0][0];

        if (updated && updated.status === "NOT_FOUND") {
            return res.status(404).json({
                success: false,
                message: "Tag not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Tag updated successfully",
            data: updated
        });

    } catch (error) {
        console.error("Error updating tag:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};




// delete tag
export const deleteHotelTag = async (req, res) => {
    try {
        const { tag_id } = req.params;

        const [result] = await db.query(
            "CALL sp_delete_hotel_tag(?)",
            [tag_id]
        );

        const response = result[0][0];

        if (response.status === "NOT_FOUND") {
            return res.status(404).json({
                success: false,
                message: "Tag not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Tag deleted successfully"
        });

    } catch (error) {
        console.error("Error deleting tag:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};




// Amenities
// add Amenity
export const addAmenity = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Amenity name is required",
            });
        }

        const [result] = await db.query(
            "CALL sp_insert_amenity(?)",
            [name]
        );

        const newAmenity = result[0][0];

        return res.status(201).json({
            success: true,
            message: "Amenity added successfully",
            data: newAmenity
        });

    } catch (error) {
        console.error("Error adding amenity:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};


// get Amenity
export const getAmenities = async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT * FROM tbl_amenities ORDER BY created_at DESC"
        );

        return res.status(200).json({
            success: true,
            data: rows
        });

    } catch (error) {
        console.error("Error fetching amenities:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};



// update amenity
export const updateAmenity = async (req, res) => {
    try {
        const { amenity_id } = req.params;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Amenity name is required"
            });
        }

        const [result] = await db.query(
            "CALL sp_update_amenity(?, ?)",
            [amenity_id, name]
        );

        const response = result[0][0];

        if (response?.status === "NOT_FOUND") {
            return res.status(404).json({
                success: false,
                message: "Amenity not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Amenity updated successfully",
            data: response
        });

    } catch (error) {
        console.error("Error updating amenity:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};



// delete amenity
export const deleteAmenity = async (req, res) => {
    try {
        const { amenity_id } = req.params;

        const [result] = await db.query(
            "CALL sp_delete_amenity(?)",
            [amenity_id]
        );

        const response = result[0][0];

        if (response?.status === "NOT_FOUND") {
            return res.status(404).json({
                success: false,
                message: "Amenity not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Amenity deleted successfully"
        });

    } catch (error) {
        console.error("Error deleting amenity:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};