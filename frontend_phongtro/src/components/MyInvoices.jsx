import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/axios";

function MyInvoices() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token) {
      navigate("/login");
      return;
    }

    api
      .get("/my-invoices")
      .then((response) => {
        if (response.data.success) {
          setInvoices(response.data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi lấy hóa đơn:", err);
        setError("Không thể lấy dữ liệu. Có thể phiên đăng nhập đã hết hạn.");
        setLoading(false);
      });
  }, [navigate]);

  const formatPrice = (price) => Number(price).toLocaleString("vi-VN");

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
        <div className="text-xl font-bold text-slate-600">Đang tải hóa đơn của bạn...</div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-400 rounded-full blur-[150px] opacity-20 pointer-events-none"></div>
      <div className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] bg-emerald-400 rounded-full blur-[120px] opacity-10 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 pt-16 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 animate-fade-in-up">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white shadow-sm border border-slate-100 text-blue-600 font-bold text-sm mb-4">
              <span className="text-xl">🧾</span> Quản lý tài chính
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              Hóa Đơn Của Tôi
            </h1>
          </div>
          <div className="mt-4 md:mt-0 text-slate-500 font-medium bg-white px-5 py-3 rounded-2xl shadow-sm border border-slate-100">
            Tổng cộng: <span className="text-slate-900 font-bold">{invoices.length}</span> hóa đơn
          </div>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-600 p-5 rounded-2xl mb-8 font-semibold shadow-sm flex items-center gap-3">
            <span className="text-2xl">⚠️</span> {error}
          </div>
        )}

        {invoices.length === 0 && !error ? (
          <div className="bg-white p-16 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 text-center animate-fade-in-up">
            <div className="text-7xl mb-6 opacity-80">📄</div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">Bạn chưa có hóa đơn nào</h3>
            <p className="text-slate-500 text-lg mb-8 max-w-md mx-auto">
              Khi bạn thuê phòng và phát sinh chi phí hàng tháng, hóa đơn sẽ xuất hiện tại đây.
            </p>
            <Link
              to="/phong-tro"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 hover:-translate-y-1"
            >
              <span>🔍</span> Xem danh sách phòng
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {invoices.map((invoice, index) => (
              <div
                key={invoice.id}
                className="bg-white rounded-[2rem] p-8 shadow-lg shadow-slate-200/50 border border-slate-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col group animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 group-hover:bg-blue-50 transition-colors">
                    <span className="text-2xl">{invoice.status === "paid" ? "✅" : "⏳"}</span>
                  </div>
                  <span
                    className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl shadow-sm ${
                      invoice.status === "paid"
                        ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                        : "bg-amber-100 text-amber-700 border border-amber-200"
                    }`}
                  >
                    {invoice.status === "paid" ? "Đã thanh toán" : "Chưa thanh toán"}
                  </span>
                </div>

                <div className="mb-8 flex-grow">
                  <p className="text-slate-400 font-bold text-sm uppercase tracking-wider mb-1">Tháng {invoice.month}/{invoice.year}</p>
                  <h3 className="text-3xl font-black text-slate-900 mb-2">#{String(invoice.id).padStart(5, "0")}</h3>
                  <div className="h-px w-12 bg-slate-200 my-4 group-hover:w-full transition-all duration-500"></div>
                  <p className="text-slate-500 font-medium mb-1">Tổng thanh toán</p>
                  <p className={`text-2xl font-black ${invoice.status === "paid" ? "text-slate-800" : "text-blue-600"}`}>
                    {formatPrice(invoice.total_amount)} <span className="text-lg">đ</span>
                  </p>
                </div>

                <Link
                  to={`/hoa-don-cua-toi/${invoice.id}`}
                  className={`w-full py-4 rounded-xl font-bold text-center transition-all ${
                    invoice.status === "paid"
                      ? "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                      : "bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white border border-blue-100 hover:shadow-lg hover:shadow-blue-600/30"
                  }`}
                >
                  {invoice.status === "paid" ? "Xem chi tiết" : "Thanh toán ngay →"}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyInvoices;
