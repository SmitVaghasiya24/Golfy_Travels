import db from "../config/db.js";

export const addOrUpdateBilling = async (req, res, next) => {
    try {
        const { user_id } = req.params;
        const {
            firstName,
            lastName,
            country,
            address,
            city,
            state,
            zip,
            phone,
            email
        } = req.body;

        const [existing] = await db.execute(
            "SELECT * FROM tbl_billing_addresses WHERE user_id = ?",
            [user_id]
        );

        if (existing.length > 0) {
            await db.execute(
                `UPDATE tbl_billing_addresses 
         SET first_name=?, last_name=?, country=?, address=?, city=?, state=?, zip=?, phone=?, email=?
         WHERE user_id = ?`,
                [
                    firstName,
                    lastName,
                    country,
                    address,
                    city,
                    state,
                    zip,
                    phone,
                    email,
                    user_id
                ]
            );

            const [updated] = await db.execute(
                "SELECT * FROM tbl_billing_addresses WHERE user_id = ?",
                [user_id]
            );

            return res.status(200).json({
                message: "Billing address updated successfully",
                type: "updated",
                billingAddress: updated[0],
            });
        }

        const [insertResult] = await db.execute(
            `INSERT INTO tbl_billing_addresses 
      (user_id, first_name, last_name, country, address, city, state, zip, phone, email)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                user_id,
                firstName,
                lastName,
                country,
                address,
                city,
                state,
                zip,
                phone,
                email
            ]
        );

        const [insertedData] = await db.execute(
            "SELECT * FROM tbl_billing_addresses WHERE id = ?",
            [insertResult.insertId]
        );

        res.status(200).json({
            message: "Billing address saved successfully",
            type: "added",
            billingAddress: insertedData[0],
        });

    } catch (error) {
        next(error);
    }
};




export const updateBillingAddress = async (req, res, next) => {
    try {
        const { address_id } = req.params;

        const {
            firstName,
            lastName,
            country,
            address,
            apartment,
            city,
            state,
            zip,
            phone,
            email
        } = req.body;

        if (!firstName || !lastName || !country || !address || !city || !state || !zip || !email) {
            return res.status(400).json({ message: "Required fields missing" });
        }

        await db.execute(
            `UPDATE tbl_billing_addresses 
            SET first_name = ?, last_name = ?, country = ?, address = ?, apartment = ?, 
            city = ?, state = ?, zip = ?, phone = ?, email = ? 
            WHERE id = ?`,
            [
                firstName,
                lastName,
                country,
                address,
                apartment,
                city,
                state,
                zip,
                phone,
                email,
                address_id,
            ]
        );

        const [rows] = await db.execute(
            "SELECT * FROM tbl_billing_addresses WHERE id = ?",
            [address_id]
        );

        res.status(200).json({
            message: "Billing address updated successfully",
            billingAddress: rows[0],
        });

    } catch (error) {
        next(error);
    }
};



export const getBillingAddress = async (req, res, next) => {
    try {
        const { user_id } = req.params;

        const [rows] = await db.execute(
            "SELECT * FROM tbl_billing_addresses WHERE user_id = ? AND status != 'archived'",
            [user_id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "No billing address found" });
        }

        res.status(200).json({
            message: "Billing address fetched successfully",
            billingAddress: rows[0]
        });

    } catch (error) {
        next(error);
    }
};



export const addOrUpdateShipping = async (req, res, next) => {
    try {
        const { user_id } = req.params;

        const {
            firstName,
            lastName,
            country,
            streetAddress,
            apartment,
            city,
            state,
            zipCode
        } = req.body;

        if (!firstName || !lastName || !country || !streetAddress || !city || !state || !zipCode) {
            return res.status(400).json({ message: "Required fields missing" });
        }

        const [existing] = await db.execute(
            "SELECT * FROM tbl_shipping_addresses WHERE user_id = ?",
            [user_id]
        );

        if (existing.length > 0) {
            await db.execute(
                `UPDATE tbl_shipping_addresses 
                    SET first_name=?, last_name=?, country=?, street_address=?, apartment=?, 
                    city=?, state=?, zip_code=?
                    WHERE user_id = ?`,
                [
                    firstName,
                    lastName,
                    country,
                    streetAddress,
                    apartment,
                    city,
                    state,
                    zipCode,
                    user_id
                ]
            );

            const [updated] = await db.execute(
                "SELECT * FROM tbl_shipping_addresses WHERE user_id = ?",
                [user_id]
            );

            return res.status(200).json({
                message: "Shipping address updated successfully",
                type: "updated",
                shippingAddress: updated[0]
            });
        }

        const [insert] = await db.execute(
            `INSERT INTO tbl_shipping_addresses 
             (user_id, first_name, last_name, country, street_address, apartment, city, state, zip_code)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                user_id,
                firstName,
                lastName,
                country,
                streetAddress,
                apartment,
                city,
                state,
                zipCode
            ]
        );

        const [inserted] = await db.execute(
            "SELECT * FROM tbl_shipping_addresses WHERE id = ?",
            [insert.insertId]
        );

        res.status(200).json({
            message: "Shipping address added successfully",
            type: "added",
            shippingAddress: inserted[0]
        });

    } catch (error) {
        next(error);
        console.log(error);

    }
};


export const getShippingAddress = async (req, res, next) => {
    try {
        const { user_id } = req.params;

        const [rows] = await db.execute(
            "SELECT * FROM tbl_shipping_addresses WHERE user_id = ?",
            [user_id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "No shipping address found" });
        }

        res.status(200).json({
            message: "Shipping address fetched successfully",
            shippingAddress: rows[0]
        });

    } catch (error) {
        next(error);
    }
};
