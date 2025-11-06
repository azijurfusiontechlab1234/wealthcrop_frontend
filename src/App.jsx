import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Investment from "./pages/Investment";
import Portfolio from "./pages/Portfolio";
import Profile from "./pages/Profile";
import Login from "./auth/Login";
import Register from "./auth/Register";
import SipCalculator from "./components/home/SipCalculator";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import Dashboard from "./components/DashBoard";

const queryClient = new QueryClient();


function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));



  useEffect(() => {
    // Listen for token changes (manual refresh of state)
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* ✅ Fixed Header */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Header token={token} />
      </div>

      {/* ✅ Page Content */}
      <main className="pt-[100px] pb-10 min-h-[calc(100vh-200px)] bg-gray-50">
        <Routes>
          {/* 👇 Conditional rendering on same "/" route */}
          <Route path="/" element={ <Home />} />
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
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </QueryClientProvider>
  );
}

export default App;
