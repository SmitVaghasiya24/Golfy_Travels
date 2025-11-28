import React, { useEffect, useState } from "react";
import axios from "axios";

function InspirationRight() {
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);


    const fetchCategories = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/get_all_category");
            setCategories(res.data.categories);
        } catch (err) {
            console.log("Category fetch error:", err);
        }
    };


    const fetchTags = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/get_all_tag");
            setTags(res.data.tags);
        } catch (err) {
            console.log("Tag fetch error:", err);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            await fetchCategories();
            await fetchTags();
        };

        loadData();
    }, []);



    return (
        <div className="w-full flex flex-col gap-8">

            {/* category */}
            <div className="p-5 rounded-2xl border border-gray-200 bg-white">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <span className="text-blue-600">▣</span> Category
                </h3>

                <div className="flex flex-col gap-3">
                    {categories.map((cat) => (
                        <div
                            key={cat.category_id}
                            className="flex justify-between text-sm text-gray-700"
                        >
                            <span className="font-semibold">{cat.name}</span>
                            {/* <span>(1)</span> */}
                        </div>
                    ))}
                </div>
            </div>

            {/* popular posts */}
            {/* <div className="p-5 rounded-2xl border bg-white shadow-sm">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <span className="text-blue-600">★</span> Popular Post
        </h3>

        <p className="text-gray-500 text-sm">Keep your popular posts UI here...</p>
      </div> */}

            {/* Tags */}
            <div className="p-5 rounded-2xl border border-gray-200 bg-white">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <span className="text-blue-600">#</span> New Tags
                </h3>

                <div className="flex flex-wrap gap-5">
                    {tags.map((tag) => (
                        <span
                            key={tag.tag_id}
                            className="px-3 py-1 text-sm border border-gray-300 rounded-full bg-gray-50 hover:bg-blue-100 cursor-pointer"
                        >
                            {tag.name}
                        </span>
                    ))}
                </div>
            </div>

        </div>
    );
}

export default InspirationRight;
