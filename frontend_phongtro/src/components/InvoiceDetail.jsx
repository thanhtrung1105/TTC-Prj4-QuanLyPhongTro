import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../utils/axios";

function InvoiceDetail() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/my-invoices/${id}`)
      .then((response) => {
        if (response.data.success) {
          setInvoice(response.data.data);
        } else {
          setError(response.data.message || "Không tìm thấy hóa đơn");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi lấy chi tiết hóa đơn:", err);
        setError("Không thể lấy dữ liệu. Vui lòng thử lại sau.");
        setLoading(false);
      });
  }, [id]);

  const formatPrice = (price) => Number(price).toLocaleString("vi-VN");

  const paidAmount = invoice?.payments?.reduce((sum, p) => sum + Number(p.amount), 0) || 0;
  const remainingAmount = (invoice?.total_amount || 0) - paidAmount;

  if (loading) {
    return (
      <div className="text-center py-20 text-lg font-semibold text-slate-600">
        ⏳ Đang tải chi tiết hóa đơn...
      </div>
    );
  }

  if (error || !invoice) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <div className="bg-rose-50 text-rose-600 p-6 rounded-xl font-medium mb-6 shadow-sm border border-rose-100">
          {error || "Hóa đơn không tồn tại."}
        </div>
        <Link to="/hoa-don-cua-toi" className="text-blue-600 font-bold hover:underline">
          ← Quay lại danh sách hóa đơn
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-50 min-h-[calc(100vh-80px)] pb-20 relative overflow-hidden font-sans">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-400 rounded-full blur-[150px] opacity-10 pointer-events-none"></div>
      <div className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] bg-blue-500 rounded-full blur-[150px] opacity-10 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 pt-10 relative z-10 animate-fade-in-up">
        <Link
          to="/hoa-don-cua-toi"
          className="inline-flex items-center text-slate-500 hover:text-slate-800 font-bold mb-8 transition-colors bg-white px-5 py-2.5 rounded-xl shadow-sm border border-slate-100"
        >
          <span className="mr-2 text-xl">←</span> Quay lại danh sách
        </Link>

        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative">
          
          <div className="bg-slate-900 p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500 rounded-full blur-[80px] opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg text-blue-200 font-bold text-xs uppercase tracking-wider mb-4 border border-white/20">
                  <span>Mã HĐ:</span> {String(invoice.id).padStart(5, "0")}
                </div>
                <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">
                  Biên lai thanh toán
                </h1>
                <p className="text-blue-200 font-medium text-lg">
                  Kỳ thanh toán: <span className="font-bold text-white">Tháng {invoice.month} / {invoice.year}</span>
                </p>
              </div>
              <div className="mt-8 md:mt-0 md:text-right flex flex-col items-start md:items-end">
                <span
                  className={`px-5 py-2 text-sm font-extrabold rounded-xl shadow-lg mb-3 backdrop-blur-md border ${
                    invoice.status === "paid"
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                      : "bg-rose-500/20 text-rose-300 border-rose-500/30"
                  }`}
                >
                  {invoice.status === "paid" ? "✅ Đã thanh toán" : "⚠️ Chưa thanh toán"}
                </span>
                <div className="bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10">
                  <span className="text-slate-300 text-sm">Phòng: </span>
                  <strong className="text-white font-bold text-xl ml-1">{invoice.contract?.room?.room_number || 'N/A'}</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <h3 className="text-xl font-extrabold text-slate-800 mb-6 flex items-center gap-3">
              <span className="bg-blue-100 text-blue-600 w-10 h-10 rounded-xl flex items-center justify-center text-xl">📋</span>
              Chi tiết các khoản phí
            </h3>
            
            <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-sm mb-10">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-xs uppercase font-extrabold tracking-wider">
                    <th className="py-5 px-6">Dịch vụ</th>
                    <th className="py-5 px-6 text-right hidden sm:table-cell">Số lượng</th>
                    <th className="py-5 px-6 text-right hidden sm:table-cell">Đơn giá</th>
                    <th className="py-5 px-6 text-right">Thành tiền</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {invoice.details && invoice.details.length > 0 ? (
                    invoice.details.map((detail) => (
                      <tr key={detail.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="py-5 px-6">
                          <div className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{detail.service_name}</div>
                          <div className="sm:hidden text-xs text-slate-500 mt-1 font-medium">
                            {Number(detail.quantity).toLocaleString("vi-VN")} x {formatPrice(detail.unit_price)} đ
                          </div>
                        </td>
                        <td className="py-5 px-6 text-right text-slate-600 font-medium hidden sm:table-cell">
                          {Number(detail.quantity).toLocaleString("vi-VN")}
                        </td>
                        <td className="py-5 px-6 text-right text-slate-600 font-medium hidden sm:table-cell">
                          {formatPrice(detail.unit_price)} đ
                        </td>
                        <td className="py-5 px-6 text-right font-black text-slate-800">
                          {formatPrice(detail.amount)} đ
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-10 text-center text-slate-500 italic bg-slate-50/50">
                        Không có chi tiết dịch vụ nào được ghi nhận.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 mb-10">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-lg">
                  <span className="font-bold text-slate-600">Tổng cộng hóa đơn:</span>
                  <span className="font-black text-slate-900">{formatPrice(invoice.total_amount)} đ</span>
                </div>
                <div className="flex justify-between items-center text-lg">
                  <span className="font-bold text-slate-600">Đã thanh toán:</span>
                  <span className="font-black text-emerald-600">- {formatPrice(paidAmount)} đ</span>
                </div>
                <div className="h-px w-full bg-slate-200 my-2"></div>
                <div className="flex justify-between items-center">
                  <span className="font-black text-slate-800 text-xl uppercase tracking-widest">Còn nợ:</span>
                  <span className="font-black text-rose-600 text-4xl">{formatPrice(remainingAmount)} đ</span>
                </div>
              </div>
            </div>

            {invoice.payments && invoice.payments.length > 0 && (
              <div className="mb-10">
                <h4 className="font-extrabold text-slate-800 mb-4 flex items-center gap-2">
                  <span className="text-xl">⏱️</span> Lịch sử giao dịch
                </h4>
                <div className="space-y-3">
                  {invoice.payments.map((p) => (
                    <div key={p.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-4 mb-3 sm:mb-0">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-lg">
                          ✓
                        </div>
                        <div>
                          <div className="font-bold text-slate-800 uppercase text-xs tracking-wider mb-1">
                            Phương thức: {{ cash: "Tiền mặt", bank_transfer: "Chuyển khoản", momo: "MoMo", zalopay: "ZaloPay" }[p.payment_method] || p.payment_method}
                          </div>
                          <div className="text-slate-500 font-medium text-sm">{new Date(p.paid_at).toLocaleString("vi-VN")}</div>
                        </div>
                      </div>
                      <div className="font-black text-emerald-600 text-xl text-right sm:text-left ml-14 sm:ml-0">
                        +{formatPrice(p.amount)} đ
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {remainingAmount > 0 && (
              <div className="flex justify-center md:justify-end mt-12 pt-8 border-t border-slate-100">
                <Link
                  to={`/thanh-toan/${invoice.id}`}
                  className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-2xl shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all transform hover:-translate-y-1 inline-flex justify-center items-center gap-3 text-lg"
                >
                  <span className="text-2xl">💳</span> Tiến hành Thanh Toán
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceDetail;
