import db from "../config/db.js";

export const getHotelsWithFilters = async (req, res, next) => {
    try {
        let { hotel_name, min_price, max_price, country, city, category, amenities, tag_name } = req.query;
        let { sort } = req.query;

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
            filters.push(`hc.name IN (${catArr.map(() => "?").join(",")})`);
            values.push(...catArr);
        }

        if (amenities) {
            const amArr = amenities.split(",");
            filters.push(`a.name IN (${amArr.map(() => "?").join(",")})`);
            values.push(...amArr);
        }

        if (tag_name) {
            const tagArr = tag_name.split(",");
            filters.push(`t.name IN (${tagArr.map(() => "?").join(",")})`);
            values.push(...tagArr);
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

            hc.name AS category_name,
            a.name AS amenity_name,
            t.name AS tag_name
        FROM tbl_hotels h
        LEFT JOIN tbl_hotel_category_map hm ON h.hotel_id = hm.hotel_id
        LEFT JOIN tbl_hotel_categories hc ON hm.category_id = hc.category_id

        LEFT JOIN tbl_hotel_amenities ha ON h.hotel_id = ha.hotel_id
        LEFT JOIN tbl_amenities a ON ha.amenity_id = a.amenity_id

        LEFT JOIN tbl_hotel_tag_map htm ON h.hotel_id = htm.hotel_id
        LEFT JOIN tbl_hotel_tags t ON htm.tag_id = t.tag_id
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

                    categories: [],
                    amenities: [],
                    tags: []
                };
            }

            if (row.category_name &&
                !hotelsMap[row.hotel_id].categories.includes(row.category_name)) {
                hotelsMap[row.hotel_id].categories.push(row.category_name);
            }

            if (row.amenity_name &&
                !hotelsMap[row.hotel_id].amenities.includes(row.amenity_name)) {
                hotelsMap[row.hotel_id].amenities.push(row.amenity_name);
            }

            if (row.tag_name &&
                !hotelsMap[row.hotel_id].tags.includes(row.tag_name)) {
                hotelsMap[row.hotel_id].tags.push(row.tag_name);
            }
        });


        const hotels = Object.values(hotelsMap).sort((a, b) => {
            if (sort === "price_low") return a.price - b.price;
            if (sort === "price_high") return b.price - a.price;
            if (sort === "latest") return new Date(b.created_at) - new Date(a.created_at);
            return 0;
        });

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



export const getToursWithFilters = async (req, res, next) => {
    try {
        let { title, min_price, max_price, region, tour_type, destination, experience } = req.query;
        let { sort } = req.query;

        const filters = [];
        const values = [];

        if (title) {
            filters.push(`t.title LIKE ?`);
            values.push(`%${title}%`);
        }

        if (min_price) {
            filters.push(`t.price >= ?`);
            values.push(min_price);
        }

        if (max_price) {
            filters.push(`t.price <= ?`);
            values.push(max_price);
        }

        if (region) {
            filters.push(`r.name = ?`);
            values.push(region);
        }

        if (tour_type) {
            filters.push(`tt.name = ?`);
            values.push(tour_type);
        }

        if (destination) {
            const dArr = destination.split(",");
            filters.push(`d.country_name IN (${dArr.map(() => "?").join(",")})`);
            values.push(...dArr);
        }

        if (experience) {
            const eArr = experience.split(",");
            filters.push(`e.name IN (${eArr.map(() => "?").join(",")})`);
            values.push(...eArr);
        }

        let query = `
        SELECT 
            t.tour_id,
            t.title,
            t.slug,
            t.description,
            t.thumbnail,
            t.region_id,
            t.days,
            t.nights,
            t.price,
            t.discount_price,
            t.tour_type_id,
            t.review_count,
            t.is_featured,
            t.created_at,
            t.updated_at,

            tt.name AS tour_type_name,
            r.name AS region_name,
            d.country_name AS destination_name,
            e.name AS experience_name

        FROM tbl_tours t
        
           LEFT JOIN tbl_tour_types tt ON t.tour_type_id = tt.id
           LEFT JOIN tbl_regions r ON t.region_id = r.region_id
           LEFT JOIN tbl_tour_destinations td ON t.tour_id = td.tour_id
           LEFT JOIN tbl_destinations d ON td.destination_id = d.id
           LEFT JOIN tbl_tour_experiences te ON t.tour_id = te.tour_id
           LEFT JOIN tbl_experiences e ON te.experience_id = e.id
        `;

        if (filters.length > 0) {
            query += " WHERE " + filters.join(" AND ");
        }

        query += " ORDER BY t.created_at DESC";

        const [rows] = await db.query(query, values);

        const toursMap = {};

        rows.forEach((row) => {
            if (!toursMap[row.tour_id]) {
                toursMap[row.tour_id] = {
                    tour_id: row.tour_id,
                    title: row.title,
                    slug: row.slug,
                    description: row.description,
                    thumbnail: row.thumbnail,
                    region_id: row.region_id,
                    region_name: row.region_name,
                    days: row.days,
                    nights: row.nights,
                    price: row.price,
                    discount_price: row.discount_price,
                    tour_type_id: row.tour_type_id,
                    tour_type_name: row.tour_type_name,
                    review_count: row.review_count,
                    is_featured: row.is_featured,
                    created_at: row.created_at,
                    updated_at: row.updated_at,

                    destinations: [],
                    experiences: []
                };
            }

            if (row.destination_name &&
                !toursMap[row.tour_id].destinations.includes(row.destination_name)) {

                toursMap[row.tour_id].destinations.push(row.destination_name);
            }

            if (row.experience_name &&
                !toursMap[row.tour_id].experiences.includes(row.experience_name)) {

                toursMap[row.tour_id].experiences.push(row.experience_name);
            }
        });

        const tours = Object.values(toursMap).sort((a, b) => {
            if (sort === "price_low") return a.price - b.price;
            if (sort === "price_high") return b.price - a.price;
            if (sort === "latest") return new Date(b.created_at) - new Date(a.created_at);
            return 0;
        });

        return res.status(200).json({
            success: true,
            count: tours.length,
            tours,
        });

    } catch (err) {
        console.log(err);
        next(err);
    }
};
