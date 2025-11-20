import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function AccountDashboard() {
  const { userData, signupData, logout, Signout } = useAuth();
  const navigate = useNavigate();

  const activeUser = userData || signupData;

  const handleLogout = () => {
    logout();
    Signout();
    navigate("/my-account");
  };

  return (
    <div className="w-full p-4 sm:p-6 md:px-6 md:py-0  ">
      <div className="max-w-3xl bg-white p-6 md:p-8 rounded-xl shadow-md border">

        <h2 className="text-lg sm:text-xl leading-relaxed text-gray-800">
          Hello{" "}
          <span className="capitalize font-semibold text-gray-900">
            {activeUser?.name || activeUser?.email}
          </span>{" "}
          (not{" "}
          <strong>{activeUser?.name || activeUser?.email}</strong>
          ?{" "}
          <span
            onClick={handleLogout}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Log out
          </span>
          )
        </h2>

        <p className="mt-4 text-gray-700 text-sm sm:text-base leading-6">
          From your account dashboard, you can view your{" "}
          <strong>recent orders</strong>, manage your{" "}
          <strong>shipping and billing addresses</strong>, and{" "}
          <strong>edit your password and account details.</strong>
        </p>

      </div>
    </div>
  );
}

export default AccountDashboard;
