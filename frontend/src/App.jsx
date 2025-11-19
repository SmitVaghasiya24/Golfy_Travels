import "./App.css";
import { Routes, Route } from "react-router-dom";
import Topbar from "../components/Topbar";
import CursorFollower from "../components/CursorFollower";
import ScrollToTop from "../components/ScrollToTop";
import Myaccount from "../pages/Myaccount";

function App() {
  return (
    <>
      <Topbar />
      <CursorFollower />

      <Routes>

        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/my-account" element={<Myaccount />} />
      </Routes>
      <ScrollToTop/>
    </>
  );
}

export default App;
