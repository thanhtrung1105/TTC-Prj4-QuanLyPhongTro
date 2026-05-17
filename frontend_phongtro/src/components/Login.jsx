import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/login", {
        email: email,
        password: password,
      });

      const token = response.data.access_token || response.data.token;

      if (token) {
        localStorage.setItem("token", token);

        const userData = response.data.user || { email: email };
        localStorage.setItem("user", JSON.stringify(userData));
        if (userData.role) {
          localStorage.setItem("role", userData.role);
        }

        navigate("/");
      } else {
        setError("Đăng nhập thất bại: Không nhận được Thẻ xác thực (Token)!");
      }
    } catch (err) {
      console.error("Chi tiết lỗi:", err);
      if (err.response && err.response.data) {
        setError(
          err.response.data.message || "Tài khoản hoặc mật khẩu không đúng!",
        );
      } else {
        setError("Không thể kết nối đến máy chủ Backend!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[120px] opacity-30 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-emerald-500 rounded-full blur-[120px] opacity-20 transform translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-md w-full bg-white/10 backdrop-blur-2xl p-10 rounded-[2.5rem] shadow-2xl border border-white/20 relative z-10 animate-fade-in-up">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-500 to-blue-400 text-white shadow-lg shadow-blue-500/30 mb-6">
            <span className="text-3xl">👤</span>
          </div>
          <h2 className="text-4xl font-extrabold text-white mb-2 tracking-tight">
            Đăng Nhập
          </h2>
          <p className="text-blue-200 font-medium text-sm">
            Quản lý phòng trọ và hóa đơn của bạn
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          {error && (
            <div className="bg-rose-500/20 text-rose-300 px-4 py-3 rounded-xl text-sm font-medium border border-rose-500/30 text-center backdrop-blur-md">
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-white/90 mb-2 ml-1">
                Địa chỉ Email
              </label>
              <input
                type="email"
                required
                className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all backdrop-blur-sm shadow-inner"
                placeholder="Ví dụ: khachthue@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-white/90 mb-2 ml-1">
                Mật khẩu
              </label>
              <input
                type="password"
                required
                className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all backdrop-blur-sm shadow-inner"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-[0_0_20px_rgba(37,99,235,0.4)] text-lg font-bold text-white transition-all duration-300 mt-8 ${
              loading
                ? "bg-blue-500/50 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transform hover:-translate-y-1"
            }`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin text-xl">⏳</span> Đang xử lý...
              </span>
            ) : (
              "Đăng nhập ngay"
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-white/60">
          Chưa có tài khoản?{" "}
          <Link
            to="/dang-ky"
            className="font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
