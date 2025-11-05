import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MutualFundCarousel from "./carousel/MutualFundCarousel";
import Home from "./pages/Home";
import Investment from "./pages/Investment";
import Portfolio from "./pages/Portfolio";
import Profile from "./pages/Profile";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SipCalculator from "./components/home/SipCalculator";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

function App() {
const [token,setToken] = useState("")
  useEffect(()=>{
    setToken(localStorage.getItem("token"))
  },[])



  return (
    <QueryClientProvider client={queryClient}>
      {/* ✅ Fixed top section with carousel and header */}
      <div className="fixed top-0 left-0 w-full z-50">
        {/* <MutualFundCarousel /> */}
        <Header />
      </div>

      {/* ✅ Space for fixed section (height adjusted) */}
      <main className="pt-[150px] pb-10 min-h-[calc(100vh-200px)] bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/investments" element={<Investment />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sip_Cal" element={<SipCalculator />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
      </main>

      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}       // auto-close after 3s
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"        // optional: "light" | "dark" | "colored"
      />
    </QueryClientProvider>
  );
}

export default App;
