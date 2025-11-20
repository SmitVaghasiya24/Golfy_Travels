import "./App.css";
import { Routes, Route } from "react-router-dom";
import Topbar from "./components/Topbar";
import CursorFollower from "./components/CursorFollower";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "react-hot-toast";
import Myaccount from './pages/Myaccount'
import AccountLayout from "./pages/UserDashboard/AccountLayout";
import AccountDashboard from "./pages/UserDashboard/AccountDashboard";
import Order from "./pages/UserDashboard/Order";
import Accountdetails from "./pages/UserDashboard/Accountdetails";
import Address from "./pages/UserDashboard/Address";
import Download from "./pages/UserDashboard/Download";
import Home from "./pages/Home";
import BillingAdddress from "./pages/UserDashboard/Address/BillingAddress";
import ShippingAddress from "./pages/UserDashboard/Address/ShippingAddress";

function App() {
  return (
    <>
      <Toaster position="top-right" />

      <Topbar />
      <CursorFollower />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-account" element={<Myaccount />}>
          <Route index element={<AccountDashboard />} />
          <Route path="orders" element={<Order />} />
          <Route path="downloads" element={<Download />} />
          <Route path="addresses" element={<Address />} />
          <Route path="addresses/billing" element={<BillingAdddress />} />
          <Route path="addresses/shipping" element={<ShippingAddress />} />
          <Route path="account-details" element={<Accountdetails />} />
        </Route>



      </Routes>

      <ScrollToTop />
    </>
  );
}

export default App;
