import Footer from "../../components/Footer";
import { MdArrowOutward } from "react-icons/md";


function Error() {

    return (
        <>
            <div className="overflow-x-hidden flex flex-col items-center justify-center bg-white">

                <div className="w-full max-w-[380px] mx-auto px-4">

                    <img
                        src="/erroe.webp"
                        alt="404 Error"
                        className="w-full h-auto block rounded-xl mb-8"
                    />

                    <h1 className="text-3xl font-bold text-gray-800 text-center">
                        Oops! Looks like you’ve taken a wrong turn.
                    </h1>

                    <p className="text-gray-600 text-center mt-3 mb-8">
                        The page you’re looking for doesn’t exist. Let’s get you back on track!
                    </p>

                    <button
                        onClick={() => (window.location.href = "/")}
                        className="relative overflow-hidden bg-black text-white px-6 py-3 mb-14 rounded-full 
                       font-semibold text-sm transition duration-300 mx-auto block group"
                    >
                        <span
                            className="absolute inset-0 bg-blue-600 translate-y-full 
                         group-hover:translate-y-0 transition-transform duration-300"
                        ></span>

                        <span className="relative z-10 flex items-center gap-2">
                            Go to Homepage <MdArrowOutward />
                        </span>
                    </button>

                </div>
            </div>
            <Footer />
        </>
    );
}

export default Error;
