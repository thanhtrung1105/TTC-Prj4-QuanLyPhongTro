import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/axios";

function MyInvoices() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Lấy Token từ "ví" (Local Storage)
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    // Nếu không có token (chưa đăng nhập) -> Đá văng ra trang Login
    if (!token) {
      navigate("/login");
      return;
    }

    // 2. Gọi API kèm theo Token để xin dữ liệu
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
      <div className="text-center py-20 text-lg font-semibold">
        ⏳ Đang tải hóa đơn của bạn...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 min-h-[calc(100vh-140px)]">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
          Hóa đơn của tôi
        </h1>
        <p className="text-slate-500">
          Quản lý các khoản thanh toán tiền phòng và dịch vụ.
        </p>
      </div>

      {error && (
        <div className="bg-rose-50 text-rose-600 p-4 rounded-xl mb-6 font-medium">
          {error}
        </div>
      )}

      {invoices.length === 0 && !error ? (
        <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-200 text-center">
          <p className="text-slate-500 text-lg mb-4">
            Bạn chưa có hóa đơn nào.
          </p>
          <Link
            to="/phong-tro"
            className="text-blue-600 font-bold hover:underline"
          >
            ← Quay lại xem phòng
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm uppercase font-bold">
                  <th className="p-4">Mã HĐ</th>
                  <th className="p-4">Tháng/Năm</th>
                  <th className="p-4">Tổng tiền</th>
                  <th className="p-4">Trạng thái</th>
                  <th className="p-4 text-center">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoices.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="p-4 font-semibold text-slate-800">
                      #{String(invoice.id).padStart(5, "0")}
                    </td>
                    <td className="p-4 text-slate-600">
                      {invoice.month}/{invoice.year}
                    </td>
                    <td className="p-4 font-bold text-blue-600">
                      {formatPrice(invoice.total_amount)} đ
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 text-xs font-bold rounded-full ${
                          invoice.status === "paid"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {invoice.status === "paid"
                          ? "Đã thanh toán"
                          : "Chưa thanh toán"}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <Link
                        to={`/hoa-don-cua-toi/${invoice.id}`}
                        className="text-blue-600 hover:text-blue-800 font-semibold text-sm underline"
                      >
                        Xem chi tiết
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyInvoices;
