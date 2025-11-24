import db from "../config/db.js";

// add destination
export const addTourDestinations = async (req, res, next) => {
    try {
        const { tour_id, destinations } = req.body;

        if (!tour_id) {
            return res.status(400).json({
                success: false,
                message: "tour_id is required"
            });
        }

        if (!destinations || !Array.isArray(destinations) || destinations.length === 0) {
            return res.status(400).json({
                success: false,
                message: "destinations (array) is required"
            });
        }

        const destinationString = destinations.join(",");

        await db.query("CALL sp_insert_tour_destinations(?, ?)", [
            tour_id,
            destinationString
        ]);

        res.status(201).json({
            success: true,
            message: "Destinations added to tour successfully"
        });

    } catch (error) {
        console.error("Error adding tour destinations:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};


// update destination
export const updateTourDestinations = async (req, res, next) => {
    try {
        const { tour_id, destinations } = req.body;

        if (!tour_id) {
            return res.status(400).json({
                success: false,
                message: "tour_id is required"
            });
        }

        if (!Array.isArray(destinations) || destinations.length === 0) {
            return res.status(400).json({
                success: false,
                message: "destinations must be a non-empty array"
            });
        }

        const destinationString = destinations.join(",");

        await db.query("CALL sp_update_tour_destinations(?, ?)", [
            tour_id,
            destinationString
        ]);

        return res.status(200).json({
            success: true,
            message: "Tour destinations updated successfully"
        });

    } catch (error) {
        console.error("Error updating tour destinations:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};


// delete destination
export const deleteSingleTourDestination = async (req, res, next) => {
    try {
        const { tour_id, destination_id } = req.body;

        if (!tour_id || !destination_id) {
            return res.status(400).json({
                success: false,
                message: "tour_id and destination_id are required"
            });
        }

        await db.query("CALL sp_delete_single_tour_destination(?, ?)", [
            tour_id,
            destination_id
        ]);

        res.status(200).json({
            success: true,
            message: "Destination removed from tour successfully"
        });

    } catch (error) {
        console.error("Error deleting destination from tour:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};



// add experience
export const addTourExperiences = async (req, res) => {
    try {
        const { tour_id, experiences } = req.body;

        if (!tour_id) {
            return res.status(400).json({
                success: false,
                message: "tour_id is required"
            });
        }

        if (!Array.isArray(experiences) || experiences.length === 0) {
            return res.status(400).json({
                success: false,
                message: "experiences must be a non-empty array"
            });
        }

        const experienceString = experiences.join(",");

        await db.query("CALL sp_insert_tour_experiences(?, ?)", [
            tour_id,
            experienceString
        ]);

        return res.status(201).json({
            success: true,
            message: "Experiences added to tour successfully"
        });

    } catch (error) {
        console.error("Error adding tour experiences:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};





// update experience
export const updateTourExperiences = async (req, res) => {
    try {
        const { tour_id, experiences } = req.body;

        if (!tour_id) {
            return res.status(400).json({
                success: false,
                message: "tour_id is required"
            });
        }

        if (!Array.isArray(experiences) || experiences.length === 0) {
            return res.status(400).json({
                success: false,
                message: "experiences must be a non-empty array"
            });
        }

        const experienceString = experiences.join(",");

        await db.query("CALL sp_update_tour_experiences(?, ?)", [
            tour_id,
            experienceString
        ]);

        return res.status(200).json({
            success: true,
            message: "Tour experiences updated successfully"
        });

    } catch (error) {
        console.error("Error updating tour experiences:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};


// delete experience
export const deleteSingleTourExperience = async (req, res) => {
    try {
        const { tour_id, experience_id } = req.body;

        if (!tour_id || !experience_id) {
            return res.status(400).json({
                success: false,
                message: "tour_id and experience_id are required"
            });
        }

        await db.query("CALL sp_delete_single_tour_experience(?, ?)", [
            tour_id,
            experience_id
        ]);

        return res.status(200).json({
            success: true,
            message: "Experience removed from tour successfully"
        });

    } catch (error) {
        console.error("Error deleting tour experience:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};
