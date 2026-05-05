import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import RoomList from "./components/RoomList";
import Contact from "./components/Contact";
import RoomDetail from "./components/RoomDetail";
import Login from "./components/Login";
import MyInvoices from "./components/MyInvoices";
import InvoiceDetail from "./components/InvoiceDetail";
import PaymentPage from "./components/PaymentPage";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
        <Navbar />

        <main className="flex-1 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/phong-tro" element={<RoomList />} />
            <Route path="/lien-he" element={<Contact />} />
            <Route path="/phong-tro/:id" element={<RoomDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/hoa-don-cua-toi" element={<MyInvoices />} />
            <Route path="/hoa-don-cua-toi/:id" element={<InvoiceDetail />} />
            <Route path="/thanh-toan/:id" element={<PaymentPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
