import db from "../config/db.js";

// add tour type
export const addTourType = async (req, res) => {
    try {
        const { name, status, created_by } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Tour type name is required",
            });
        }

        const finalStatus = status || "inactive";

        const [result] = await db.query(
            "CALL sp_insert_tour_type(?, ?, ?)",
            [name, finalStatus, created_by || null]
        );

        const insertedData = result[0][0];

        res.status(201).json({
            success: true,
            message: "Tour type added successfully",
            data: insertedData
        });

    } catch (error) {
        console.log("Error adding tour type:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// get tour type
export const getTourTypes = async (req, res) => {
    try {
        const [rows] = await db.execute(
            "SELECT * FROM tbl_tour_types ORDER BY id DESC"
        );

        res.json({
            success: true,
            data: rows,
        });

    } catch (err) {
        console.log("Error fetching tour types:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// update tour type
export const updateTourType = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, status, updated_by } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Tour type name is required",
            });
        }

        const finalStatus = status || null;

        const [result] = await db.query(
            "CALL sp_update_tour_type(?, ?, ?, ?)",
            [id, name, finalStatus, updated_by || null]
        );

        const updatedData = result[0][0];

        if (!updatedData) {
            return res.status(404).json({
                success: false,
                message: "Tour type not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Tour type updated successfully",
            data: updatedData,
        });

    } catch (error) {
        console.log("Error updating tour type:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// delete tour type
export const deleteTourType = async (req, res) => {
    try {
        const { id } = req.params;

        const [check] = await db.query(
            "SELECT * FROM tbl_tour_types WHERE id = ?",
            [id]
        );

        if (check.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Tour type not found",
            });
        }

        try {
            await db.query("DELETE FROM tbl_tour_types WHERE id = ?", [id]);
        } catch (fkError) {
            return res.status(400).json({
                success: false,
                message: "Cannot delete. This tour type is used somewhere else.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Tour type deleted successfully",
            deleted_id: id,
        });

    } catch (error) {
        console.log("Error deleting tour type:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


// add experience
export const addExperience = async (req, res) => {
    try {
        const { name, status, created_by } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Experience name is required",
            });
        }

        const finalStatus = status || "inactive";

        const [result] = await db.query(
            "CALL sp_insert_experience(?, ?, ?)",
            [name, finalStatus, created_by || null]
        );

        const insertedData = result[0][0];

        res.status(201).json({
            success: true,
            message: "Experience added successfully",
            data: insertedData,
        });

    } catch (err) {
        console.log("Error adding experience:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// get experience
export const getExperiences = async (req, res) => {
    try {
        const [result] = await db.query("CALL sp_get_experiences()");
        const experiences = result[0];

        res.status(200).json({
            success: true,
            data: experiences
        });

    } catch (err) {
        console.log("Error fetching experiences:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// update experience
export const updateExperience = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, status, updated_by } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Experience name is required",
            });
        }

        const [result] = await db.query(
            "CALL sp_update_experience(?, ?, ?, ?)",
            [id, name, status || null, updated_by || null]
        );

        const updatedData = result[0][0];

        if (!updatedData) {
            return res.status(404).json({
                success: false,
                message: "Experience not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Experience updated successfully",
            data: updatedData,
        });

    } catch (error) {
        console.log("Error updating experience:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// delete experience
export const deleteExperience = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.query("CALL sp_delete_experience(?)", [id]);

        const deletedData = result[0][0];

        if (!deletedData || !deletedData.deleted_id) {
            return res.status(404).json({
                success: false,
                message: "Experience not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Experience deleted successfully",
            data: deletedData,
        });

    } catch (error) {
        console.log("Error deleting experience:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
