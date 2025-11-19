import BreadcrumbHero from "../components/Breadcrumb";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Register from "./Account/Register";
import Login from "./Account/Login";

function Myaccount() {
    return (
        <div>
            <BreadcrumbHero title="My Account" background="/breadcrumb.jpeg" />

            <div className="wrapper py-12 grid grid-cols-1 md:grid-cols-2 gap-12">

                <div className=" justify-center self-start">
                    <Login />
                </div>

                <div className=" justify-center self-start">
                    <Register />
                </div>

            </div>

        </div>
    );
}

export default Myaccount;
