import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    axios
      .post("http://127.0.0.1:8000/api/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        // 1. Lưu Token
        localStorage.setItem("token", response.data.token);

        // 2. Lưu Role và gán mặc định nếu API chưa trả về
        const userRole = response.data.user?.role || "khach_thue";
        localStorage.setItem("role", userRole);

        setSuccessMsg("Đăng nhập thành công!");
        setLoading(false);

        // 3. Chuyển hướng thông minh dựa theo Role
        setTimeout(() => {
          if (userRole === "admin" || userRole === "chu_tro") {
            navigate("/quan-ly"); // Dành cho quản lý
          } else {
            navigate("/"); // Dành cho khách thuê
          }
        }, 3000);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response && error.response.status === 401) {
          setError("Email hoặc mật khẩu không chính xác!");
        } else {
          setError("Đã có lỗi kết nối đến máy chủ.");
        }
      });
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center bg-slate-50 px-4 relative overflow-hidden">
      {/* Hiệu ứng nền mờ khi thành công */}
      {successMsg && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 transition-opacity duration-300"></div>
      )}

      {/* Thông báo thành công */}
      {successMsg && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-3xl shadow-2xl flex flex-col items-center gap-6 z-50 text-center border border-slate-100 animate-fade-in">
          <div className="bg-emerald-100 p-5 rounded-full">
            <svg
              className="w-16 h-16 text-emerald-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl font-extrabold text-slate-900">
              {successMsg}
            </h3>
            {/* Đổi câu thông báo chung chung hơn */}
            <p className="text-lg text-slate-600">
              Đang đưa bạn vào hệ thống TNMT trong giây lát...
            </p>
          </div>
          <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mt-4"></div>
        </div>
      )}

      <div
        className={`max-w-md w-full bg-white rounded-2xl shadow-lg border border-slate-100 p-8 transition-all duration-300 ${successMsg ? "opacity-20 scale-95 pointer-events-none" : "z-10"}`}
      >
        <div className="text-center mb-8">
          {/* Đổi Tiêu đề thành Đăng Nhập chung */}
          <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
            Đăng Nhập
          </h2>
          <p className="text-slate-500">Hệ thống Phòng Trọ TNMT</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              placeholder="nhapemail@tnmt.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Mật khẩu
            </label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading || successMsg}
            className={`w-full text-white font-bold py-3 rounded-xl transition-all shadow-md ${loading || successMsg ? "bg-slate-400 cursor-wait" : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5"}`}
          >
            {loading ? "Đang xử lý..." : "Đăng Nhập"}
          </button>
        </form>

        <div className="mt-6 text-center flex flex-col gap-3">
          {/* Thêm liên kết Đăng ký cho sinh viên/khách thuê */}
          <p className="text-sm text-slate-600">
            Chưa có tài khoản?{" "}
            <Link
              to="/dang-ky"
              className="text-blue-600 font-bold hover:underline"
            >
              Đăng ký ngay
            </Link>
          </p>
          <Link
            to="/"
            className="text-sm text-slate-500 hover:text-slate-800 transition-colors"
          >
            ← Quay lại trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
