import BreadcrumbHero from "../../components/Breadcrumb";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiMapPin } from "react-icons/fi";
import { BsCalendarDate } from "react-icons/bs";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";


function Inspiration() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/all_blogs?page=${page}`);

                setBlogs(res.data.blogs);
                setTotalPages(res.data.totalPages);
                setLoading(false);
            } catch (error) {
                console.log("Error fetching blogs:", error);
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [page]);

    if (loading) {
        return (
            // loading spinner
            <div className="flex justify-center py-20">
                <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
            </div>

        );
    }

    return (

        <div>
            <BreadcrumbHero title="Travel Inspiration" background="/breadcrumb.jpeg" />

            <div className="container">

                {blogs.length === 0 && (
                    <p className="text-center text-gray-500 py-20 text-lg font-medium">
                        Sorry No blogs found.
                    </p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-4 lg:px-1 mt-10">

                    {blogs.map((blog) => {
                        const formattedDate = new Date(blog.published_date).toLocaleDateString(
                            "en-US",
                            { day: "2-digit", month: "short", year: "numeric" }
                        );

                        return (
                            <div key={blog.blog_id}>

                                <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden 
                                 flex flex-col md:flex-row h-full">

                                    <div className="w-full md:w-1/2 h-[250px] sm:h-[300px] md:h-[400px] lg:h-[450px] overflow-hidden">
                                        <img
                                            src={blog.thumbnail}
                                            alt={blog.title}
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                        />
                                    </div>

                                    <div className="w-full md:w-1/2 p-4 sm:p-6 flex flex-col space-y-6 md:space-y-7 justify-center">

                                        <div className="flex items-center gap-2 font-semibold text-gray-600 text-sm">
                                            <FiMapPin size={16} />
                                            <span>{blog.location}</span>
                                        </div>

                                        <div className="group">
                                            <h2
                                                onClick={() => navigate(`/pages/travel-inspiration/${blog.slug}`)}
                                                className="relative text-xl sm:text-2xl font-semibold leading-tight inline-block cursor-pointer"
                                            >
                                                {blog.title}

                                                <span
                                                    className="
                                                        absolute left-0 -bottom-1
                                                        h-0.5 w-0 bg-black
                                                        transition-all duration-300 
                                                        group-hover:w-full
                                                    "
                                                ></span>
                                            </h2>
                                        </div>


                                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                                            <BsCalendarDate size={16} />
                                            <span>{formattedDate}</span>
                                        </div>

                                        {/* Line */}
                                        <div className="w-full flex items-center">
                                            <div className="w-0 h-0 border-t-4 border-b-4 border-l-8 border-transparent border-l-gray-300"></div>
                                            <div className="flex-1 h-[1.5px] bg-gray-200"></div>
                                            <div className="w-0 h-0 border-t-4 border-b-4 border-r-8 border-transparent border-r-gray-300"></div>
                                        </div>

                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            {blog.content.slice(0, 120)}...
                                        </p>

                                    </div>
                                </div>

                            </div>
                        );
                    })}

                </div>

            </div>

            {/* pagination */}
            <section className="container">
                <div className="flex flex-col items-center px-4 lg:px-1 py-8 mt-10">

                    <div className="w-full flex justify-between items-center">

                        {/* prev */}
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(prev => prev - 1)}
                            className={`w-20 h-20 flex items-center justify-center rounded-full border 
                                 text-lg font-medium
                                    ${page === 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"}
                                `}
                        >
                            &lt; Prev
                        </button>

                        {/* page numbers */}
                        <div className="flex items-center gap-4">

                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setPage(i + 1)}
                                    className={`
                                        w-12 h-12 flex items-center justify-center rounded-full text-sm font-semibold
                                        transition-all
                                        ${page === i + 1
                                            ? "bg-blue-600 text-white"
                                            : "bg-white border hover:bg-gray-100"}
                                         `}
                                >
                                    {String(i + 1).padStart(2, "0")}
                                </button>
                            ))}

                        </div>

                        {/* next */}
                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage(prev => prev + 1)}
                            className={`w-20 h-20 flex items-center justify-center rounded-full border 
                                text-lg font-medium
                                ${page === totalPages ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"}
                            `}
                        >
                            Next &gt;
                        </button>

                    </div>
                </div>
            </section>

            <Footer />
        </div >
    )
}

export default Inspiration