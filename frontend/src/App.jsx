import "./App.css";
import { Routes, Route } from "react-router-dom";
import Topbar from "./components/Topbar";
import CursorFollower from "./components/CursorFollower";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "react-hot-toast";
import Myaccount from "./pages/Myaccount";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
      />

      <Topbar />
      <CursorFollower />

      <Routes>

        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/my-account" element={<Myaccount />} />
      </Routes>
      <ScrollToTop />
    </>
  );
}

export default App;
