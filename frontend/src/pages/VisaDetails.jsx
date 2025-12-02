import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BreadcrumbHero from "../components/Breadcrumb";

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

    useEffect(() => {
        const fetchCountry = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/get_visa_country_slug/${slug}`);
                const data = await res.json();

                if (data.success) {
                    setCountryData(data.country);
                    setVisaTypes(data.visa_types);
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchCountry();
    }, [slug]);

    return (
        <div>
            <BreadcrumbHero
                title={countryData ? countryData.country : "Country Name"}
                background="/breadcrumb.jpeg"
            />

            <div className="container ">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 
            place-items-center mt-16 gap-6">
                    {visaTypes.map((visa) => (
                        <div
                            key={visa.id}
                            className="
                                 bg-[#F2F2FF] border border-white/10 rounded-2xl px-6 py-3 
                                    text-center cursor-pointer
                                    hover:bg-white hover:text-black 
                                   transition-all duration-300 w-50 
                             "
                        >
                            <div className="flex justify-center my-4">
                                <img
                                    src={visaIcons[visa.type_name] || "/icons/default.svg"}
                                    alt={visa.type_name}
                                    loading="lazy"
                                    className="w-12 h-12 object-contain"
                                />
                            </div>

                            <h3 className="text-xl font-semibold mb-2">
                                {visa.type_name}
                            </h3>

                            <p className="group-hover:text-black text-sm whitespace-nowrap mb-2">
                                ${visa.price} / per person
                            </p>

                        </div>
                    ))}
                </div>
            </div>

            <div className="container">
                <div className="max-w-[700px] mt-16">
                    <h2 className="text-3xl font-semibold mb-6">
                        Documents Requirement
                    </h2>

                    <div className=" bg-white border rounded-2xl border-gray-200 p-4 ">

                        <ul className="space-y-4 text-gray-800 leading-relaxed">
                            <li>Valid Passport (Minimum 6 months validity beyond your travel dates).</li>
                            <li>Previous Passports (if applicable).</li>
                            <li>Photocopies of Passport Bio-Data Page & past visas (if any).</li>
                            <li>Proof of Sufficient Funds (bank statements, salary slips).</li>
                            <li>Travel Insurance (mandatory for Schengen & some other visas).</li>
                            <li>Must cover medical emergencies, repatriation & COVID-related expenses.</li>
                        </ul>

                    </div>
                </div>

            </div>

            <div className="container">
                <div className="max-w-[700px] mt-16">
                    <h2 className="text-3xl font-semibold mb-6">
                        Additional Requirement
                    </h2>

                    <div className=" bg-white border rounded-2xl border-gray-200 p-4 ">

                        <ul className="space-y-4 text-gray-800 leading-relaxed">
                            <li>Copies of previous visas (Schengen, US, UK, Canada, etc.).</li>
                            <li>Proof of international travel history (stamps in old passports).</li>
                            <li>A cover letter explaining the purpose of travel.</li>
                            <li>Bank Statements & ID Proof of the sponsor.</li>
                            <li>Police Clearance Certificate (PCC) (for some countries).</li>
                        </ul>

                    </div>
                </div>

            </div>

            <div className="container">
                <div className="max-w-[700px] mt-16">
                    <h2 className="text-3xl font-semibold mb-6">
                        Conditional Requirement
                    </h2>

                    <div className=" bg-white border rounded-2xl border-gray-200 p-4 ">

                        <ul className="space-y-4 text-gray-800 leading-relaxed">
                            <li>Birth Certificate of the child.</li>
                            <li>Consent Letter from the non-traveling parent (if only one parent is traveling).</li>
                            <li>Proof of Guardianship (if applicable).</li>
                            <li>Family ties proof to ensure return to home country.</li>
                        </ul>

                    </div>
                </div>

            </div>

            <div className="container">

                <div
                    className="
      bg-[#F2F2FF] rounded-3xl p-10 
      max-w-[700px] mt-16
    "
                >

                    <h2 className="text-3xl font-semibold flex items-center gap-3 mb-6">
                        <img src="/visa/icon/reject.png" alt="reject icon" className="w-7 h-7" />
                        Visa Rejection Reasons
                    </h2>

                    <div className="flex flex-col lg:flex-row items-start justify-between gap-10">

                        <div className=" w-full">
                            <h3 className="text-xl font-semibold mb-4">
                                Common Reasons for Rejection:
                            </h3>

                            <ul className="space-y-4 text-gray-800 leading-relaxed">
                                <li>Insufficient financial proof.</li>
                                <li>Lack of strong ties to home country.</li>
                                <li>Incomplete or false documentation.</li>
                                <li>Suspicious travel history or security concerns.</li>
                            </ul>
                        </div>

                        <div className=" flex justify-center lg:justify-end">
                            <img
                                src="/visa/img/visa.png"
                                alt="Visa Rejected"
                                className="w-[260px] lg:w-[340px]"
                            />
                        </div>

                    </div>

                </div>

            </div>

            <div className="container ">

                <div className="max-w-[700px] mt-16">
                    <h2 className="text-3xl font-semibold flex items-center gap-3 mb-6">
                        <img src="/visa/icon/warning.png" alt="reject icon" className="w-7 h-7" />
                        Important Note
                    </h2>

                    <div className="bg-[#E6F6A9] rounded-3xl p-8">

                        <ul className="space-y-4 text-gray-800 leading-relaxed">
                            <li>Not all applicants need to submit these additional documents.</li>
                            <li>Conditional requirements depend on your nationality, travel history, and purpose of visit.</li>
                            <li>Providing incomplete or false information can lead to visa rejection.</li>
                        </ul>

                    </div>
                </div>

            </div>




        </div>
    );
}

export default VisaDetails;
