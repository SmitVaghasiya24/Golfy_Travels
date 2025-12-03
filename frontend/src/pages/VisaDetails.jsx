import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BreadcrumbHero from "../components/Breadcrumb";
import { motion, AnimatePresence } from "framer-motion";
import Faq from '../components/Faq';
import Footer from "../components/Footer";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import axios from "axios";


const visaIcons = {
    "Tourist Visa": "/visa/icon/tourist.svg",
    "Business Visa": "/visa/icon/bussiness.svg",
    "Student Visa": "/visa/icon/student.svg",
    "Work Visa": "/visa/icon/work.svg",
    "Medical Visa": "/visa/icon/medical.svg",
    "Spouse Visa": "/visa/icon/spouse.svg",
};


function VisaDetails() {
    const { slug } = useParams();
    const [countryData, setCountryData] = useState(null);
    const [visaTypes, setVisaTypes] = useState([]);
    const [selectedType, setSelectedType] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    useEffect(() => {
        const fetchCountry = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/get_visa_country_slug/${slug}`);
                const data = await res.json();

                if (data.success) {
                    setCountryData(data.country);
                    setVisaTypes(data.visa_types);
                    setSelectedType(data.visa_types[0]);
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchCountry();
    }, [slug]);

    const [form, setForm] = useState({
        name: "",
        dob: "",
        phone: "",
        email: "",
        age: "",
        visa_criteria: "",
        notes: "",
    });

    const handleInput = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const submitApplication = async (e) => {
        e.preventDefault();

        if (!countryData || !selectedType) {
            setErrorMessage("Country or visa type not selected");
            return;
        }

        const fd = new FormData();

        fd.append("country_id", countryData.visa_id);
        fd.append("type_id", selectedType.id);
        fd.append("created_by", 1);

        Object.keys(form).forEach((key) => {
            fd.append(key, form[key]);
        });

        if (file) {
            fd.append("file", file);
        }

        try {
            const res = await axios.post(
                "http://localhost:5000/api/add-visa-application",
                fd,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            if (res.data.success) {
                setForm({
                    name: "",
                    dob: "",
                    phone: "",
                    email: "",
                    age: "",
                    visa_criteria: "",
                    notes: "",
                });

                setFile(null);

                setSuccessMessage("Application submitted successfully.");
                setErrorMessage("");

                setTimeout(() => {
                    setSuccessMessage("");
                }, 5000);

            } else {
                setErrorMessage("Something went wrong. Please try again.");
            }
        } catch (err) {
            console.log(err);
            setErrorMessage("Error submitting application. Try again later.");

            setTimeout(() => {
                setErrorMessage("");
            }, 3000);
        }

    };


    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isModalOpen]);


    return (
        <div>
            <BreadcrumbHero title={countryData ? countryData.country : "Country Name"} background="/breadcrumb.jpeg" />


            <div className="container ">
                <div className="mt-16">

                    <div className="md:hidden px-4 md:px-0 ">
                        <Swiper
                            modules={[Pagination, Autoplay]}
                            autoplay={{ delay: 1000 }}
                            speed={2000}
                            loop={true}
                            spaceBetween={20}
                            slidesPerView={1}
                            breakpoints={{
                                375: { slidesPerView: 2 },
                            }}
                        >
                            {visaTypes.map((visa) => (
                                <SwiperSlide key={visa.id}>
                                    <div
                                        onClick={() => setSelectedType(visa)}
                                        className={`
                                            bg-[#F2F2FF] border rounded-2xl px-6 py-3 text-center cursor-pointer
                                             transition-all duration-300
                                             ${selectedType?.id === visa.id ? "border-blue-500 bg-white" : "border-white/10"}
                                        `}
                                    >
                                        <div className="flex justify-center my-4">
                                            <img
                                                src={visaIcons[visa.type_name]}
                                                alt={visa.type_name}
                                                className="w-12 h-12 object-contain"
                                            />
                                        </div>

                                        <h3 className="text-xl font-semibold mb-2">{visa.type_name}</h3>
                                        <p className="text-sm">${visa.price} / per person</p>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>

                <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 place-items-center gap-6">
                    {visaTypes.map((visa) => (
                        <div
                            key={visa.id}
                            onClick={() => setSelectedType(visa)}
                            className={`
                                 bg-[#F2F2FF] border rounded-2xl px-6 py-3 text-center cursor-pointer
                                 transition-all duration-300 w-full
                                 ${selectedType?.id === visa.id ? "border-blue-500 bg-white" : "border-white/10"}
                            `}
                        >
                            <div className="flex justify-center my-4">
                                <img
                                    src={visaIcons[visa.type_name]}
                                    alt={visa.type_name}
                                    className="w-12 h-12 object-contain"
                                />
                            </div>

                            <h3 className="text-xl font-semibold mb-2">{visa.type_name}</h3>
                            <p className="text-sm">${visa.price} / per person</p>
                        </div>
                    ))}
                </div>

            </div>


            <div className="container mt-16 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12">

                {/* left */}
                <div className="space-y-16 mt-16">

                    <section className="max-w-[700px] px-4 md:px-0">
                        <h2 className="text-3xl font-semibold mb-6">Documents Requirement</h2>
                        <div className="bg-white border rounded-2xl border-gray-200 p-5 md:p-6">
                            <ul className="space-y-4 text-gray-800 leading-relaxed">
                                <li>Valid Passport (Minimum 6 months validity beyond your travel dates).</li>
                                <li>Previous Passports (if applicable).</li>
                                <li>Photocopies of Passport Bio-Data Page & past visas (if any).</li>
                                <li>Proof of Sufficient Funds (bank statements, salary slips).</li>
                                <li>Travel Insurance (mandatory for Schengen & some other visas).</li>
                                <li>Must cover medical emergencies, repatriation & COVID-related expenses.</li>
                            </ul>
                        </div>
                    </section>

                    <section className="max-w-[700px] px-4 md:px-0">
                        <h2 className="text-3xl font-semibold mb-6">Additional Requirement</h2>
                        <div className="bg-white border rounded-2xl border-gray-200 p-5 md:p-6">
                            <ul className="space-y-4 text-gray-800 leading-relaxed">
                                <li>Copies of previous visas (Schengen, US, UK, Canada, etc.).</li>
                                <li>Proof of international travel history (stamps in old passports).</li>
                                <li>A cover letter explaining the purpose of travel.</li>
                                <li>Bank Statements & ID Proof of the sponsor.</li>
                                <li>Police Clearance Certificate (PCC) (for some countries).</li>
                            </ul>
                        </div>
                    </section>

                    <section className="max-w-[700px] px-4 md:px-0">
                        <h2 className="text-3xl font-semibold mb-6">Conditional Requirement</h2>
                        <div className="bg-white border rounded-2xl border-gray-200 p-5 md:p-6">
                            <ul className="space-y-4 text-gray-800 leading-relaxed">
                                <li>Birth Certificate of the child.</li>
                                <li>Consent Letter from the non-traveling parent (if only one parent is traveling).</li>
                                <li>Proof of Guardianship (if applicable).</li>
                                <li>Family ties proof to ensure return to home country.</li>
                            </ul>
                        </div>
                    </section>

                    <section className="max-w-[700px] px-4 md:px-0">
                        <div className="bg-[#F2F2FF] rounded-3xl p-5 md:p-6">
                            <h2 className="text-2xl md:text-3xl font-semibold flex items-center gap-3 mb-6">
                                <img src="/visa/icon/reject.png" className="w-7 h-7" />
                                Visa Rejection Reasons
                            </h2>

                            <div className="flex flex-col lg:flex-row items-start gap-10">
                                <div className="w-full">
                                    <h3 className="text-xl font-semibold mb-4 md:whitespace-nowrap">
                                        Common Reasons for Rejection:
                                    </h3>
                                    <ul className="space-y-4 text-gray-800 leading-relaxed">
                                        <li>Insufficient financial proof.</li>
                                        <li>Lack of strong ties to home country.</li>
                                        <li>Incomplete or false documentation.</li>
                                        <li>Suspicious travel history or security concerns.</li>
                                    </ul>
                                </div>

                                <img
                                    src="/visa/img/visa.png"
                                    className="w-44 md:w-56 lg:w-64 mx-auto lg:mx-0"
                                    alt=""
                                />
                            </div>
                        </div>
                    </section>

                    <section className="max-w-[700px] px-4 md:px-0">
                        <h2 className="text-3xl font-semibold flex items-center gap-3 mb-6">
                            <img src="/visa/icon/warning.png" className="w-7 h-7" /> Important Note
                        </h2>
                        <div className="bg-[#E6F6A9] rounded-3xl p-5 md:p-7">
                            <ul className="space-y-4 text-gray-800 leading-relaxed">
                                <li>Not all applicants need to submit these additional documents.</li>
                                <li>Conditional requirements depend on nationality, travel history, purpose.</li>
                                <li>Providing incomplete or false information can lead to rejection.</li>
                            </ul>
                        </div>
                    </section>
                </div>

                {/* right */}
                <div className="space-y-10 mt-16 lg:top-24 h-fit">

                    {selectedType && (
                        <div className="bg-[#F2F2FF] p-6 md:p-5 lg:p-8 rounded-2xl md:rounded-xl lg:rounded-3xl 
                                w-full md:max-w-[320px] lg:max-w-none mx-auto">
                            <h2 className="text-2xl font-semibold mb-2">{selectedType.type_name}</h2>

                            <span className="inline-block bg-white text-blue-600 px-5 py-2.5 font-semibold rounded-full text-md">
                                Validity - {selectedType.validity_days} Days / Single entry
                            </span>

                            <p className="mt-10 text-gray-700 font-semibold">Visa Pricing</p>

                            <p className="mt-2 text-3xl font-semibold">
                                ${selectedType.price}
                                <span className="text-gray-600 text-sm font-normal"> / per person</span>
                            </p>

                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="mt-6 w-full bg-[#0090E6] cursor-pointer text-white p-3 rounded-xl"
                            >
                                Apply Online ↗
                            </button>

                            <p className="mt-4 text-gray-600 text-sm">
                                <span className="mr-1">ℹ️</span>
                                Exclusive Offers – Access travel, dining & shopping deals.
                            </p>
                        </div>
                    )}

                    <img
                        src="/visa/img/need_visa_assistance.webp"
                        className="rounded-2xl w-full md:max-w-[320px] lg:max-w-full mx-auto object-cover"
                        loading="lazy"
                        alt="Visa Assistance"
                    />
                </div>
            </div>

            <div className="w-full h-0.5 mt-20 bg-gray-200"></div>


            <div className="my-20 w-full">
                <div className="container text-center md:text-left">
                    <motion.h2
                        initial={{ y: -40, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6"
                    >
                        We’ve Success Stories
                    </motion.h2>

                    <p className="max-w-xl text-gray-600 leading-relaxed mx-auto md:mx-0 text-sm sm:text-base mt-2 md:mt-4 px-3 md:px-0">
                        We’re committed to offering more than just products — we provide exceptional experiences.
                    </p>
                </div>

                <div className="mt-10 px-4 mx-auto relative">

                    <Swiper
                        modules={[Navigation, Autoplay]}
                        autoplay={{ delay: 2500, disableOnInteraction: false }}
                        speed={1200}
                        loop={true}
                        spaceBetween={20}
                        slidesPerView={1}
                        breakpoints={{
                            0: { slidesPerView: 1 },
                            480: { slidesPerView: 1 },
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 4 },
                            1280: { slidesPerView: 5 },
                        }}
                        className="smooth-swiper"
                    >

                        {[
                            "/destination/cus1.webp",
                            "/destination/cus2.webp",
                            "/destination/cus3.webp",
                            "/destination/cus4.webp",
                            "/destination/cus5.mp4",
                            "/destination/cus6.webp",
                        ].map((file, index) => (
                            <SwiperSlide key={index}>
                                <div className="flex items-center justify-center h-[420px]">

                                    {file.endsWith(".mp4") ? (
                                        <video
                                            src={file}
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            className={`rounded-3xl object-cover
                                                ${index % 2 === 0 ? "h-[400px]" : "h-[280px] md:h-[340px]"}
                                            `}
                                        />
                                    ) : (
                                        <img
                                            src={file}
                                            className={`rounded-3xl object-cover
                                                ${index % 2 === 0 ? "h-[400px]" : "h-[280px] md:h-[340px]"}
                                            `}
                                        />
                                    )}

                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-start overflow-y-auto z-50 px-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        <motion.div
                            className="bg-white rounded-2xl shadow-xl w-full max-w-3xl px-6 md:px-10 py-6 md:py-8 my-10 relative"
                            initial={{ y: -40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -40, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 cursor-pointer flex items-center justify-center w-8 h-8 
                                bg-gray-200 hover:bg-red-500 hover:text-white text-red-500 font-bold rounded-full"
                            >
                                ✕
                            </button>

                            <h2 className="text-2xl md:text-3xl font-semibold mb-6">Apply for Visa</h2>

                            <form
                                onSubmit={submitApplication}
                                className="border p-4 md:p-6 border-gray-300 space-y-6 rounded-xl">

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block mb-2 font-medium">Your Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={form.name}
                                            onChange={handleInput}
                                            className="w-full p-3 rounded-xl bg-[#F0F0F0] focus:bg-white transition"
                                            placeholder="Enter Your Name"
                                        />

                                    </div>
                                    <div>
                                        <label className="block mb-2 font-medium">Date of Birth</label>
                                        <input
                                            type="date"
                                            name="dob"
                                            value={form.dob}
                                            onChange={handleInput}
                                            className="w-full p-3 rounded-xl bg-[#F0F0F0] focus:bg-white transition"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block mb-2 font-medium">Phone Number</label>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={form.phone}
                                            onChange={handleInput}
                                            className="w-full p-3 rounded-xl bg-[#F0F0F0] focus:bg-white transition"
                                            placeholder="Enter Your Number"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 font-medium">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={form.email}
                                            onChange={handleInput}
                                            className="w-full p-3 rounded-xl bg-[#F0F0F0] focus:bg-white transition"
                                            placeholder="Email Address"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block mb-2 font-medium">Your Age</label>
                                        <input
                                            type="number"
                                            name="age"
                                            value={form.age}
                                            onChange={handleInput}
                                            className="w-full p-3 rounded-xl bg-[#F0F0F0] focus:bg-white transition"
                                            placeholder="Enter Your Age"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 font-medium">Visa Criteria</label>
                                        <input
                                            type="text"
                                            name="visa_criteria"
                                            value={form.visa_criteria}
                                            onChange={handleInput}
                                            className="w-full p-3 rounded-xl bg-[#F0F0F0] focus:bg-white transition"
                                            placeholder="Mention Visa Type"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block mb-2 font-medium">Attached Documents</label>
                                    <input
                                        type="file"
                                        onChange={(e) => setFile(e.target.files[0])}
                                        className="w-full p-3 rounded-xl bg-[#F0F0F0] focus:bg-white transition"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 font-medium">Short Notes</label>
                                    <textarea
                                        name="notes"
                                        value={form.notes}
                                        onChange={handleInput}
                                        className="w-full p-3 rounded-xl bg-[#F0F0F0] h-32 focus:bg-white transition"
                                        placeholder="Type your short feedback..."
                                    />
                                </div>
                                {successMessage && (
                                    <p className="text-green-600 p-2 rounded-lg text-sm">
                                        {successMessage}
                                    </p>
                                )}

                                {errorMessage && (
                                    <p className="text-red-600 p-3 rounded-lg text-sm">
                                        {errorMessage}
                                    </p>
                                )}
                                <button
                                    type="submit"
                                    className="bg-black text-white focus:bg-white transition py-3 px-6 rounded-xl font-medium w-full md:w-auto flex items-center gap-2 justify-center"
                                >
                                    Submit Now ↗
                                </button>

                            </form>


                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Faq
                type="home"
                title="General Questions"
                subtitle="We're committed to offering more than just products—we provide exceptional experiences."
            />

            <Footer />

        </div>
    );
}

export default VisaDetails;


