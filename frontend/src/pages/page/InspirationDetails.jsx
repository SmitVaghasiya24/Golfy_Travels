import React, { useEffect, useState } from "react";
import BreadcrumbHero from "../../components/Breadcrumb";
import axios from "axios";
import { useParams } from "react-router-dom";

function InspirationDetails() {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/get_blog/${slug}`);
                setBlog(res.data.blog);
            } catch (err) {
                console.log(err);
            }
        };

        fetchBlog();
    }, [slug]);

    return (
        <div>
            <BreadcrumbHero title={blog ? blog.title : "Loading..."} background="/breadcrumb.jpeg" />

            <section>
                <h1>Outstanding Beaches to Visit This Summer Season.</h1>
                <p>Summer is here, and it’s time to soak up the sun on some of the world’s most stunning beaches! Whether you’re looking to relax on golden sands, dive into crystal-clear waters, or try exciting water sports, these 10 beaches offer something for every type of traveler. From remote island paradises to iconic coastal destinations.
                </p>
            </section>

        </div>
    );
}

export default InspirationDetails;
