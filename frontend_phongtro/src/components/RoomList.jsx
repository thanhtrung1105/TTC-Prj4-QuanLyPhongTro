import { useState, useEffect } from "react";
import api from "../utils/axios";
import { Link } from "react-router-dom";

function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/rooms/available")
      .then((response) => {
        setRooms(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra:", error);
        setLoading(false);
      });
  }, []);

  const formatPrice = (price) => {
    return Number(price).toLocaleString("vi-VN");
  };

  const defaultImage =
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80";

  return (
    <div className="w-full font-sans bg-slate-50 min-h-screen pb-20">
      {/* Hero Header */}
      <section className="bg-slate-900 text-white pt-24 pb-32 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[120px] opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500 rounded-full blur-[120px] opacity-10 transform -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Khám Phá <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Không Gian Sống</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-medium">
            Tìm kiếm phòng trọ hoàn hảo phù hợp với nhu cầu và ngân sách của bạn. Hàng trăm lựa chọn đang chờ đợi.
          </p>
        </div>
      </section>

      {/* Main Content (overlapping header) */}
      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
        
        {loading ? (
          <div className="flex justify-center items-center py-20 bg-white rounded-3xl shadow-xl border border-slate-100">
            <div className="text-xl font-bold text-slate-500 flex items-center gap-3">
              <span className="animate-spin text-3xl">⏳</span> Đang tải danh sách phòng...
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <div
                className="bg-white rounded-[2rem] shadow-lg shadow-slate-200/40 border border-slate-100 overflow-hidden transition-all duration-300 transform hover:-translate-y-3 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col group"
                key={room.id}
              >
                {/* Image & Badge */}
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                  <img
                    src={room.images ? (Array.isArray(room.images) && room.images.length > 0 ? room.images[0] : room.images) : defaultImage}
                    alt={`Phòng ${room.room_number}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-5 left-5 z-20">
                    <span className="bg-white/90 backdrop-blur-md text-slate-900 px-3 py-1.5 rounded-xl font-extrabold text-sm shadow-sm">
                      Phòng {room.room_number}
                    </span>
                  </div>
                  <div className="absolute top-5 right-5 z-20">
                    <span
                      className={`px-4 py-1.5 text-sm font-bold rounded-xl shadow-lg text-white backdrop-blur-md ${room.status === "available" ? "bg-emerald-500/90" : "bg-rose-500/90"}`}
                    >
                      {room.status === "available" ? "Còn trống" : "Đã thuê"}
                    </span>
                  </div>
                </div>

                {/* Nội dung */}
                <div className="p-8 flex flex-col flex-grow relative">
                  <div className="absolute -top-6 right-8 bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-lg shadow-blue-600/40 z-20 transform group-hover:rotate-12 transition-transform">
                    🏠
                  </div>
                  
                  <div className="text-2xl font-black text-blue-600 mb-5">
                    {formatPrice(room.base_price)}{" "}
                    <span className="text-sm text-slate-500 font-medium">
                      đ/tháng
                    </span>
                  </div>

                  <div className="flex gap-4 text-slate-600 text-sm mb-5 pb-5 border-b border-slate-100">
                    <span className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg font-semibold">
                      <span className="text-blue-500 text-lg">📐</span> {room.area}m²
                    </span>
                    <span className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg font-semibold">
                      <span className="text-amber-500 text-lg">🏢</span> Tầng {room.floor}
                    </span>
                  </div>

                  <p className="text-slate-500 text-sm mb-8 flex-grow leading-relaxed line-clamp-3">
                    {room.description
                      ? room.description
                      : "Không gian sống lý tưởng với đầy đủ tiện nghi cơ bản. Phù hợp cho sinh viên và người đi làm."}
                  </p>

                  <Link
                    to={`/phong-tro/${room.id}`}
                    className="block text-center w-full bg-slate-50 hover:bg-blue-600 text-slate-800 hover:text-white font-bold py-4 rounded-2xl transition-all duration-300 border border-slate-100 hover:border-transparent group-hover:shadow-lg group-hover:shadow-blue-600/20"
                  >
                    Xem Chi Tiết Phòng
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RoomList;
