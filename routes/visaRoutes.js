import express from "express";
import {
    insertVisaCountry, getAllVisaCountries, getVisaCountryBySlug, updateVisaCountry, deleteVisaCountry,
    insertVisaType, updateVisaType, getVisaTypesByCountry, deleteVisaType
} from "../controller/visaController.js";
import getMulterUploader from '../middleware/upload.js'

const upload = getMulterUploader("visa_country");

const router = express.Router();

router.post("/insert_visa_country", upload.single("thumbnail"), insertVisaCountry);
router.get("/get_visa_country", getAllVisaCountries);
router.get("/get_visa_country_slug/:slug", getVisaCountryBySlug);
router.put("/update_visa_country/:id", upload.single("thumbnail"), updateVisaCountry);
router.delete("/delete_visa_country/:id", deleteVisaCountry);

router.post("/insert_visa_type", insertVisaType);
router.get("/get_visa_type/:country_id", getVisaTypesByCountry);
router.put("/update_visa_type/:id", updateVisaType);
router.delete("/delete_visa_type/:id", deleteVisaType);



export default router;
