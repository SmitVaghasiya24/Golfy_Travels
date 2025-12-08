import db from "../config/db.js";

export const placeOrder = async (req, res) => {
    try {
        const {
            user_id,
            subtotal,
            tax,
            service_fee,
            discount,
            total_amount,
            payment_method,
            payment_status
        } = req.body;

        const sql = `CALL sp_place_order(?, ?, ?, ?, ?, ?, ?, ?, @order_id); 
                     SELECT @order_id AS order_id;`;

        const [results] = await db.query(sql, [
            user_id,
            subtotal,
            tax,
            service_fee,
            discount,
            total_amount,
            payment_method,
            payment_status || "pending"
        ]);

        const orderId = results[1][0].order_id;

        return res.status(200).json({
            success: true,
            message: "Order placed successfully",
            order_id: orderId
        });

    } catch (err) {
        console.log("Place Order Error:", err);
        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};
