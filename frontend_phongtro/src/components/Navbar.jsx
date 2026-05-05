import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  // Click ra ngoài để đóng dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white/80 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo (Bên trái) */}
          <div className="flex-shrink-0 w-1/4">
            <Link
              to="/"
              className="text-3xl font-black text-slate-900 tracking-tighter"
            >
              PhòngTrọ<span className="text-blue-600">TNMT</span>
            </Link>
          </div>

          {/* Menu Chính (Ra giữa) */}
          <div className="hidden md:flex flex-1 justify-center space-x-10">
            <Link
              to="/"
              className="text-slate-600 hover:text-blue-600 font-bold transition-colors"
            >
              Trang Chủ
            </Link>
            <Link
              to="/phong-tro"
              className="text-slate-600 hover:text-blue-600 font-bold transition-colors"
            >
              Danh Sách Phòng
            </Link>
            <Link
              to="/lien-he"
              className="text-slate-600 hover:text-blue-600 font-bold transition-colors"
            >
              Liên Hệ
            </Link>
          </div>

          {/* User / Nút (Bên phải) */}
          <div className="flex-shrink-0 w-1/4 flex justify-end items-center">
            {!isLoggedIn ? (
              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-md transform hover:-translate-y-0.5 inline-block"
              >
                Đăng Nhập
              </Link>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-4 py-2 rounded-full transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                    👤
                  </div>
                  <span className="font-bold text-slate-700 hidden lg:inline-block">Tài khoản</span>
                  <span className="text-xs text-slate-400">▼</span>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden py-2 animate-fade-in-up">
                    <div className="px-4 py-3 border-b border-slate-50">
                      <p className="text-sm font-bold text-slate-800">Xin chào!</p>
                      <p className="text-xs text-slate-500">{userRole === 'admin' ? 'Quản trị viên' : 'Khách thuê phòng'}</p>
                    </div>

                    <div className="py-2 border-b border-slate-50">
                      {(userRole === "admin" || userRole === "chu_tro") && (
                        <Link
                          to="/quan-ly"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-emerald-600 transition-colors"
                        >
                          <span>⚙️</span> Quản trị hệ thống
                        </Link>
                      )}
                      
                      <Link
                        to="/tai-khoan"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                      >
                        <span>👤</span> Thông tin cá nhân
                      </Link>
                      <Link
                        to="/hoa-don-cua-toi"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                      >
                        <span>🧾</span> Hóa đơn của tôi
                      </Link>
                      <Link
                        to="/hop-dong-cua-toi"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                      >
                        <span>📄</span> Hợp đồng thuê
                      </Link>
                      <Link
                        to="/yeu-cau-bao-duong"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-amber-600 transition-colors"
                      >
                        <span>🛠️</span> Yêu cầu bảo trì
                      </Link>
                    </div>

                    <div className="py-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2 w-full text-left text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        <span>🚪</span> Đăng xuất
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
