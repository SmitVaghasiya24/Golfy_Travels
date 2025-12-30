import React, { useEffect, useState } from "react";
// import axios from "axios";
import API from "../services/api";

function Company() {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        const loadCompanies = async () => {
            try {
                const res = await API.get("/api/get_all_companies");

                if (res.data.success) {
                    setCompanies(res.data.data);
                }
            } catch (error) {
                console.log("Error fetching companies:", error);
            }
        };
        loadCompanies();
    }, []);



    return (
        <div className="px-10 mt-20">
            <p className="text-xl md:text-2xl font-semibold text-center">Those Company You Can Easily Trust!</p>

            <div className="container mx-auto overflow-hidden">

                <div className="mt-12">
                    <div className="flex gap-20 animate-scroll w-max">

                        {[...companies, ...companies].map((company, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-center"
                            >
                                <img
                                    src={company.company_logo}
                                    alt={company.company_name}
                                    className="h-14 w-auto object-contain opacity-80 hover:opacity-100 transition"
                                />
                            </div>
                        ))}

                    </div>
                </div>

            </div>

        </div>
    );
}

export default Company;
