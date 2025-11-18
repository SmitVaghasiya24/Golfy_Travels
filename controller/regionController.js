import db from "../config/db.js";

// add region
export const addRegion = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Region name is required",
      });
    }

    await db.query("CALL sp_insert_region(?)", [name]);

    res.status(201).json({
      success: true,
      message: "Region added successfully",
    });
  } catch (err) {
    next(err);
    res.status(500).json({
      success: false,
      message: "Server error while adding region",
    });
  }
};

// get all regions
export const getRegions = async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM tbl_regions ORDER BY region_id ASC"
    );

    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// update region
export const updateRegion = async (req, res, next) => {
  try {
    const { region_id } = req.params;
    const { name } = req.body;

    if (!region_id || !name) {
      return res.status(400).json({
        success: false,
        message: "Region ID and name are required",
      });
    }

    await db.query("CALL sp_update_region(?, ?)", [region_id, name]);

    res.status(200).json({
      success: true,
      message: "Region updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

// delete region
export const deleteRegion = async (req, res, next) => {
  try {
    const { region_id } = req.params;

    if (!region_id) {
      return res.status(400).json({
        success: false,
        message: "Region ID is required",
      });
    }

    const [result] = await db.query("CALL sp_delete_region(?)", [region_id]);

    const affected = result[0]?.affected || 0;

    if (affected === 0) {
      return res.status(404).json({
        success: false,
        message: "Region not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Region deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
