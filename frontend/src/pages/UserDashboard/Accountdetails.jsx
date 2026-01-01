import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import API from "../../services/api";

function Accountdetails() {

  const user = JSON.parse(localStorage.getItem("userData"));
  const user_id = user?.id;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    current_password: "",
    new_password: "",
    confirm_password: ""
  });

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get(`/api/profile/${user_id}`);
        const data = res.data.user;

        setFormData(prev => ({
          ...prev,
          name: data.name || "",
          email: data.email || ""
        }));
      } catch (err) {
        console.log(err);
      }
    };

    if (user_id) fetchUser();
  }, [user_id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.put(
        `/api/update_profile/${user_id}`,
        {
          name: formData.name,
          current_password: formData.current_password,
          new_password: formData.new_password,
          confirm_password: formData.confirm_password
        }
      );

      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-3xl p-6 sm:p-6 md:px-8 md:py-0">
      <form className="bg-white space-y-6" onSubmit={handleSubmit}>

        <div>
          <label className="block text-gray-700 mb-1 font-medium flex items-center gap-1">
            Name
            <span className="text-red-600">*</span>
          </label>

          <input
            type="text"
            name="name"
            className="w-full border border-black rounded px-3 py-2"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1 font-medium">Email</label>
          <input
            type="text"
            className="w-full border rounded-lg px-4 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
            value={formData.email}
            readOnly
          />
        </div>

        <div className="pt-4 border-t">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Change Password</h3>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1 font-medium">
              Current Password (leave blank to leave unchanged)
            </label>

            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                name="current_password"
                className="w-full border rounded-lg px-4 py-2 pr-10"
                value={formData.current_password}
                onChange={handleChange}
              />

              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
                onClick={() => setShowCurrent(!showCurrent)}
              >
                {showCurrent ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              New Password (leave blank to leave unchanged)
            </label>

            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                name="new_password"
                className="w-full border rounded-lg px-4 py-2 pr-10"
                value={formData.new_password}
                onChange={handleChange}
              />

              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
                onClick={() => setShowNew(!showNew)}
              >
                {showNew ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirm_password"
                className="w-full border rounded-lg px-4 py-2 pr-10"
                value={formData.confirm_password}
                onChange={handleChange}
              />

              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>

        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
        >
          Update Profile
        </button>

      </form>
    </div>
  );
}

export default Accountdetails;
