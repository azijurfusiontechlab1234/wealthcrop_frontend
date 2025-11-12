import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
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
import HoverSection from "./components/hovercomp/HoverSection";
import OldHeader from "./components/OldHeader";
import ProtectRoute from "./components/ProtectRoute";
import FODashboard from "./components/F&ODashboard";
import MFDashboard from "./components/MFDashboard";
import Header2 from "./components/Header2";
import { useSelector } from "react-redux";
import BasicDetails from "./pages/profile/BasicDetails";
import ChangePassword from "./pages/profile/ChangePassword";
import ChangePin from "./pages/profile/ChangePin";
import ReportActivity from "./pages/profile/ReportActivity";
import AccountForm from "./pages/profile/AccountForm";
import Explore from "./pages/stocks/Explore";
import Holdings from "./pages/stocks/Holdings";
import Positions from "./pages/stocks/Positions";
import Orders from "./pages/stocks/Orders";
import Watchlist from "./pages/stocks/Watchlist";

const queryClient = new QueryClient();

function App() {
  // const [token, setToken] = useState(localStorage.getItem("token"));

  const { token } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   // Listen for token changes (manual refresh of state)
  //   const handleStorageChange = () => {
  //     setToken(localStorage.getItem("token"));
  //   };
  //   window.addEventListener("storage", handleStorageChange);
  //   return () => window.removeEventListener("storage", handleStorageChange);
  // }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* ✅ Fixed Header */}
      {/* ✅ Large screens (always show OldHeader) */}
      <div className="hidden md:block sticky top-0 left-0 w-full z-50">
        <OldHeader />
      </div>

      {/* ✅ Mobile screens */}
      <div className="block lg:hidden fixed top-0 left-0 w-full z-50">
        {token ? <Header2 /> : <OldHeader />}
      </div>

      {/* ✅ Page Content */}
      <main className=" mt-28 lg:mt-24 pb-10 min-h-[calc(100vh-200px)] bg-gray-50">
        <Routes>
  {/* Protected routes */}
  <Route element={<ProtectRoute user={token} />}>
    
    {/* Stocks */}
    <Route path="/user/stocks" element={<Dashboard />}>
      <Route index element={<Navigate to="explore" replace />} />
      <Route path="explore" element={<Explore />} />
      <Route path="holdings" element={<Holdings />} />
      <Route path="positions" element={<Positions />} />
      <Route path="orders" element={<Orders />} />
      <Route path="watchlist" element={<Watchlist />} />
    </Route>

    {/* F&O and Mutual Fund */}
    <Route path="/user/f&o" element={<FODashboard />} />
    <Route path="/user/mutual_fund" element={<MFDashboard />} />

    {/* Profile */}
    <Route path="/profile" element={<Profile />}>
      <Route index element={<Navigate to="basic" replace />} />
      <Route path="basic" element={<BasicDetails />} />
      <Route path="change-password" element={<ChangePassword />} />
      <Route path="change-pin" element={<ChangePin />} />
      <Route path="report-activity" element={<ReportActivity />} />
      <Route path="account-forms" element={<AccountForm />} />
    </Route>
  </Route>

  {/* Public routes */}
  <Route
    path="/"
    element={token ? <Navigate to="/user/stocks" /> : <Home />}
  />
  <Route path="/investments" element={<Investment />} />
  <Route path="/portfolio" element={<Portfolio />} />
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
