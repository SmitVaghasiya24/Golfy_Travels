import express from "express";
import { placeOrder } from "../controller/placeOrderController.js";

const router = express.Router();

router.post("/place-order", placeOrder);

export default router;