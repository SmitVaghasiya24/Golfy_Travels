import express from "express";
import {
    addToCart,
    getUserCart,
    removeCartItem,
    clearCart,
} from "../controller/cartController.js";

const router = express.Router();

router.post("/cart/add", addToCart);

router.get("/:user_id", getUserCart);

router.delete("/item/:cart_id", removeCartItem);

router.delete("/clear/:user_id", clearCart);

export default router;
