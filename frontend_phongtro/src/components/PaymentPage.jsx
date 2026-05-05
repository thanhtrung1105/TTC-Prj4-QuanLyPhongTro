import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../utils/axios";

function PaymentPage() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Payment states
  const [amountType, setAmountType] = useState("full"); // full, half, custom
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("bank_transfer");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchInvoice();
  }, [id]);

  const fetchInvoice = () => {
    setLoading(true);
    api
      .get(`/my-invoices/${id}`)
      .then((response) => {
        if (response.data.success) {
          setInvoice(response.data.data);
          if (response.data.data.status === "paid") {
             setError("Hóa đơn này đã được thanh toán toàn bộ.");
          }
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
  };

  const formatPrice = (price) => Number(price).toLocaleString("vi-VN");

  const paidAmount = invoice?.payments?.reduce((sum, p) => sum + Number(p.amount), 0) || 0;
  const remainingAmount = (invoice?.total_amount || 0) - paidAmount;

  // Tính số tiền thực tế sẽ submit
  const getSubmitAmount = () => {
    if (amountType === "full") return remainingAmount;
    if (amountType === "half") return Math.round(remainingAmount / 2);
    if (amountType === "custom") {
      const parsed = parseInt(customAmount.replace(/[^0-9]/g, ""), 10);
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  };

  const submitAmount = getSubmitAmount();

  const handleCustomAmountChange = (e) => {
    // Chỉ lấy số
    const value = e.target.value.replace(/[^0-9]/g, "");
    setCustomAmount(value);
  };

  const handlePayment = () => {
    if (submitAmount < 1000) {
      alert("Số tiền thanh toán tối thiểu là 1.000 đ");
      return;
    }
    if (submitAmount > remainingAmount) {
      alert("Số tiền thanh toán không được lớn hơn số tiền còn nợ.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    api.post(`/my-invoices/${id}/pay`, {
      amount: submitAmount,
      payment_method: paymentMethod
    })
      .then((response) => {
        if (response.data.success) {
          setSuccess(true);
        } else {
          setError(response.data.message);
        }
      })
      .catch((err) => {
        console.error("Lỗi thanh toán:", err);
        setError(err.response?.data?.message || "Lỗi khi xử lý thanh toán.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  if (loading) {
    return <div className="text-center py-20 text-lg font-semibold text-slate-600">⏳ Đang tải dữ liệu...</div>;
  }

  if (success) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="bg-emerald-50 text-emerald-600 p-10 rounded-3xl shadow-sm border border-emerald-100">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-3xl font-extrabold mb-4">Thanh toán thành công!</h2>
          <p className="mb-8 font-medium">Hệ thống đã ghi nhận khoản thanh toán {formatPrice(submitAmount)} đ.</p>
          <Link
            to={`/hoa-don-cua-toi/${id}`}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-xl transition-colors"
          >
            Quay lại chi tiết hóa đơn
          </Link>
        </div>
      </div>
    );
  }

  if (error && !invoice) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="bg-rose-50 text-rose-600 p-6 rounded-xl font-medium mb-6">
          {error}
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
        to={`/hoa-don-cua-toi/${id}`}
        className="inline-flex items-center text-slate-500 hover:text-slate-800 font-medium mb-6 transition-colors"
      >
        <span className="mr-2">←</span> Quay lại chi tiết hóa đơn
      </Link>

      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="bg-blue-600 p-8 md:p-10 text-white flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold mb-2">Thanh Toán Hóa Đơn</h1>
            <p className="text-blue-100 font-medium text-lg">
              Phòng {invoice.contract?.room?.room_number} • Tháng {invoice.month}/{invoice.year}
            </p>
          </div>
          <div className="text-5xl opacity-80">💳</div>
        </div>

        {error && invoice && (
          <div className="m-8 p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl font-medium">
            {error}
          </div>
        )}

        <div className="p-8 md:p-10">
          {/* Thông tin số nợ */}
          <div className="flex flex-col md:flex-row gap-6 mb-10 bg-slate-50 p-6 rounded-2xl border border-slate-100">
             <div className="flex-1 text-center md:text-left">
                <p className="text-slate-500 font-medium mb-1 text-sm uppercase tracking-wide">Tổng hóa đơn</p>
                <p className="text-2xl font-bold text-slate-800">{formatPrice(invoice.total_amount)} đ</p>
             </div>
             <div className="flex-1 border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 pl-0 md:pl-6 text-center md:text-left">
                <p className="text-slate-500 font-medium mb-1 text-sm uppercase tracking-wide">Đã trả</p>
                <p className="text-2xl font-bold text-emerald-600">{formatPrice(paidAmount)} đ</p>
             </div>
             <div className="flex-1 border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 pl-0 md:pl-6 text-center md:text-left">
                <p className="text-slate-500 font-medium mb-1 text-sm uppercase tracking-wide">Còn nợ</p>
                <p className="text-3xl font-black text-rose-600">{formatPrice(remainingAmount)} đ</p>
             </div>
          </div>

          {remainingAmount === 0 ? (
            <div className="text-center py-10 bg-emerald-50 rounded-2xl border border-emerald-100">
              <h3 className="text-2xl font-bold text-emerald-600 mb-2">Tất toán thành công!</h3>
              <p className="text-emerald-700">Hóa đơn này đã được thanh toán đầy đủ.</p>
            </div>
          ) : (
            <>
              {/* Lựa chọn số tiền */}
              <div className="mb-10">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span> 
                  Chọn số tiền muốn thanh toán
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setAmountType("full")}
                    className={`p-3 rounded-xl border-2 text-center transition-all ${
                      amountType === "full" ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm" : "border-slate-200 text-slate-600 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div className="font-semibold mb-1 text-sm">Toàn bộ</div>
                    <div className="text-lg font-bold">{formatPrice(remainingAmount)} đ</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setAmountType("half")}
                    className={`p-3 rounded-xl border-2 text-center transition-all ${
                      amountType === "half" ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm" : "border-slate-200 text-slate-600 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div className="font-semibold mb-1 text-sm">Một nửa (50%)</div>
                    <div className="text-lg font-bold">{formatPrice(Math.round(remainingAmount / 2))} đ</div>
                  </button>
                  <div
                    className={`p-3 rounded-xl border-2 flex flex-col justify-center transition-all ${
                      amountType === "custom" ? "border-blue-600 bg-blue-50 shadow-sm" : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                    onClick={() => setAmountType("custom")}
                  >
                    <div className={`text-center font-semibold mb-1 text-sm ${amountType === "custom" ? "text-blue-700" : "text-slate-600"}`}>Tùy chỉnh</div>
                    <div className="relative">
                      <input
                        type="text"
                        value={formatPrice(customAmount || 0)}
                        onChange={handleCustomAmountChange}
                        placeholder="0"
                        className="w-full text-center border-b border-slate-300 py-1 focus:outline-none focus:border-blue-600 bg-transparent text-lg font-bold text-slate-800"
                        onClick={(e) => {
                          e.stopPropagation();
                          setAmountType("custom");
                        }}
                      />
                      <span className="absolute right-2 top-2 text-slate-400 font-bold">đ</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hình thức thanh toán */}
              <div className="mb-10">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span> 
                  Chọn hình thức thanh toán
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { id: "bank_transfer", label: "Chuyển khoản", icon: "🏦" },
                    { id: "momo", label: "Ví MoMo", icon: "📱" },
                    { id: "zalopay", label: "ZaloPay", icon: "💬" },
                    { id: "cash", label: "Tiền mặt", icon: "💵" },
                  ].map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-3 rounded-xl border-2 flex flex-col items-center justify-center transition-all gap-1 ${
                        paymentMethod === method.id ? "border-blue-600 bg-blue-50 text-blue-700 font-bold shadow-sm" : "border-slate-200 text-slate-600 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <span className="text-2xl mb-1">{method.icon}</span>
                      <span className="text-xs font-medium">{method.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Box Xác nhận */}
              <div className="bg-slate-900 text-white p-6 md:p-8 rounded-2xl flex flex-col md:flex-row justify-between items-center shadow-lg relative overflow-hidden">
                <div className="absolute -right-10 -top-10 text-8xl opacity-5">💰</div>
                <div className="mb-6 md:mb-0 text-center md:text-left relative z-10">
                  <p className="text-slate-400 font-medium mb-1 text-xs uppercase tracking-wider">Bạn đang thanh toán</p>
                  <p className="text-3xl md:text-4xl font-bold text-emerald-400">{formatPrice(submitAmount)} đ</p>
                </div>
                <button
                  onClick={handlePayment}
                  disabled={isSubmitting || submitAmount < 1000 || submitAmount > remainingAmount}
                  className={`relative z-10 px-6 py-3 rounded-xl font-bold text-base transition-all w-full md:w-auto ${
                    isSubmitting || submitAmount < 1000 || submitAmount > remainingAmount
                      ? "bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed"
                      : "bg-emerald-500 hover:bg-emerald-400 text-slate-900"
                  }`}
                >
                  {isSubmitting ? "⏳ Đang xử lý..." : "✓ Xác nhận thanh toán"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
