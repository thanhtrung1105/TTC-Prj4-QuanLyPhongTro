import { useState, useEffect } from "react";
import api from "../utils/axios";
import { Link } from "react-router-dom";

function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const [keyword, setKeyword] = useState("");
  const [floor, setFloor] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minArea, setMinArea] = useState("");
  const [maxArea, setMaxArea] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = (params = {}) => {
    setLoading(true);
    const query = new URLSearchParams();
    if (params.keyword) query.append("keyword", params.keyword);
    if (params.floor) query.append("floor", params.floor);
    if (params.minPrice) query.append("min_price", params.minPrice);
    if (params.maxPrice) query.append("max_price", params.maxPrice);
    if (params.minArea) query.append("min_area", params.minArea);
    if (params.maxArea) query.append("max_area", params.maxArea);

    api
      .get(`/rooms/available?${query.toString()}`)
      .then((response) => {
        setRooms(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra:", error);
        setLoading(false);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRooms({ keyword, floor, minPrice, maxPrice, minArea, maxArea });
  };

  const handleReset = () => {
    setKeyword("");
    setFloor("");
    setMinPrice("");
    setMaxPrice("");
    setMinArea("");
    setMaxArea("");
    fetchRooms();
  };

  const formatPrice = (price) => {
    return Number(price).toLocaleString("vi-VN");
  };

  const defaultImage =
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80";

  return (
    <div className="w-full font-sans bg-slate-50 min-h-screen pb-20">
      <section className="bg-slate-900 text-white pt-24 pb-32 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[120px] opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500 rounded-full blur-[120px] opacity-10 transform -translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Khám Phá <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Không Gian Sống</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-medium">
            Tìm kiếm phòng trọ hoàn hảo phù hợp với nhu cầu và ngân sách của bạn.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
        <form onSubmit={handleSearch} className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 p-6 md:p-8 mb-10 animate-fade-in-up">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Tìm kiếm</label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Nhập mã phòng, mô tả..."
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white text-lg"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg shadow-blue-600/30 hover:shadow-xl transition-all transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              🔍 Tìm kiếm
            </button>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-4 px-6 rounded-2xl transition-all whitespace-nowrap"
            >
              {showFilters ? "✕ Ẩn bộ lọc" : "⚡ Bộ lọc"}
            </button>
          </div>

          {showFilters && (
            <div className="mt-6 pt-6 border-t border-slate-100 animate-fade-in-up">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Tầng</label>
                  <select
                    value={floor}
                    onChange={(e) => setFloor(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none bg-slate-50 font-medium"
                  >
                    <option value="">Tất cả</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((f) => (
                      <option key={f} value={f}>Tầng {f}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Diện tích từ (m²)</label>
                  <input
                    type="number"
                    value={minArea}
                    onChange={(e) => setMinArea(e.target.value)}
                    placeholder="15"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none bg-slate-50 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Diện tích đến (m²)</label>
                  <input
                    type="number"
                    value={maxArea}
                    onChange={(e) => setMaxArea(e.target.value)}
                    placeholder="50"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none bg-slate-50 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Giá từ (VNĐ)</label>
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="1000000"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none bg-slate-50 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Giá đến (VNĐ)</label>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="5000000"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none bg-slate-50 font-medium"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-slate-500 hover:text-rose-600 font-bold text-sm transition-colors"
                >
                  🔄 Xóa bộ lọc
                </button>
              </div>
            </div>
          )}
        </form>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-xl border border-slate-100">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <div className="text-xl font-bold text-slate-500">Đang tải danh sách phòng...</div>
          </div>
        ) : rooms.length === 0 ? (
          <div className="bg-white p-16 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 text-center">
            <div className="text-7xl mb-6 opacity-80">🏠</div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">Không tìm thấy phòng phù hợp</h3>
            <p className="text-slate-500 text-lg max-w-md mx-auto">
              Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm để xem thêm kết quả.
            </p>
            <button onClick={handleReset} className="inline-block mt-8 bg-blue-600 text-white font-bold py-3 px-8 rounded-2xl hover:bg-blue-700 transition-colors">
              Xem tất cả phòng
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <div
                className="bg-white rounded-[2rem] shadow-lg shadow-slate-200/40 border border-slate-100 overflow-hidden transition-all duration-300 transform hover:-translate-y-3 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col group"
                key={room.id}
              >
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
                    <span className="px-4 py-1.5 text-sm font-bold rounded-xl shadow-lg text-white backdrop-blur-md bg-emerald-500/90">
                      Còn trống
                    </span>
                  </div>
                </div>

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
