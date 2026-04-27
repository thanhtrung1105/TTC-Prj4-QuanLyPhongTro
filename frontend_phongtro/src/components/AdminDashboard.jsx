import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function AdminDashboard() {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  // --- STATE CHO POPUP THÊM PHÒNG ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    room_number: "",
    floor: 1,
    area: "",
    base_price: "",
    description: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      navigate("/login");
      return;
    }

    // Sửa thành chu_tro theo đúng Database của bạn
    if (role !== "admin" && role !== "chu_tro") {
      alert("Bạn không có quyền truy cập vào khu vực quản trị!");
      navigate("/");
      return;
    }

    fetchRooms();
  }, [navigate]);

  // Hàm gọi API lấy danh sách phòng (Tách ra để tiện gọi lại sau khi thêm mới)
  const fetchRooms = () => {
    axios
      .get("http://127.0.0.1:8000/api/rooms")
      .then((response) => setRooms(response.data.data))
      .catch((error) => console.error("Có lỗi xảy ra:", error));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role"); // Nhớ xóa cả role
    navigate("/login");
  };

  // --- HÀM XỬ LÝ KHI BẤM LƯU PHÒNG ---
  const handleSubmitRoom = (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");

    // Gọi API thêm phòng, bắt buộc phải gửi kèm Token trên Header để Laravel nhận diện
    axios
      .post("http://127.0.0.1:8000/api/rooms", formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        alert("Thêm phòng thành công!");
        setIsModalOpen(false); // Đóng popup
        setFormData({
          room_number: "",
          floor: 1,
          area: "",
          base_price: "",
          description: "",
        }); // Xóa trắng form
        fetchRooms(); // Load lại bảng ngay lập tức
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi thêm phòng:", error);
        alert("Có lỗi xảy ra khi thêm phòng!");
        setLoading(false);
      });
  };

  const formatPrice = (price) => Number(price).toLocaleString("vi-VN");

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 relative">
      {/* --- POPUP (MODAL) THÊM PHÒNG --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full overflow-hidden animate-fade-in">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-xl font-bold text-slate-800">
                Thêm Phòng Mới
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-red-500 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmitRoom} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    Mã Phòng
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-200 outline-none"
                    placeholder="VD: P101"
                    value={formData.room_number}
                    onChange={(e) =>
                      setFormData({ ...formData, room_number: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    Tầng
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-200 outline-none"
                    value={formData.floor}
                    onChange={(e) =>
                      setFormData({ ...formData, floor: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    Diện tích (m²)
                  </label>
                  <input
                    type="number"
                    required
                    step="0.1"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-200 outline-none"
                    placeholder="VD: 25.5"
                    value={formData.area}
                    onChange={(e) =>
                      setFormData({ ...formData, area: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    Giá thuê (VNĐ)
                  </label>
                  <input
                    type="number"
                    required
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-200 outline-none"
                    placeholder="VD: 3500000"
                    value={formData.base_price}
                    onChange={(e) =>
                      setFormData({ ...formData, base_price: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">
                  Mô tả chi tiết
                </label>
                <textarea
                  rows="3"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-200 outline-none resize-none"
                  placeholder="Phòng có cửa sổ, máy lạnh..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                ></textarea>
              </div>

              <div className="pt-4 flex gap-3 justify-end border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 text-slate-600 hover:bg-slate-100 font-semibold rounded-xl transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-colors disabled:bg-blue-300"
                >
                  {loading ? "Đang lưu..." : "Lưu Phòng"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- PHẦN GIAO DIỆN BẢNG BÊN DƯỚI (Giữ nguyên như cũ) --- */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">
              Bảng Điều Khiển Admin
            </h1>
            <p className="text-slate-500 mt-1">
              Quản lý hệ thống phòng trọ TNMT
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              to="/"
              className="px-5 py-2.5 text-slate-600 bg-slate-100 hover:bg-slate-200 font-semibold rounded-xl transition-colors"
            >
              Xem trang khách
            </Link>
            <button
              onClick={handleLogout}
              className="px-5 py-2.5 text-red-600 bg-red-50 hover:bg-red-100 font-semibold rounded-xl transition-colors"
            >
              Đăng xuất
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h2 className="text-xl font-bold text-slate-800">
              Danh sách phòng hiện tại
            </h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md transform hover:-translate-y-0.5"
            >
              <span>+</span> Thêm phòng mới
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider">
                  <th className="p-4 font-semibold border-b border-slate-200">
                    Phòng
                  </th>
                  <th className="p-4 font-semibold border-b border-slate-200">
                    Giá thuê (VNĐ)
                  </th>
                  <th className="p-4 font-semibold border-b border-slate-200">
                    Diện tích
                  </th>
                  <th className="p-4 font-semibold border-b border-slate-200">
                    Trạng thái
                  </th>
                  <th className="p-4 font-semibold border-b border-slate-200 text-center">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rooms.map((room) => (
                  <tr
                    key={room.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="p-4 font-bold text-slate-800">
                      {room.room_number}
                    </td>
                    <td className="p-4 font-bold text-blue-600">
                      {formatPrice(room.base_price)}
                    </td>
                    <td className="p-4 text-slate-600">{room.area} m²</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 text-xs font-bold rounded-full ${room.status === "available" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}
                      >
                        {room.status === "available" ? "Còn trống" : "Đã thuê"}
                      </span>
                    </td>
                    <td className="p-4 text-center space-x-2">
                      <button className="px-3 py-1.5 bg-amber-50 text-amber-600 hover:bg-amber-100 rounded-lg text-sm font-semibold transition-colors">
                        Sửa
                      </button>
                      <button className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm font-semibold transition-colors">
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}

                {rooms.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      className="p-8 text-center text-slate-500 font-medium"
                    >
                      Chưa có dữ liệu phòng. Hãy bấm "Thêm phòng mới".
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
