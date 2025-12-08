import db from "../config/db.js";


export const addToCart = async (req, res) => {
  try {
    const {
      user_id,
      item_type,
      item_id,
      booking_date,
      adults,
      children,
      quantity,
      addons,
      base_price,
      final_price,
    } = req.body;

    const addonsJSON = addons ? JSON.stringify(addons) : null;

    const sql = `CALL sp_add_to_cart(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    await db.query(sql, [
      user_id,
      item_type,
      item_id,
      booking_date,
      adults,
      children,
      quantity,
      addonsJSON,
      base_price,
      final_price,
    ]);

    return res.status(200).json({
      success: true,
      message: "Item added to cart",
    });
  } catch (err) {
    console.log("Add to Cart Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


export const getUserCart = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    const hotelBaseUrl = `${req.protocol}://${req.get("host")}/uploads/hotels`;
    const tourBaseUrl = `${req.protocol}://${req.get("host")}/uploads/tours`;

    const sql = `CALL sp_get_cart(?)`;
    const [rows] = await db.query(sql, [user_id]);

    let cartItems = rows[0];

    cartItems = cartItems.map((item) => {


      if (item.hotel_images) {
        let imageArray = [];

        try {
          imageArray = Array.isArray(item.hotel_images)
            ? item.hotel_images
            : JSON.parse(item.hotel_images || "[]");
        } catch {
          imageArray = [];
        }

        item.hotel_images = imageArray.map(
          (img) => `${hotelBaseUrl}/${img}`
        );
      }


      if (item.tour_thumb) {
        if (item.tour_thumb.startsWith("http")) {
          item.tour_thumb = item.tour_thumb;
        } else {
          item.tour_thumb = `${tourBaseUrl}/${item.tour_thumb}`;
        }
      }


      return item;
    });

    return res.status(200).json({
      success: true,
      cart: cartItems,
    });

  } catch (err) {
    console.log("Get Cart Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};



export const removeCartItem = async (req, res) => {
  try {
    const cart_id = req.params.cart_id;

    const sql = `CALL sp_remove_cart_item(?)`;

    await db.query(sql, [cart_id]);

    return res.status(200).json({
      success: true,
      message: "Cart item removed",
    });
  } catch (err) {
    console.log("Remove Cart Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


export const clearCart = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    const sql = `CALL sp_clear_cart(?)`;

    await db.query(sql, [user_id]);

    return res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
    });
  } catch (err) {
    console.log("Clear Cart Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
