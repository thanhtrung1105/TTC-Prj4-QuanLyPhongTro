import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../utils/axios";

function PaymentPage() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [amountType, setAmountType] = useState("full"); 
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
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
        <div className="text-xl font-bold text-slate-600">Đang chuẩn bị cổng thanh toán...</div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-emerald-500/20 border border-emerald-100 text-center relative z-10 animate-fade-in-up">
          <div className="w-24 h-24 bg-gradient-to-tr from-emerald-400 to-emerald-300 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-emerald-500/30">
            <span className="text-5xl text-white">✓</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Thanh toán thành công!</h2>
          <p className="text-slate-500 font-medium mb-8">
            Hệ thống đã ghi nhận khoản thanh toán <br/>
            <span className="text-2xl font-bold text-emerald-600 mt-2 block">{formatPrice(submitAmount)} đ</span>
          </p>
          <Link
            to={`/hoa-don-cua-toi/${id}`}
            className="block w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            Quay lại Biên lai
          </Link>
        </div>
      </div>
    );
  }

  if (error && !invoice) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 text-center">
          <div className="text-6xl mb-6">⚠️</div>
          <div className="bg-rose-50 text-rose-600 p-4 rounded-xl font-bold mb-8">
            {error}
          </div>
          <Link to="/hoa-don-cua-toi" className="block w-full bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 transition-colors">
            ← Trở về danh sách
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-50 min-h-[calc(100vh-80px)] py-12 relative overflow-hidden font-sans">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-400 rounded-full blur-[150px] opacity-10 pointer-events-none"></div>

      <div className="max-w-3xl mx-auto px-4 relative z-10 animate-fade-in-up">
        <Link
          to={`/hoa-don-cua-toi/${id}`}
          className="inline-flex items-center text-slate-500 hover:text-slate-800 font-bold mb-6 transition-colors bg-white px-5 py-2.5 rounded-xl shadow-sm border border-slate-100"
        >
          <span className="mr-2 text-xl">←</span> Hủy thanh toán
        </Link>

        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 md:p-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white rounded-full blur-[80px] opacity-10 transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="flex justify-between items-center relative z-10">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg text-white font-bold text-xs uppercase tracking-wider mb-4 border border-white/20">
                  <span>Mã HĐ:</span> {String(invoice.id).padStart(5, "0")}
                </div>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-1">Cổng Thanh Toán</h1>
                <p className="text-blue-100 font-medium">
                  Phòng {invoice.contract?.room?.room_number} • Tháng {invoice.month}/{invoice.year}
                </p>
              </div>
              <div className="hidden md:flex w-20 h-20 bg-white/10 rounded-2xl backdrop-blur-md items-center justify-center border border-white/20 shadow-inner">
                <span className="text-4xl">💳</span>
              </div>
            </div>
          </div>

          {error && invoice && (
            <div className="mx-8 mt-8 p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl font-bold flex items-center gap-3">
              <span className="text-xl">⚠️</span> {error}
            </div>
          )}

          <div className="p-8 md:p-10">
            <div className="flex flex-col sm:flex-row gap-4 mb-10 bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-inner">
               <div className="flex-1 text-center">
                  <p className="text-slate-400 font-bold mb-1 text-xs uppercase tracking-wider">Tổng hóa đơn</p>
                  <p className="text-xl font-bold text-slate-800">{formatPrice(invoice.total_amount)} đ</p>
               </div>
               <div className="hidden sm:block w-px bg-slate-200"></div>
               <div className="flex-1 text-center">
                  <p className="text-slate-400 font-bold mb-1 text-xs uppercase tracking-wider">Đã trả</p>
                  <p className="text-xl font-bold text-emerald-600">{formatPrice(paidAmount)} đ</p>
               </div>
               <div className="hidden sm:block w-px bg-slate-200"></div>
               <div className="flex-1 text-center">
                  <p className="text-slate-400 font-bold mb-1 text-xs uppercase tracking-wider">Còn nợ</p>
                  <p className="text-2xl font-black text-rose-600">{formatPrice(remainingAmount)} đ</p>
               </div>
            </div>

            {remainingAmount === 0 ? (
              <div className="text-center py-12 bg-emerald-50 rounded-3xl border border-emerald-100 shadow-sm">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">🎉</div>
                <h3 className="text-2xl font-black text-emerald-700 mb-2">Tất toán thành công!</h3>
                <p className="text-emerald-600 font-medium">Hóa đơn này không còn dư nợ.</p>
              </div>
            ) : (
              <>
                <div className="mb-10">
                  <h3 className="text-lg font-extrabold text-slate-800 mb-5 flex items-center gap-3">
                    <span className="bg-slate-900 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-md">1</span> 
                    Số tiền thanh toán
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <button
                      type="button"
                      onClick={() => setAmountType("full")}
                      className={`p-4 rounded-2xl border-2 text-center transition-all ${
                        amountType === "full" ? "border-blue-600 bg-blue-50/50 shadow-[0_0_15px_rgba(37,99,235,0.15)] ring-1 ring-blue-600 transform scale-[1.02]" : "border-slate-100 bg-white hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <div className={`font-bold mb-2 text-sm uppercase tracking-wider ${amountType === "full" ? "text-blue-700" : "text-slate-500"}`}>Toàn bộ</div>
                      <div className={`text-xl font-black ${amountType === "full" ? "text-blue-700" : "text-slate-800"}`}>{formatPrice(remainingAmount)} đ</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setAmountType("half")}
                      className={`p-4 rounded-2xl border-2 text-center transition-all ${
                        amountType === "half" ? "border-blue-600 bg-blue-50/50 shadow-[0_0_15px_rgba(37,99,235,0.15)] ring-1 ring-blue-600 transform scale-[1.02]" : "border-slate-100 bg-white hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <div className={`font-bold mb-2 text-sm uppercase tracking-wider ${amountType === "half" ? "text-blue-700" : "text-slate-500"}`}>Một nửa (50%)</div>
                      <div className={`text-xl font-black ${amountType === "half" ? "text-blue-700" : "text-slate-800"}`}>{formatPrice(Math.round(remainingAmount / 2))} đ</div>
                    </button>
                    <div
                      className={`p-4 rounded-2xl border-2 flex flex-col justify-center transition-all cursor-text ${
                        amountType === "custom" ? "border-blue-600 bg-blue-50/50 shadow-[0_0_15px_rgba(37,99,235,0.15)] ring-1 ring-blue-600 transform scale-[1.02]" : "border-slate-100 bg-white hover:border-slate-300 hover:bg-slate-50"
                      }`}
                      onClick={() => setAmountType("custom")}
                    >
                      <div className={`text-center font-bold mb-2 text-sm uppercase tracking-wider ${amountType === "custom" ? "text-blue-700" : "text-slate-500"}`}>Nhập số khác</div>
                      <div className="relative px-2">
                        <input
                          type="text"
                          value={formatPrice(customAmount || 0)}
                          onChange={handleCustomAmountChange}
                          placeholder="0"
                          className={`w-full text-center border-b-2 py-1 focus:outline-none bg-transparent text-xl font-black ${
                            amountType === "custom" ? "border-blue-400 text-blue-700" : "border-slate-200 text-slate-800"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setAmountType("custom");
                          }}
                        />
                        <span className={`absolute right-0 top-1.5 font-bold ${amountType === "custom" ? "text-blue-400" : "text-slate-400"}`}>đ</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-12">
                  <h3 className="text-lg font-extrabold text-slate-800 mb-5 flex items-center gap-3">
                    <span className="bg-slate-900 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-md">2</span> 
                    Phương thức thanh toán
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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
                        className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-center transition-all gap-2 ${
                          paymentMethod === method.id 
                            ? "border-emerald-500 bg-emerald-50/50 text-emerald-700 shadow-[0_0_15px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500 transform scale-[1.02]" 
                            : "border-slate-100 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700"
                        }`}
                      >
                        <span className="text-3xl mb-1">{method.icon}</span>
                        <span className="text-sm font-bold">{method.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900 p-6 md:p-8 rounded-3xl flex flex-col md:flex-row justify-between items-center shadow-2xl relative overflow-hidden">
                  <div className="absolute right-0 bottom-0 w-32 h-32 bg-emerald-500 rounded-full blur-[60px] opacity-20 pointer-events-none"></div>
                  
                  <div className="mb-6 md:mb-0 text-center md:text-left relative z-10 flex flex-col items-center md:items-start">
                    <p className="text-slate-400 font-bold mb-1 text-xs uppercase tracking-wider">Thanh toán ngay</p>
                    <p className="text-4xl font-black text-white flex items-center gap-2">
                      {formatPrice(submitAmount)} <span className="text-xl text-emerald-400">VNĐ</span>
                    </p>
                  </div>
                  
                  <button
                    onClick={handlePayment}
                    disabled={isSubmitting || submitAmount < 1000 || submitAmount > remainingAmount}
                    className={`relative z-10 px-8 py-4 rounded-2xl font-bold text-lg transition-all w-full md:w-auto shadow-lg flex items-center justify-center gap-2 ${
                      isSubmitting || submitAmount < 1000 || submitAmount > remainingAmount
                        ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
                        : "bg-emerald-500 hover:bg-emerald-400 text-slate-900 hover:shadow-emerald-500/50 hover:shadow-xl transform hover:-translate-y-1"
                    }`}
                  >
                    {isSubmitting ? (
                       <><span className="animate-spin text-xl">⏳</span> Đang xử lý...</>
                    ) : (
                       <><span>✓</span> Xác nhận thanh toán</>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
