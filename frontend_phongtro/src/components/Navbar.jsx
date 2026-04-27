import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  // State để lưu trạng thái đăng nhập
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  // Mỗi khi chuyển trang (location thay đổi), Navbar sẽ tự kiểm tra lại Token
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token) {
      setIsLoggedIn(true);
      setUserRole(role);
    } else {
      setIsLoggedIn(false);
      setUserRole(null);
    }
  }, [location]);

  // Hàm xử lý đăng xuất ngay trên Navbar
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-extrabold text-slate-800 tracking-tight"
            >
              PhòngTrọ<span className="text-blue-600">TNMT</span>
            </Link>
          </div>

          {/* Menu */}
          <div className="flex space-x-6 items-center">
            <Link
              to="/"
              className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
            >
              Trang chủ
            </Link>
            <Link
              to="/phong-tro"
              className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
            >
              Danh sách phòng
            </Link>
            <Link
              to="/lien-he"
              className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
            >
              Liên hệ
            </Link>

            {/* --- KIỂM TRA TRẠNG THÁI ĐỂ HIỂN THỊ NÚT --- */}
            {!isLoggedIn ? (
              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold transition-all shadow-md transform hover:-translate-y-0.5 inline-block"
              >
                Đăng nhập
              </Link>
            ) : (
              <div className="flex items-center gap-3 border-l border-slate-200 pl-6 ml-2">
                {/* Nếu là Admin/Chủ trọ thì hiện nút đi tới trang Quản lý */}
                {(userRole === "admin" || userRole === "chu_tro") && (
                  <Link
                    to="/quan-ly"
                    className="text-emerald-600 hover:text-emerald-700 font-bold transition-colors"
                  >
                    ⚙️ Quản lý
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
