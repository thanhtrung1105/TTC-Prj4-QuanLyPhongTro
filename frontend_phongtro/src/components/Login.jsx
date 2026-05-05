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
      // Gọi API Đăng nhập bên Backend
      const response = await api.post("/login", {
        email: email,
        password: password,
      });

      // SỬA Ở ĐÂY: Không cần "success" nữa. Chỉ cần nhận được Token là chuyển trang!
      const token = response.data.access_token || response.data.token;

      if (token) {
        // Cất Token vào ví
        localStorage.setItem("token", token);
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user || { email: email }),
        );

        // Đá văng sang trang Hóa đơn
        navigate("/hoa-don-cua-toi");
      } else {
        setError("Đăng nhập thất bại: Không nhận được Thẻ xác thực (Token)!");
      }
    } catch (err) {
      // Nếu Backend báo lỗi (Sai pass, không tìm thấy user, v.v...)
      console.error("Chi tiết lỗi:", err);
      if (err.response && err.response.data) {
        setError(
          err.response.data.message || "Tài khoản hoặc mật khẩu không đúng!",
        );
      } else {
        setError("Không thể kết nối đến máy chủ Backend!");
      }
    } finally {
      // Đảm bảo kiểu gì cũng phải tắt chữ "Đang xử lý..." để khách còn bấm lại
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
            Đăng nhập
          </h2>
          <p className="text-slate-500 text-sm">
            Dành cho Khách thuê xem thông tin & Hóa đơn
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          {error && (
            <div className="bg-rose-50 text-rose-600 px-4 py-3 rounded-lg text-sm font-medium border border-rose-100 text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                placeholder="Ví dụ: khachthue@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Mật khẩu
              </label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-md text-lg font-bold text-white transition-all ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:-translate-y-1"
            }`}
          >
            {loading ? "Đang xử lý..." : "Đăng nhập ngay"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-500">
          Chưa có tài khoản?{" "}
          <Link
            to="/lien-he"
            className="font-bold text-blue-600 hover:text-blue-500"
          >
            Liên hệ Chủ trọ để được cấp
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
