import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";

function MyContracts() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    api
      .get("/my-contracts")
      .then((response) => {
        if (response.data.success) {
          setContracts(response.data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi lấy hợp đồng:", err);
        setError("Không thể lấy dữ liệu. Vui lòng thử lại.");
        setLoading(false);
      });
  }, [navigate]);

  const formatPrice = (price) => Number(price).toLocaleString("vi-VN");
  const formatDate = (dateStr) => dateStr ? new Date(dateStr).toLocaleDateString("vi-VN") : "N/A";

  const statusMap = {
    active: { text: "Đang hiệu lực", color: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: "✅" },
    expired: { text: "Hết hạn", color: "bg-slate-100 text-slate-600 border-slate-200", icon: "⏰" },
    terminated: { text: "Đã chấm dứt", color: "bg-rose-100 text-rose-700 border-rose-200", icon: "❌" },
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
        <div className="text-xl font-bold text-slate-600">Đang tải hợp đồng...</div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-400 rounded-full blur-[150px] opacity-15 pointer-events-none"></div>
      <div className="absolute top-[40%] right-[-5%] w-[400px] h-[400px] bg-emerald-400 rounded-full blur-[120px] opacity-10 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 pt-16 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 animate-fade-in-up">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white shadow-sm border border-slate-100 text-indigo-600 font-bold text-sm mb-4">
              <span className="text-xl">📄</span> Quản lý hợp đồng
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              Hợp Đồng Thuê Phòng
            </h1>
          </div>
          <div className="mt-4 md:mt-0 text-slate-500 font-medium bg-white px-5 py-3 rounded-2xl shadow-sm border border-slate-100">
            Tổng cộng: <span className="text-slate-900 font-bold">{contracts.length}</span> hợp đồng
          </div>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-600 p-5 rounded-2xl mb-8 font-semibold shadow-sm flex items-center gap-3">
            <span className="text-2xl">⚠️</span> {error}
          </div>
        )}

        {contracts.length === 0 && !error ? (
          <div className="bg-white p-16 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 text-center animate-fade-in-up">
            <div className="text-7xl mb-6 opacity-80">📄</div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">Bạn chưa có hợp đồng nào</h3>
            <p className="text-slate-500 text-lg max-w-md mx-auto">
              Khi bạn ký hợp đồng thuê phòng với chủ trọ, thông tin sẽ hiển thị tại đây.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {contracts.map((contract, index) => {
              const status = statusMap[contract.status] || statusMap.active;
              return (
                <div
                  key={contract.id}
                  className="bg-white rounded-[2rem] p-8 shadow-lg shadow-slate-200/50 border border-slate-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 group animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 group-hover:bg-indigo-50 transition-colors">
                        <span className="text-2xl">{status.icon}</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-slate-900">Phòng {contract.room_number}</h3>
                        <p className="text-slate-400 font-bold text-sm">Tầng {contract.floor} • {contract.area} m²</p>
                      </div>
                    </div>
                    <span className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl shadow-sm border ${status.color}`}>
                      {status.text}
                    </span>
                  </div>

                  <div className="h-px w-12 bg-slate-200 my-6 group-hover:w-full transition-all duration-500"></div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <p className="text-slate-400 font-bold text-xs uppercase tracking-wider mb-1">Ngày bắt đầu</p>
                      <p className="font-bold text-slate-800">{formatDate(contract.start_date)}</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <p className="text-slate-400 font-bold text-xs uppercase tracking-wider mb-1">Ngày kết thúc</p>
                      <p className="font-bold text-slate-800">{formatDate(contract.end_date)}</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <p className="text-slate-400 font-bold text-xs uppercase tracking-wider mb-1">Tiền cọc</p>
                      <p className="font-black text-amber-600">{formatPrice(contract.deposit_amount)} đ</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <p className="text-slate-400 font-bold text-xs uppercase tracking-wider mb-1">Giá thuê / tháng</p>
                      <p className="font-black text-blue-600">{formatPrice(contract.monthly_price)} đ</p>
                    </div>
                  </div>

                  {contract.contract_file && (
                    <div className="bg-blue-50 text-blue-700 p-4 rounded-xl text-sm font-medium border border-blue-100 flex items-center gap-3">
                      <span className="text-lg">📎</span>
                      <a
                        href={contract.contract_file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold hover:underline"
                      >
                        Tải file hợp đồng
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyContracts;
