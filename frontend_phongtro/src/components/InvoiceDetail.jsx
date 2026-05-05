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
    <div className="w-full animate-fade-in">
      <Link
        to="/hoa-don-cua-toi"
        className="inline-flex items-center text-slate-500 hover:text-slate-800 font-medium mb-6 transition-colors"
      >
        <span className="mr-2">←</span> Quay lại danh sách
      </Link>

      <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
        {/* Header hóa đơn */}
        <div className="bg-slate-50 p-8 md:p-10 border-b border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
              Hóa đơn #{String(invoice.id).padStart(5, "0")}
            </h1>
            <p className="text-slate-500 font-medium text-lg">
              Kỳ thanh toán: Tháng {invoice.month} / {invoice.year}
            </p>
          </div>
          <div className="mt-6 md:mt-0 md:text-right">
            <span
              className={`px-5 py-2 text-sm font-extrabold rounded-full inline-block mb-3 shadow-sm ${
                invoice.status === "paid"
                  ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                  : "bg-amber-100 text-amber-700 border border-amber-200"
              }`}
            >
              {invoice.status === "paid" ? "Đã thanh toán" : "Chưa thanh toán"}
            </span>
            <p className="text-slate-500 text-base">
              Phòng: <strong className="text-slate-800 font-bold">{invoice.contract?.room?.room_number || 'N/A'}</strong>
            </p>
          </div>
        </div>

        {/* Chi tiết dịch vụ */}
        <div className="p-8 md:p-10">
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span>📋</span> Chi tiết các khoản phí
          </h3>
          
          <div className="overflow-x-auto rounded-xl border border-slate-100">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm uppercase font-bold">
                  <th className="py-4 px-6">Dịch vụ</th>
                  <th className="py-4 px-6 text-right">Số lượng</th>
                  <th className="py-4 px-6 text-right">Đơn giá</th>
                  <th className="py-4 px-6 text-right">Thành tiền</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoice.details && invoice.details.length > 0 ? (
                  invoice.details.map((detail) => (
                    <tr key={detail.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-5 px-6 font-semibold text-slate-800">
                        {detail.service_name}
                      </td>
                      <td className="py-5 px-6 text-right text-slate-600">
                        {Number(detail.quantity).toLocaleString("vi-VN")}
                      </td>
                      <td className="py-5 px-6 text-right text-slate-600">
                        {formatPrice(detail.unit_price)} đ
                      </td>
                      <td className="py-5 px-6 text-right font-bold text-slate-800">
                        {formatPrice(detail.amount)} đ
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-8 text-center text-slate-500 italic">
                      Không có chi tiết dịch vụ nào.
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot className="bg-slate-50 border-t-2 border-slate-200">
                <tr>
                  <td colSpan="3" className="py-4 px-6 text-right font-bold text-slate-600 text-lg">
                    Tổng cộng:
                  </td>
                  <td className="py-4 px-6 text-right font-black text-slate-800 text-xl">
                    {formatPrice(invoice.total_amount)} đ
                  </td>
                </tr>
                <tr>
                  <td colSpan="3" className="py-2 px-6 text-right font-bold text-emerald-600 text-base">
                    Đã thanh toán:
                  </td>
                  <td className="py-2 px-6 text-right font-bold text-emerald-600 text-lg">
                    - {formatPrice(paidAmount)} đ
                  </td>
                </tr>
                <tr>
                  <td colSpan="3" className="py-6 px-6 text-right font-extrabold text-slate-800 text-xl uppercase tracking-wider">
                    Còn nợ:
                  </td>
                  <td className="py-6 px-6 text-right font-black text-rose-600 text-3xl">
                    {formatPrice(remainingAmount)} đ
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Lịch sử thanh toán */}
          {invoice.payments && invoice.payments.length > 0 && (
            <div className="mt-8">
              <h4 className="font-bold text-slate-700 mb-4">Lịch sử giao dịch:</h4>
              <ul className="space-y-2">
                {invoice.payments.map((p) => (
                  <li key={p.id} className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100 text-sm">
                    <span className="text-slate-500">{new Date(p.paid_at).toLocaleString("vi-VN")}</span>
                    <span className="font-medium text-slate-600 uppercase">{p.payment_method}</span>
                    <span className="font-bold text-emerald-600">+{formatPrice(p.amount)} đ</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Nút thanh toán */}
          {remainingAmount > 0 && (
            <div className="mt-10 flex justify-end">
              <Link
                to={`/thanh-toan/${invoice.id}`}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-transform hover:-translate-y-1 inline-flex items-center gap-2"
              >
                <span>💳</span> Thanh toán ngay
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InvoiceDetail;
