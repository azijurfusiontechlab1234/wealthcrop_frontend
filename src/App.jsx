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
;

const queryClient = new QueryClient();

function App() {
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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
      </main>

      <Footer />
    </QueryClientProvider>
  );
}

export default App;
