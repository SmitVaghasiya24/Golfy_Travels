import express from 'express';
import { create_contact } from '../controller/contactController.js';

const router = express.Router();

router.post("/create_contact", create_contact);

export default router;