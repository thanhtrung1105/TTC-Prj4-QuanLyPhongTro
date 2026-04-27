import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import RoomList from "./components/RoomList";
import Contact from "./components/Contact";
import RoomDetail from "./components/RoomDetail";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard"; // 1. Import trang quản trị

function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundColor: "#f8fafc",
        }}
      >
        {/* Chú ý: Ta nên ẩn Navbar ở trang Quản trị để giao diện Admin rộng rãi hơn, 
            nhưng tạm thời cứ để nguyên để bạn dễ mường tượng luồng đi */}
        <Navbar />

        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/phong-tro" element={<RoomList />} />
            <Route path="/lien-he" element={<Contact />} />
            <Route path="/phong-tro/:id" element={<RoomDetail />} />
            <Route path="/login" element={<Login />} />

            {/* 2. Cập nhật route Quản lý */}
            <Route path="/quan-ly" element={<AdminDashboard />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
