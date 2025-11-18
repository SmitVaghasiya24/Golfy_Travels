import express from "express";
import { getHotelsWithFilters } from "../controller/searchController.js";

const router = express.Router();

router.get("/hotels/filter", getHotelsWithFilters);

export default router;