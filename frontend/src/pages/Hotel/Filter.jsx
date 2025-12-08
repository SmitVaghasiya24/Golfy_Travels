import React, { useEffect, useState } from "react";

function Filter({ onFilterChange, clearSignal }) {
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState("");

    const [amenities, setAmenities] = useState([]);
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [showAllAmenities, setShowAllAmenities] = useState(false);

    const [minPrice, setMinPrice] = useState(39);
    const [maxPrice, setMaxPrice] = useState(1000);

    useEffect(() => {
        fetchCategories();
        fetchTags();
        fetchAmenities();
    }, []);

    useEffect(() => {
        setSelectedCategories([]);
        setSelectedTag("");
        setSelectedAmenities([]);
        setMinPrice(39);
        setMaxPrice(1000);

        onFilterChange({
            category: "",
            tag: "",
            amenities: "",
            min_price: 39,
            max_price: 1000
        });
    }, [clearSignal]);

    const fetchCategories = async () => {
        const res = await fetch("http://localhost:5000/api/get_hotel_category");
        const data = await res.json();
        if (data.success) {
            setCategories(data.data[0]);
        }
    };

    const fetchTags = async () => {
        const res = await fetch("http://localhost:5000/api/get_hotel_tag");
        const data = await res.json();
        if (data.success) {
            setTags(data.data);
        }
    };

    const fetchAmenities = async () => {
        const res = await fetch("http://localhost:5000/api/get_hotel_aminity");
        const data = await res.json();
        if (data.success) {
            setAmenities(data.data);
        }
    };

    const handleCategoryToggle = (name) => {
        let updated;

        if (selectedCategories.includes(name)) {
            updated = selectedCategories.filter(c => c !== name);
        } else {
            updated = [...selectedCategories, name];
        }

        setSelectedCategories(updated);
        onFilterChange({ category: updated.join(",") });
    };

    const handleTagSelect = (name) => {
        const newValue = name === selectedTag ? "" : name;

        setSelectedTag(newValue);
        onFilterChange({ tag: newValue });
    };

    const handleAmenityToggle = (name) => {
        let updated;

        if (selectedAmenities.includes(name)) {
            updated = selectedAmenities.filter(a => a !== name);
        } else {
            updated = [...selectedAmenities, name];
        }

        setSelectedAmenities(updated);
        onFilterChange({ amenities: updated.join(",") });
    };

    return (
        <div className="p-5">

            <h2 className="text-xl font-bold mb-4">Category</h2>

            <div className="space-y-3 mb-8">
                {categories.map(cat => (
                    <label
                        key={cat.category_id}
                        className="flex justify-between items-center text-sm cursor-pointer"
                    >
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={selectedCategories.includes(cat.name)}
                                onChange={() => handleCategoryToggle(cat.name)}
                                className="w-4 h-4"
                            />
                            <span>{cat.name}</span>
                        </div>
                    </label>
                ))}
            </div>

            <div className="-mx-11 h-px bg-gray-200"></div>

            <h2 className="text-xl font-bold mt-4 mb-4">Tags</h2>

            <div className="flex flex-wrap gap-3 mb-8">
                {tags.map(tag => (
                    <button
                        key={tag.tag_id}
                        onClick={() => handleTagSelect(tag.name)}
                        className={`px-4 py-2 rounded-full text-sm transition 
                            ${selectedTag === tag.name
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-blue-100"}`}
                    >
                        {tag.name}
                    </button>
                ))}
            </div>

            <div className="-mx-11 h-px bg-gray-200"></div>

            <div className="mt-5 mb-5">
                <h3 className="font-semibold text-xl mb-5">Pricing</h3>

                <div className="relative w-full h-2 mb-5 bg-gray-200 rounded-full">

                    <div
                        className="absolute h-2 bg-blue-500 rounded-full"
                        style={{
                            left: `${((minPrice - 39) / (1000 - 39)) * 100}%`,
                            right: `${100 - ((maxPrice - 39) / (1000 - 39)) * 100}%`,
                        }}
                    ></div>

                    <input
                        type="range"
                        min="39"
                        max="1000"
                        value={minPrice}
                        onChange={(e) => {
                            const value = Number(e.target.value);
                            setMinPrice(value);
                            onFilterChange({ min_price: value, max_price: maxPrice });
                        }}
                        className="absolute w-full appearance-none bg-transparent pointer-events-none slider-thumb"
                    />

                    <input
                        type="range"
                        min="39"
                        max="1000"
                        value={maxPrice}
                        onChange={(e) => {
                            const value = Number(e.target.value);
                            setMaxPrice(value);
                            onFilterChange({ min_price: minPrice, max_price: value });
                        }}
                        className="absolute w-full appearance-none bg-transparent pointer-events-none slider-thumb"
                    />
                </div>

                <div className="flex justify-between mt-3 text-sm font-semibold text-gray-700">
                    <span>${minPrice}</span>
                    <span>${maxPrice}</span>
                </div>
            </div>

            <div className="-mx-11 h-px bg-gray-200"></div>

            <h2 className="text-xl font-bold mt-4 mb-4">Amenities</h2>

            <div className="space-y-3">
                {(showAllAmenities ? amenities : amenities.slice(0, 6)).map(amenity => (
                    <label
                        key={amenity.amenity_id}
                        className="flex justify-between items-center text-sm cursor-pointer"
                    >
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={selectedAmenities.includes(amenity.name)}
                                onChange={() => handleAmenityToggle(amenity.name)}
                                className="w-4 h-4"
                            />
                            <span>{amenity.name}</span>
                        </div>
                    </label>
                ))}
            </div>

            {amenities.length > 6 && (
                <button
                    onClick={() => setShowAllAmenities(!showAllAmenities)}
                    className="text-blue-700 font-semibold text-md mt-3"
                >
                    {showAllAmenities ? "See Less -" : "See More +"}
                </button>
            )}

        </div>
    );
}

export default Filter;
