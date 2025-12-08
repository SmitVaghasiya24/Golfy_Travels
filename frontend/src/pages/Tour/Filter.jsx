import React, { useEffect, useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

function Filter({ filters, setFilters }) {
    const [regions, setRegions] = useState([]);
    const [openRegions, setOpenRegions] = useState([]);
    const [tourTypes, setTourTypes] = useState([]);
    const [experiences, setExperiences] = useState([]);



    useEffect(() => {
        const fetchRegions = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/get_region");
                const data = await res.json();
                if (data.success) setRegions(data.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchRegions();
    }, []);


    useEffect(() => {
        const fetchTourTypes = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/get_tour_types");
                const data = await res.json();
                if (data.success) setTourTypes(data.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchTourTypes();
    }, []);

    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/get_experience");
                const data = await res.json();
                if (data.success) setExperiences(data.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchExperiences();
    }, []);



    // check region
    const handleRegionCheckbox = (region) => {
        const regionName = region.name;
        const regionDests = region.destinations.map(d => d.country_name);

        let selectedRegion = [...filters.region];
        let selectedDestinations = [...filters.destination];

        if (selectedRegion.includes(regionName)) {
            selectedRegion = selectedRegion.filter(r => r !== regionName);
            selectedDestinations = selectedDestinations.filter(
                d => !regionDests.includes(d)
            );
        } else {
            selectedRegion.push(regionName);
            selectedDestinations = [...new Set([...selectedDestinations, ...regionDests])];
        }

        setFilters({
            ...filters,
            region: selectedRegion,
            destination: selectedDestinations
        });
    };

    // check destination
    const toggleDestination = (name) => {
        let selectedDestinations = [...filters.destination];

        if (selectedDestinations.includes(name)) {
            selectedDestinations = selectedDestinations.filter(d => d !== name);
        } else {
            selectedDestinations.push(name);
        }

        setFilters({
            ...filters,
            destination: selectedDestinations
        });
    };


    const toggleRegionOpen = (id) => {
        if (openRegions.includes(id)) {
            setOpenRegions(openRegions.filter(r => r !== id));
        } else {
            setOpenRegions([...openRegions, id]);
        }
    };

    useEffect(() => {
        const fetchRegions = async () => {
            const res = await fetch("http://localhost:5000/api/get_region");
            const data = await res.json();

            if (data.success) {
                setRegions(data.data);

                if (data.data.length > 0) {
                    setOpenRegions([data.data[0].region_id]);
                }
            }
        };

        fetchRegions();
    }, []);



    return (
        <>
            <div className="rounded-2xl py-4 bg-white">

                {/* region&destination filter */}
                <div>
                    <h3 className="font-semibold text-xl mb-5">Destinations</h3>

                    <div className="space-y-5">
                        {regions.map(region => (
                            <div key={region.region_id}>

                                <div className="flex justify-between items-center font-medium text-gray-700">

                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 cursor-pointer"
                                            checked={filters.region.includes(region.name)}
                                            onChange={() => handleRegionCheckbox(region)}
                                        />
                                        {region.name}
                                    </label>

                                    <div className="flex items-center gap-3">
                                        <span className="text-sm">{region.country_count}</span>

                                        <button
                                            onClick={() => toggleRegionOpen(region.region_id)}
                                            className="text-gray-500"
                                        >
                                            {openRegions.includes(region.region_id)
                                                ? <IoMdArrowDropup size={18} />
                                                : <IoMdArrowDropdown size={18} />
                                            }
                                        </button>
                                    </div>
                                </div>

                                <div
                                    className={`ml-4 overflow-hidden transition-all duration-300 ${openRegions.includes(region.region_id)
                                        ? "max-h-96 mt-2"
                                        : "max-h-0"
                                        }`}
                                >
                                    <div className="space-y-1">
                                        {region.destinations.map(dest => (
                                            <label key={dest.id} className="flex items-center font-normal gap-2 text-sm text-gray-700">
                                                <input
                                                    type="checkbox"
                                                    className="w-4 h-4 cursor-pointer"
                                                    checked={filters.destination.includes(dest.country_name)}
                                                    onChange={() => toggleDestination(dest.country_name)}
                                                />
                                                {dest.country_name}
                                            </label>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div></div>


                <div>
                    {/* pricing Filter */}
                    <div className="mt-8">
                        <h3 className="font-semibold text-xl mb-5">Pricing</h3>

                        <div className="relative w-full h-2 mb-5  bg-gray-200 rounded-full">

                            {/* blue bar line */}
                            <div
                                className="absolute h-2 bg-blue-500 mb-5 rounded-full"
                                style={{
                                    left: `${(filters.min_price || 0) / 2000 * 100}%`,
                                    right: `${100 - ((filters.max_price || 2000) / 2000 * 100)}%`,
                                }}
                            ></div>

                            {/* min price slider */}
                            <input
                                type="range"
                                min="0"
                                max="2000"
                                value={filters.min_price}
                                onChange={(e) =>
                                    setFilters({ ...filters, min_price: Number(e.target.value) })
                                }
                                className="absolute w-full appearance-none bg-transparent pointer-events-none slider-thumb"
                            />



                            {/* max price slider */}
                            <input
                                type="range"
                                min="0"
                                max="2000"
                                value={filters.max_price || 2000}
                                onChange={(e) =>
                                    setFilters({ ...filters, max_price: Number(e.target.value) })
                                }
                                className="slider-thumb absolute w-full appearance-none bg-transparent pointer-events-none"
                            />


                        </div>

                        <div className="flex justify-between mt-3 text-sm font-semibold text-gray-700">
                            <span>${filters.min_price || 0}</span>
                            <span>${filters.max_price || 2000}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <h3 className="font-semibold text-xl mb-3">Tour Type</h3>

                    <div className="flex flex-wrap gap-3">
                        {tourTypes.map((type) => {
                            const active = filters.tour_type === type.name;

                            return (
                                <button
                                    key={type.id}
                                    onClick={() =>
                                        setFilters({
                                            ...filters,
                                            tour_type: active ? "" : type.name,
                                        })
                                    }
                                    className={`px-4 py-2 rounded-full text-sm border transition
            ${active
                                            ? "bg-blue-600 text-white border-blue-600"
                                            : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                                        }
          `}
                                >
                                    {type.name}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-8">
                    <h3 className="font-semibold text-xl mb-4">Experiences</h3>

                    <div className="space-y-4">
                        {experiences.map((exp) => (
                            <div
                                key={exp.id}
                                className="flex items-center justify-between text-gray-700"
                            >
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 cursor-pointer"
                                        checked={filters.experience.includes(exp.name)}
                                        onChange={() => {
                                            let updated = [...filters.experience];

                                            if (updated.includes(exp.name)) {
                                                updated = updated.filter((e) => e !== exp.name);
                                            } else {
                                                updated.push(exp.name);
                                            }

                                            setFilters({ ...filters, experience: updated });
                                        }}
                                    />
                                    {exp.name}
                                </label>

                            </div>
                        ))}
                    </div>
                </div>



            </div>
        </>
    );
}

export default Filter;
