import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AccountLayout({ children }) {
    const { logout, Signout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { name: "Dashboard", path: "/my-account" },
        { name: "Orders", path: "/my-account/orders" },
        { name: "Downloads", path: "/my-account/downloads" },
        { name: "Addresses", path: "/my-account/addresses" },
        { name: "Account details", path: "/my-account/account-details" },
    ];

    const handleLogout = () => {
        logout();
        Signout();
        navigate("/my-account");
    };

    return (
        <div className="wrapper py-8 flex flex-col md:flex-row gap-8">

            <div className="w-full md:w-80 p-5 md:p-0 ">
                <div className="border overflow-hidden border-gray-300">

                    {menuItems.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => navigate(item.path)}
                            className={`w-full text-left px-5 py-4 border-b transition text-sm sm:text-base
                ${location.pathname === item.path
                                    ? "bg-blue-600 text-white"
                                    : "hover:bg-gray-100 text-gray-700"
                                }`}
                        >
                            {item.name}
                        </button>
                    ))}

                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-5 py-4 text-red-600 hover:bg-red-50 text-sm sm:text-base"
                    >
                        Log out
                    </button>
                </div>
            </div>

            <div className="flex-1">{children}</div>
        </div>
    );
}
