import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import RoomList from "./components/RoomList";
import Contact from "./components/Contact";
import RoomDetail from "./components/RoomDetail";
import Login from "./components/Login";
import Register from "./components/Register";
import MyInvoices from "./components/MyInvoices";
import InvoiceDetail from "./components/InvoiceDetail";
import PaymentPage from "./components/PaymentPage";
import MyProfile from "./components/MyProfile";
import MyContracts from "./components/MyContracts";
import MyMaintenanceRequests from "./components/MyMaintenanceRequests";
import NotFound from "./components/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
        <Navbar />
        <main className="flex-1 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/phong-tro" element={<RoomList />} />
            <Route path="/lien-he" element={<Contact />} />
            <Route path="/phong-tro/:id" element={<RoomDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dang-ky" element={<Register />} />
            <Route path="/tai-khoan" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
            <Route path="/hop-dong-cua-toi" element={<ProtectedRoute><MyContracts /></ProtectedRoute>} />
            <Route path="/yeu-cau-bao-duong" element={<ProtectedRoute><MyMaintenanceRequests /></ProtectedRoute>} />
            <Route path="/hoa-don-cua-toi" element={<ProtectedRoute><MyInvoices /></ProtectedRoute>} />
            <Route path="/hoa-don-cua-toi/:id" element={<ProtectedRoute><InvoiceDetail /></ProtectedRoute>} />
            <Route path="/thanh-toan/:id" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
