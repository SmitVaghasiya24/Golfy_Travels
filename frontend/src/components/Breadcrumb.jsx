import { Link, useLocation } from "react-router-dom";

export default function BreadcrumbHero({ title, background }) {
    const location = useLocation();
    const pathParts = location.pathname.split("/").filter((part) => part !== "");

    return (
        <div
            className="w-full h-[350px] bg-cover bg-center relative flex items-center justify-center"
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="relative text-center text-white z-10">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight max-w-4xl mx-auto font-bold mb-7 text-center">
                    {title}
                </h1>

                <nav className="text-md px-1 flex items-center justify-center gap-2">
                    <Link
                        to="/"
                        className="cursor-hide text-white hover:text-white font-medium transition"
                    >
                        Home
                    </Link>

                    {pathParts.map((part, index) => {
                        const path = "/" + pathParts.slice(0, index + 1).join("/");

                        const formatted = part
                            .split("-")
                            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                            .join(" ");

                        return (
                            <span
                                key={path}
                                className="flex items-center gap-2 text-white text-sm sm:text-base"
                            >
                                <span className="flex items-center justify-center leading-none">•</span>

                                {/* Link */}
                                <Link
                                    to={path}
                                    className={`transition 
                                     ${index === pathParts.length - 1
                                            ? "text-white font-semibold"
                                            : "text-white hover:text-gray-100"}
                                    `}
                                >
                                    {formatted}
                                </Link>
                            </span>
                        );
                    })}

                </nav>
            </div>
        </div>
    );
}
