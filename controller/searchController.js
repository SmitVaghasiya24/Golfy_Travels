import db from "../config/db.js";

export const getHotelsWithFilters = async (req, res, next) => {
    try {
        let { hotel_name, min_price, max_price, country, city, category } = req.query;

        const filters = [];
        const values = [];


        if (hotel_name) {
            filters.push(`h.hotel_name LIKE ?`);
            values.push(`%${hotel_name}%`);
        }


        if (min_price) {
            filters.push(`h.price >= ?`);
            values.push(min_price);
        }


        if (max_price) {
            filters.push(`h.price <= ?`);
            values.push(max_price);
        }


        if (country) {
            filters.push(`h.country = ?`);
            values.push(country);
        }


        if (city) {
            filters.push(`h.city = ?`);
            values.push(city);
        }


        if (category) {
            const catArr = category.split(",");
            filters.push(
                `c.name IN (${catArr.map(() => "?").join(",")})`
            );
            values.push(...catArr);
        }


        let query = `
      SELECT
        h.hotel_id,
        h.hotel_name,
        h.slug,
        h.country,
        h.city,
        h.price,
        h.discount_price,
        h.image_url,
        h.rating,
        h.review_count,
        h.created_at,
        h.updated_at,
        c.name
      FROM tbl_hotels h
      LEFT JOIN tbl_hotel_category_map m ON h.hotel_id = m.hotel_id
      LEFT JOIN tbl_hotel_categories c ON m.category_id = c.category_id
    `;

        if (filters.length > 0) {
            query += " WHERE " + filters.join(" AND ");
        }

        query += " ORDER BY h.created_at DESC";

        const [rows] = await db.query(query, values);

        const hotelsMap = {};
        const baseUrl = `${req.protocol}://${req.get("host")}/uploads/hotels`;

        rows.forEach((row) => {
            if (!hotelsMap[row.hotel_id]) {
                let imagesArray = [];
                try {
                    imagesArray = Array.isArray(row.image_url)
                        ? row.image_url
                        : JSON.parse(row.image_url || "[]");
                } catch {
                    imagesArray = [];
                }

                hotelsMap[row.hotel_id] = {
                    hotel_id: row.hotel_id,
                    hotel_name: row.hotel_name,
                    slug: row.slug,
                    country: row.country,
                    city: row.city,
                    price: row.price,
                    discount_price: row.discount_price,
                    rating: row.rating,
                    review_count: row.review_count,
                    created_at: row.created_at,
                    updated_at: row.updated_at,
                    images: imagesArray.map((img) => `${baseUrl}/${img}`),
                    // categories: [],
                };
            }

            if (row.category_name) {
                hotelsMap[row.hotel_id].categories.push(row.category_name);
            }
        });

        const hotels = Object.values(hotelsMap);

        return res.status(200).json({
            success: true,
            count: hotels.length,
            hotels,
        });
    } catch (err) {
        console.log(err);
        next(err);
    }
};
