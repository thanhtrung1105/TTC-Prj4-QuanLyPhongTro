import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../utils/axios";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const userStr = localStorage.getItem("user");

    if (token) {
      setIsLoggedIn(true);
      setUserRole(role);
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          setUserName(user.fullname || user.email || "");
        } catch { setUserName(""); }
      }
    } else {
      setIsLoggedIn(false);
      setUserRole(null);
      setUserName("");
    }
  }, [location]);

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

  const handleLogout = async () => {
    try {
      await api.post("/logout");
    } catch (err) {
      console.error("Logout API error:", err);
    }
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { to: "/", label: "Trang Chủ" },
    { to: "/phong-tro", label: "Danh Sách Phòng" },
    { to: "/lien-he", label: "Liên Hệ" },
  ];

  const userInitial = userName ? userName.charAt(0).toUpperCase() : "?";

  return (
    <nav className="bg-white/80 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-3xl font-black text-slate-900 tracking-tighter"
            >
              PhòngTrọ<span className="text-blue-600">TNMT</span>
            </Link>
          </div>

          <div className="hidden md:flex flex-1 justify-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-bold transition-colors relative py-1 ${
                  isActive(link.to)
                    ? "text-blue-600"
                    : "text-slate-600 hover:text-blue-600"
                }`}
              >
                {link.label}
                {isActive(link.to) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"></span>
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <span className="text-2xl">{isMobileMenuOpen ? "✕" : "☰"}</span>
            </button>

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
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-blue-400 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                    {userInitial}
                  </div>
                  <span className="font-bold text-slate-700 hidden lg:inline-block max-w-[120px] truncate">
                    {userName || "Tài khoản"}
                  </span>
                  <span className={`text-xs text-slate-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}>▼</span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden py-2 animate-fade-in-up">
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="text-sm font-bold text-slate-800 truncate">{userName || "Xin chào!"}</p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {userRole === "admin" ? "Quản trị viên" : userRole === "chu_tro" ? "Chủ trọ" : "Khách thuê phòng"}
                      </p>
                    </div>

                    <div className="py-1 border-b border-slate-100">
                      {(userRole === "admin" || userRole === "chu_tro") && (
                        <a
                          href="http://127.0.0.1:8000/admin"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-emerald-600 transition-colors"
                        >
                          <span>⚙️</span> Quản trị hệ thống
                        </a>
                      )}
                      
                      <Link
                        to="/tai-khoan"
                        onClick={() => setIsDropdownOpen(false)}
                        className={`flex items-center gap-3 px-4 py-2.5 text-sm font-semibold transition-colors ${
                          isActive("/tai-khoan") ? "text-blue-600 bg-blue-50" : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                        }`}
                      >
                        <span>👤</span> Thông tin cá nhân
                      </Link>
                      <Link
                        to="/hoa-don-cua-toi"
                        onClick={() => setIsDropdownOpen(false)}
                        className={`flex items-center gap-3 px-4 py-2.5 text-sm font-semibold transition-colors ${
                          location.pathname.startsWith("/hoa-don") ? "text-blue-600 bg-blue-50" : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                        }`}
                      >
                        <span>🧾</span> Hóa đơn của tôi
                      </Link>
                      <Link
                        to="/hop-dong-cua-toi"
                        onClick={() => setIsDropdownOpen(false)}
                        className={`flex items-center gap-3 px-4 py-2.5 text-sm font-semibold transition-colors ${
                          isActive("/hop-dong-cua-toi") ? "text-blue-600 bg-blue-50" : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                        }`}
                      >
                        <span>📄</span> Hợp đồng thuê
                      </Link>
                      <Link
                        to="/yeu-cau-bao-duong"
                        onClick={() => setIsDropdownOpen(false)}
                        className={`flex items-center gap-3 px-4 py-2.5 text-sm font-semibold transition-colors ${
                          isActive("/yeu-cau-bao-duong") ? "text-amber-600 bg-amber-50" : "text-slate-700 hover:bg-slate-50 hover:text-amber-600"
                        }`}
                      >
                        <span>🛠️</span> Yêu cầu bảo trì
                      </Link>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2.5 w-full text-left text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
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

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 py-4 animate-fade-in-up">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl font-bold transition-colors ${
                    isActive(link.to) ? "text-blue-600 bg-blue-50" : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {isLoggedIn && (
                <>
                  <div className="border-t border-slate-100 my-2"></div>
                  <Link
                    to="/tai-khoan"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-xl font-bold transition-colors flex items-center gap-3 ${
                      isActive("/tai-khoan") ? "text-blue-600 bg-blue-50" : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span>👤</span> Tài khoản
                  </Link>
                  <Link
                    to="/hoa-don-cua-toi"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-xl font-bold transition-colors flex items-center gap-3 ${
                      location.pathname.startsWith("/hoa-don") ? "text-blue-600 bg-blue-50" : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span>🧾</span> Hóa đơn
                  </Link>
                  <Link
                    to="/hop-dong-cua-toi"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-xl font-bold transition-colors flex items-center gap-3 ${
                      isActive("/hop-dong-cua-toi") ? "text-blue-600 bg-blue-50" : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span>📄</span> Hợp đồng
                  </Link>
                  <Link
                    to="/yeu-cau-bao-duong"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-xl font-bold transition-colors flex items-center gap-3 ${
                      isActive("/yeu-cau-bao-duong") ? "text-amber-600 bg-amber-50" : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span>🛠️</span> Bảo trì
                  </Link>
                  <div className="border-t border-slate-100 my-2"></div>
                  <button
                    onClick={() => { setIsMobileMenuOpen(false); handleLogout(); }}
                    className="px-4 py-3 rounded-xl font-bold text-rose-600 hover:bg-rose-50 transition-colors flex items-center gap-3 text-left w-full"
                  >
                    <span>🚪</span> Đăng xuất
                  </button>
                </>
              )}

              {!isLoggedIn && (
                <>
                  <div className="border-t border-slate-100 my-2"></div>
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-xl font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors text-center"
                  >
                    Đăng Nhập
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

