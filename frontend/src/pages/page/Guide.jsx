import React, { useEffect, useState } from "react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import BreadcrumbHero from "../../components/Breadcrumb";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

function Guide() {
    const [guides, setGuides] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGuides = async () => {
            try {
                const res = await API.get("/api/get_all_guide");
                setGuides(res.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchGuides();
    }, []);

    return (
        <>
            <BreadcrumbHero title="Travel Guider" background="/breadcrumb.jpeg" />
            <div className="container">
                <div className=" px-4 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-10">
                    {guides.map((g) => (
                        <div
                            key={g.guide_id}
                            onClick={() => navigate(`/pages/guider/${g.slug}`)}
                            className=" rounded-3xl overflow-hidden group text-center"
                        >
                            <div className="relative">
                                <div className="overflow-hidden rounded-2xl">
                                    <img
                                        src={g.profile_img}
                                        loading="lazy"
                                        alt={g.name}
                                        className="w-full h-[350px] object-cover rounded-2xl 
                                    transition-all duration-500 ease-out 
                                     group-hover:scale-110"
                                    />
                                </div>


                                <div
                                    className="
                                    absolute bottom-8 left-1/2 -translate-x-1/2 
                                    flex gap-4 
                                    opacity-0 translate-y-2
                                    group-hover:opacity-100 group-hover:translate-y-0
                                    transition-all duration-300
                                "
                                >
                                    <a
                                        href="#"
                                        className="bg-white shadow p-2 rounded-full hover:bg-blue-500 hover:text-white"
                                    >
                                        <FaFacebookF size={16} />
                                    </a>
                                    <a
                                        href="#"
                                        className="bg-white shadow p-2 rounded-full hover:bg-blue-500 hover:text-white"
                                    >
                                        <FaLinkedinIn size={16} />
                                    </a>
                                </div>

                            </div>

                            <h3 className="mt-6 text-xl font-semibold">{g.name}</h3>
                            <p className="mt-2 text-gray-500">GoFly Guider</p>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Guide;
