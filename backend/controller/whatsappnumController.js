import db from "../config/db.js";

export const addOrUpdateContact = async (req, res) => {
  try {
    const { whatsapp_number, email } = req.body;

    if (!whatsapp_number && !email) {
      return res.status(400).json({
        message: "WhatsApp number or email is required",
      });
    }

    const [rows] = await db.execute("SELECT * FROM tbl_contact_info LIMIT 1");

    if (rows.length > 0) {
      await db.execute(
        "UPDATE tbl_contact_info SET whatsapp_number = ?, email = ? WHERE id = ?",
        [whatsapp_number || rows[0].whatsapp_number, email || rows[0].email, rows[0].id]
      );
    } else {
      await db.execute(
        "INSERT INTO tbl_contact_info (whatsapp_number, email) VALUES (?, ?)",
        [whatsapp_number || "", email || ""]
      );
    }

    const [latest] = await db.execute(
      "SELECT whatsapp_number, email FROM tbl_contact_info LIMIT 1"
    );

    res.status(200).json({
      message:
        rows.length > 0
          ? "Contact details updated successfully"
          : "Contact details added successfully",
      data: latest[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};



export const getContactInfo = async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT whatsapp_number, email FROM tbl_contact_info LIMIT 1"
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "No contact info found" });
    }

    res.status(200).json({
      message: "Contact info fetched successfully",
      data: rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
