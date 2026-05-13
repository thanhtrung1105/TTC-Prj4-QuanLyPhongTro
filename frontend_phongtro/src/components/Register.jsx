import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/axios";

function Register() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== passwordConfirm) {
      setError("Mật khẩu xác nhận không khớp!");
      return;
    }

    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự!");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/register", {
        fullname,
        email,
        phone,
        password,
        password_confirmation: passwordConfirm,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        if (response.data.user.role) {
          localStorage.setItem("role", response.data.user.role);
        }
        navigate("/tai-khoan");
      } else {
        setError("Đăng ký thất bại. Vui lòng thử lại.");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        const data = err.response.data;
        if (data.errors) {
          const firstError = Object.values(data.errors)[0];
          setError(Array.isArray(firstError) ? firstError[0] : firstError);
        } else {
          setError(data.message || "Đăng ký thất bại!");
        }
      } else {
        setError("Không thể kết nối đến máy chủ!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-emerald-500 rounded-full blur-[120px] opacity-30 transform translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[120px] opacity-20 transform -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-md w-full bg-white/10 backdrop-blur-2xl p-10 rounded-[2.5rem] shadow-2xl border border-white/20 relative z-10 animate-fade-in-up">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-emerald-400 text-white shadow-lg shadow-emerald-500/30 mb-6">
            <span className="text-3xl">✨</span>
          </div>
          <h2 className="text-4xl font-extrabold text-white mb-2 tracking-tight">
            Đăng Ký
          </h2>
          <p className="text-emerald-200 font-medium text-sm">
            Tạo tài khoản để quản lý phòng trọ
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleRegister}>
          {error && (
            <div className="bg-rose-500/20 text-rose-300 px-4 py-3 rounded-xl text-sm font-medium border border-rose-500/30 text-center backdrop-blur-md">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-white/90 mb-2 ml-1">
              Họ và tên
            </label>
            <input
              type="text"
              required
              className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none transition-all backdrop-blur-sm shadow-inner"
              placeholder="Nguyễn Văn A"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-white/90 mb-2 ml-1">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none transition-all backdrop-blur-sm shadow-inner"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-white/90 mb-2 ml-1">
              Số điện thoại
            </label>
            <input
              type="tel"
              className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none transition-all backdrop-blur-sm shadow-inner"
              placeholder="0901234567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-white/90 mb-2 ml-1">
                Mật khẩu
              </label>
              <input
                type="password"
                required
                className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none transition-all backdrop-blur-sm shadow-inner"
                placeholder="••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-white/90 mb-2 ml-1">
                Xác nhận
              </label>
              <input
                type="password"
                required
                className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none transition-all backdrop-blur-sm shadow-inner"
                placeholder="••••••"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.4)] text-lg font-bold text-white transition-all duration-300 mt-4 ${
              loading
                ? "bg-emerald-500/50 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] transform hover:-translate-y-1"
            }`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin text-xl">⏳</span> Đang xử lý...
              </span>
            ) : (
              "Tạo tài khoản"
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-white/60">
          Đã có tài khoản?{" "}
          <Link
            to="/login"
            className="font-bold text-blue-400 hover:text-blue-300 transition-colors"
          >
            Đăng nhập ngay
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
