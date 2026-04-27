import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function RoomList() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/rooms")
      .then((response) => {
        setRooms(response.data.data);
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra:", error);
      });
  }, []);

  const formatPrice = (price) => {
    return Number(price).toLocaleString("vi-VN");
  };

  const defaultImage =
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80";

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-slate-900">
          Danh sách Phòng Trọ
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Khám phá các không gian sống lý tưởng dành cho bạn.
        </p>
      </div>

      {/* Grid Danh sách phòng */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {rooms.map((room) => (
          <div
            className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 overflow-hidden transition-all duration-300 transform hover:-translate-y-2 flex flex-col"
            key={room.id}
          >
            {/* Image & Badge */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={room.images ? room.images : defaultImage}
                alt={`Phòng ${room.room_number}`}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
              <span
                className={`absolute top-4 right-4 px-3 py-1 text-sm font-bold rounded-full shadow-md text-white ${room.status === "available" ? "bg-emerald-500" : "bg-rose-500"}`}
              >
                {room.status === "available" ? "Còn trống" : "Đã thuê"}
              </span>
            </div>

            {/* Nội dung */}
            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                Phòng {room.room_number}
              </h2>

              <div className="text-xl font-extrabold text-blue-600 mb-4">
                {formatPrice(room.base_price)}{" "}
                <span className="text-sm text-slate-500 font-normal">
                  đ/tháng
                </span>
              </div>

              <div className="flex gap-4 text-slate-600 text-sm mb-4 pb-4 border-b border-slate-100">
                <span className="flex items-center gap-1">
                  📐 {room.area}m²
                </span>
                <span className="flex items-center gap-1">
                  🏢 Tầng {room.floor}
                </span>
              </div>

              <p className="text-slate-500 text-sm mb-6 flex-grow">
                {room.description
                  ? room.description
                  : "Chưa có mô tả cho phòng này. Liên hệ chủ trọ để biết thêm chi tiết."}
              </p>

              <Link
                to={`/phong-tro/${room.id}`}
                className="block text-center w-full bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white font-semibold py-3 rounded-xl transition-colors duration-200"
              >
                Xem Chi Tiết
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomList;
