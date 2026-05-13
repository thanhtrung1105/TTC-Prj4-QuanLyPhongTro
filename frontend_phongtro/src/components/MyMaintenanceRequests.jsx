import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";

function MyMaintenanceRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchRequests();
  }, [navigate]);

  const fetchRequests = () => {
    setLoading(true);
    api
      .get("/my-maintenance-requests")
      .then((response) => {
        if (response.data.success) {
          setRequests(response.data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi lấy yêu cầu bảo trì:", err);
        setError("Không thể lấy dữ liệu. Vui lòng thử lại.");
        setLoading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    api
      .post("/my-maintenance-requests", {
        title: formTitle,
        description: formDescription,
      })
      .then((response) => {
        if (response.data.success) {
          setShowForm(false);
          setFormTitle("");
          setFormDescription("");
          fetchRequests();
        } else {
          setError(response.data.message);
        }
      })
      .catch((err) => {
        console.error("Lỗi gửi yêu cầu:", err);
        setError(err.response?.data?.message || "Lỗi khi gửi yêu cầu bảo trì.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const formatPrice = (price) => price ? Number(price).toLocaleString("vi-VN") : "N/A";
  const formatDate = (dateStr) => dateStr ? new Date(dateStr).toLocaleDateString("vi-VN") : "N/A";

  const statusMap = {
    pending: { text: "Chờ xử lý", color: "bg-amber-100 text-amber-700 border-amber-200", icon: "⏳" },
    in_progress: { text: "Đang xử lý", color: "bg-blue-100 text-blue-700 border-blue-200", icon: "🔧" },
    completed: { text: "Hoàn thành", color: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: "✅" },
    rejected: { text: "Từ chối", color: "bg-rose-100 text-rose-700 border-rose-200", icon: "❌" },
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
        <div className="text-xl font-bold text-slate-600">Đang tải yêu cầu bảo trì...</div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-amber-400 rounded-full blur-[150px] opacity-15 pointer-events-none"></div>
      <div className="absolute top-[30%] right-[-5%] w-[400px] h-[400px] bg-rose-400 rounded-full blur-[120px] opacity-10 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 pt-16 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 animate-fade-in-up">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white shadow-sm border border-slate-100 text-amber-600 font-bold text-sm mb-4">
              <span className="text-xl">🛠️</span> Bảo trì & Sửa chữa
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              Yêu Cầu Bảo Trì
            </h1>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className={`mt-4 md:mt-0 inline-flex items-center gap-2 font-bold py-3 px-6 rounded-2xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 ${
              showForm
                ? "bg-slate-200 text-slate-700 shadow-slate-200/50"
                : "bg-blue-600 text-white shadow-blue-600/30 hover:bg-blue-700"
            }`}
          >
            {showForm ? (
              <><span>✕</span> Đóng</>
            ) : (
              <><span>➕</span> Tạo yêu cầu mới</>
            )}
          </button>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-600 p-5 rounded-2xl mb-8 font-semibold shadow-sm flex items-center gap-3">
            <span className="text-2xl">⚠️</span> {error}
          </div>
        )}

        {showForm && (
          <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 mb-10 animate-fade-in-up">
            <h3 className="text-xl font-extrabold text-slate-800 mb-6 flex items-center gap-3">
              <span className="bg-blue-100 text-blue-600 w-10 h-10 rounded-xl flex items-center justify-center text-xl">📝</span>
              Tạo yêu cầu bảo trì mới
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Tiêu đề sự cố</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="VD: Vòi nước bồn rửa bị rỉ"
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Mô tả chi tiết</label>
                <textarea
                  required
                  rows="4"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Mô tả cụ thể tình trạng hư hỏng, vị trí, mức độ nghiêm trọng..."
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-2xl font-bold text-lg transition-all shadow-lg ${
                  isSubmitting
                    ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/30 hover:shadow-xl hover:-translate-y-1"
                }`}
              >
                {isSubmitting ? "⏳ Đang gửi..." : "Gửi yêu cầu bảo trì"}
              </button>
            </form>
          </div>
        )}

        {requests.length === 0 && !error ? (
          <div className="bg-white p-16 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 text-center animate-fade-in-up">
            <div className="text-7xl mb-6 opacity-80">🛠️</div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">Chưa có yêu cầu bảo trì nào</h3>
            <p className="text-slate-500 text-lg max-w-md mx-auto">
              Nếu phòng trọ của bạn gặp sự cố, hãy nhấn nút "Tạo yêu cầu mới" để thông báo cho chủ trọ.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {requests.map((req, index) => {
              const status = statusMap[req.status] || statusMap.pending;
              return (
                <div
                  key={req.id}
                  className="bg-white rounded-[2rem] p-8 shadow-lg shadow-slate-200/50 border border-slate-100 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 group animate-fade-in-up"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 group-hover:bg-amber-50 transition-colors flex-shrink-0">
                        <span className="text-2xl">{status.icon}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-slate-900 mb-1 group-hover:text-amber-700 transition-colors">{req.title}</h3>
                        <div className="flex flex-wrap gap-3 text-sm text-slate-400 font-medium">
                          <span>📍 Phòng {req.room_number}</span>
                          <span>📅 {formatDate(req.created_at)}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl shadow-sm border flex-shrink-0 ${status.color}`}>
                      {status.text}
                    </span>
                  </div>

                  <div className="h-px w-12 bg-slate-200 my-4 group-hover:w-full transition-all duration-500"></div>

                  <p className="text-slate-600 font-medium leading-relaxed mb-4">{req.description}</p>

                  {(req.estimated_cost || req.actual_cost) && (
                    <div className="flex flex-wrap gap-4">
                      {req.estimated_cost && (
                        <div className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 text-sm">
                          <span className="text-slate-400 font-bold">Chi phí dự kiến: </span>
                          <span className="font-black text-slate-700">{formatPrice(req.estimated_cost)} đ</span>
                        </div>
                      )}
                      {req.actual_cost && (
                        <div className="bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100 text-sm">
                          <span className="text-emerald-500 font-bold">Chi phí thực tế: </span>
                          <span className="font-black text-emerald-700">{formatPrice(req.actual_cost)} đ</span>
                        </div>
                      )}
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

export default MyMaintenanceRequests;
