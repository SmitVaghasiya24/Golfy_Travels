import express from "express";
import { addCompany, getCompanies } from "../controller/CompanyController.js";
import getMulterUploader from '../middleware/upload.js'

const upload = getMulterUploader("company");

const router = express.Router();

router.post("/add_company", upload.single("company_logo"), addCompany);
router.get("/get_all_companies", getCompanies);


export default router;  