import { useState } from "react";
import api from "../utils/axios";

function Contact() {
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await api.post("/contact", { fullname, phone, email, message });
      if (response.data.success) {
        setSuccess(true);
        setFullname("");
        setPhone("");
        setEmail("");
        setMessage("");
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (err) {
      if (err.response && err.response.data) {
        const data = err.response.data;
        if (data.errors) {
          const firstError = Object.values(data.errors)[0];
          setError(Array.isArray(firstError) ? firstError[0] : firstError);
        } else {
          setError(data.message || "Gửi tin nhắn thất bại!");
        }
      } else {
        setError("Không thể kết nối đến máy chủ.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full font-sans bg-slate-50 min-h-[calc(100vh-140px)]">
      <section className="bg-slate-900 text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[400px] bg-blue-600 rounded-full blur-[100px] opacity-20"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Liên Hệ Với Chúng Tôi
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto font-medium">
            Bạn có thắc mắc hoặc cần hỗ trợ? Đội ngũ của chúng tôi luôn sẵn sàng giúp đỡ bạn 24/7.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="bg-white p-8 rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 flex items-start gap-4 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl flex-shrink-0">
                📍
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Địa chỉ</h3>
                <p className="text-slate-600 font-medium">Khu công nghệ cao<br/>TP. Hà Nội</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 flex items-start gap-4 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl flex-shrink-0">
                📞
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Điện thoại</h3>
                <p className="text-slate-600 font-medium">0901.234.567</p>
                <p className="text-sm text-slate-400 mt-1">Hỗ trợ khẩn cấp 24/7</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 flex items-start gap-4 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl flex-shrink-0">
                📧
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Email</h3>
                <p className="text-slate-600 font-medium">buitrung4212@gmail.com</p>
                <p className="text-sm text-slate-400 mt-1">Phản hồi trong 2h</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 flex items-start gap-4 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-2xl flex-shrink-0">
                🕒
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Giờ làm việc</h3>
                <p className="text-slate-600 font-medium">8:00 - 18:00</p>
                <p className="text-sm text-slate-400 mt-1">Thứ 2 - Thứ 7</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-6">Gửi tin nhắn cho chúng tôi</h2>

            {success && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-2xl mb-6 font-bold flex items-center gap-3 animate-fade-in-up">
                <span className="text-xl">✅</span> Tin nhắn đã được gửi thành công! Chúng tôi sẽ phản hồi sớm nhất.
              </div>
            )}

            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-600 p-4 rounded-2xl mb-6 font-bold flex items-center gap-3">
                <span className="text-xl">⚠️</span> {error}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Họ và tên</label>
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn A"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Số điện thoại</label>
                  <input
                    type="tel"
                    placeholder="0912 345 678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                <input
                  type="email"
                  required
                  placeholder="nguyenvana@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Nội dung tin nhắn</label>
                <textarea
                  rows="5"
                  required
                  placeholder="Bạn cần hỗ trợ vấn đề gì?..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full font-bold py-4 rounded-2xl shadow-lg transition-all transform ${
                  loading
                    ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 hover:-translate-y-1"
                }`}
              >
                {loading ? "⏳ Đang gửi..." : "Gửi Tin Nhắn"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
