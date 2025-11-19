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
        toastOptions={{
          duration: 3000,
          style: {
            background: "#ffffff",
            padding: "12px 16px",
            color: "#333",
            borderRadius: "10px",
            border: "1px solid #E5E7EB",
            boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
            fontSize: "14px",
            fontWeight: "500",
          },

          success: {
            icon: "✔️",
            style: {
              background: "#E8F5FF",
              border: "1px solid #B6E0FF",
              color: "#0B6BCB",
            },
          },

          error: {
            icon: "⚠️",
            style: {
              background: "#FFEDEB",
              border: "1px solid #FFD0CC",
              color: "#C5332A",
            },
          },
        }}
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
