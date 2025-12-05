import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import BreadcrumbHero from "../components/Breadcrumb";
import Login from "./Account/Login";
import Register from "./Account/Register";
import AccountLayout from "./UserDashboard/AccountLayout";

function MyAccountPage() {
    const { userData, signupData } = useAuth();
    const user = userData || signupData;

    return (
        <div>
            <BreadcrumbHero title="My Account" background="/breadcrumb.jpeg" />

            {!user ? (
                <div className="wrapper py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
                    <Login />
                    <Register />
                </div>
            ) : (
                <AccountLayout>
                    <Outlet />
                </AccountLayout>
            )}
        </div>
    );
}

export default MyAccountPage;

