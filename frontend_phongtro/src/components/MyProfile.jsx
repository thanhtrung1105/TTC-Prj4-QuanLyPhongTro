import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";

function MyProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editFullname, setEditFullname] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    api
      .get("/my-profile")
      .then((response) => {
        if (response.data.success) {
          setProfile(response.data.data);
          setEditFullname(response.data.data.fullname || "");
          setEditPhone(response.data.data.phone || "");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi lấy thông tin cá nhân:", err);
        setError("Không thể lấy dữ liệu. Vui lòng thử lại.");
        setLoading(false);
      });
  }, [navigate]);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    setError("");
    setSuccessMsg("");

    try {
      const response = await api.put("/my-profile", {
        fullname: editFullname,
        phone: editPhone,
      });

      if (response.data.success) {
        setProfile((prev) => ({
          ...prev,
          fullname: response.data.data.fullname,
          phone: response.data.data.phone,
        }));

        const userStr = localStorage.getItem("user");
        if (userStr) {
          try {
            const user = JSON.parse(userStr);
            user.fullname = response.data.data.fullname;
            user.phone = response.data.data.phone;
            localStorage.setItem("user", JSON.stringify(user));
          } catch {}
        }

        setSuccessMsg("Cập nhật thông tin thành công!");
        setIsEditing(false);
        setTimeout(() => setSuccessMsg(""), 3000);
      }
    } catch (err) {
      console.error("Lỗi cập nhật:", err);
      setError(err.response?.data?.message || "Lỗi khi cập nhật thông tin.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (newPassword.length < 6) {
      setPasswordError("Mật khẩu mới phải có ít nhất 6 ký tự.");
      return;
    }

    if (newPassword !== newPasswordConfirm) {
      setPasswordError("Xác nhận mật khẩu mới không khớp.");
      return;
    }

    setIsChangingPassword(true);

    try {
      const response = await api.post("/change-password", {
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: newPasswordConfirm,
      });

      if (response.data.success) {
        setPasswordSuccess("Đổi mật khẩu thành công!");
        setCurrentPassword("");
        setNewPassword("");
        setNewPasswordConfirm("");
        setTimeout(() => {
          setPasswordSuccess("");
          setShowPasswordForm(false);
        }, 3000);
      }
    } catch (err) {
      setPasswordError(err.response?.data?.message || "Đổi mật khẩu thất bại.");
    } finally {
      setIsChangingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
        <div className="text-xl font-bold text-slate-600">Đang tải thông tin...</div>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 text-center">
          <div className="text-6xl mb-6">⚠️</div>
          <div className="bg-rose-50 text-rose-600 p-4 rounded-xl font-bold mb-4">{error}</div>
        </div>
      </div>
    );
  }

  const infoItems = [
    { icon: "📧", label: "Email", value: profile.email },
    { icon: "📱", label: "Số điện thoại", value: profile.phone || "Chưa cập nhật" },
    { icon: "🛡️", label: "Vai trò", value: profile.role === "admin" ? "Quản trị viên" : profile.role === "chu_tro" ? "Chủ trọ" : "Khách thuê" },
    { icon: "📅", label: "Ngày tạo tài khoản", value: profile.created_at ? new Date(profile.created_at).toLocaleDateString("vi-VN") : "N/A" },
  ];

  const tenantItems = profile.tenant ? [
    { icon: "🆔", label: "CCCD / CMND", value: profile.tenant.cmnd || "Chưa cập nhật" },
    { icon: "📞", label: "SĐT liên hệ", value: profile.tenant.phone || "Chưa cập nhật" },
    { icon: "🏠", label: "Địa chỉ thường trú", value: profile.tenant.address || "Chưa cập nhật" },
  ] : [];

  return (
    <div className="w-full bg-slate-50 min-h-[calc(100vh-80px)] pb-20 relative overflow-hidden font-sans">
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-400 rounded-full blur-[150px] opacity-10 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-400 rounded-full blur-[120px] opacity-10 pointer-events-none"></div>

      <div className="max-w-3xl mx-auto px-4 pt-16 relative z-10 animate-fade-in-up">
        {successMsg && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-2xl mb-6 font-bold flex items-center gap-3 shadow-sm animate-fade-in-up">
            <span className="text-xl">✅</span> {successMsg}
          </div>
        )}

        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="bg-slate-900 p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-500 rounded-full blur-[80px] opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-5xl shadow-lg shadow-blue-500/30 border-2 border-white/20">
                {(profile.fullname || "?").charAt(0).toUpperCase()}
              </div>
              <div className="text-center sm:text-left flex-1">
                <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-1">
                  {profile.fullname || profile.tenant?.full_name || "Người dùng"}
                </h1>
                <p className="text-blue-200 font-medium">{profile.email}</p>
                <div className="mt-3 inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-xl text-xs uppercase font-bold tracking-wider border border-white/20">
                  <span className={`w-2 h-2 rounded-full ${profile.status === "active" ? "bg-emerald-400" : "bg-amber-400"}`}></span>
                  {profile.status === "active" ? "Đang hoạt động" : "Tạm khóa"}
                </div>
              </div>
              <button
                onClick={() => { setIsEditing(!isEditing); setError(""); }}
                className={`mt-4 sm:mt-0 px-6 py-2.5 rounded-xl font-bold text-sm transition-all border ${
                  isEditing
                    ? "bg-white/10 text-white border-white/20 hover:bg-white/20"
                    : "bg-white text-slate-900 border-transparent hover:bg-blue-50 shadow-lg"
                }`}
              >
                {isEditing ? "✕ Hủy" : "✏️ Chỉnh sửa"}
              </button>
            </div>
          </div>

          <div className="p-8 md:p-12">
            {error && profile && (
              <div className="bg-rose-50 border border-rose-200 text-rose-600 p-4 rounded-2xl mb-6 font-bold flex items-center gap-3">
                <span className="text-xl">⚠️</span> {error}
              </div>
            )}

            {isEditing ? (
              <div className="mb-10 animate-fade-in-up">
                <h3 className="text-xl font-extrabold text-slate-800 mb-6 flex items-center gap-3">
                  <span className="bg-amber-100 text-amber-600 w-10 h-10 rounded-xl flex items-center justify-center text-xl">✏️</span>
                  Chỉnh sửa thông tin
                </h3>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Họ và tên</label>
                    <input
                      type="text"
                      value={editFullname}
                      onChange={(e) => setEditFullname(e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white text-lg font-medium"
                      placeholder="Nhập họ và tên"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Số điện thoại</label>
                    <input
                      type="tel"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white text-lg font-medium"
                      placeholder="VD: 0901234567"
                    />
                  </div>
                  <button
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                    className={`w-full py-4 rounded-2xl font-bold text-lg transition-all shadow-lg ${
                      isSaving
                        ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/30 hover:shadow-xl hover:-translate-y-1"
                    }`}
                  >
                    {isSaving ? "⏳ Đang lưu..." : "💾 Lưu thay đổi"}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-extrabold text-slate-800 mb-6 flex items-center gap-3">
                  <span className="bg-blue-100 text-blue-600 w-10 h-10 rounded-xl flex items-center justify-center text-xl">📋</span>
                  Thông tin tài khoản
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  {infoItems.map((item, index) => (
                    <div key={index} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow group">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">{item.label}</span>
                      </div>
                      <p className="text-lg font-bold text-slate-800 pl-8 group-hover:text-blue-600 transition-colors">{item.value}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {profile.tenant && !isEditing && (
              <>
                <h3 className="text-xl font-extrabold text-slate-800 mb-6 flex items-center gap-3">
                  <span className="bg-emerald-100 text-emerald-600 w-10 h-10 rounded-xl flex items-center justify-center text-xl">🏠</span>
                  Thông tin khách thuê
                </h3>
                <div className="grid grid-cols-1 gap-4 mb-10">
                  {tenantItems.map((item, index) => (
                    <div key={index} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow group">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">{item.label}</span>
                      </div>
                      <p className="text-lg font-bold text-slate-800 pl-8 group-hover:text-emerald-600 transition-colors">{item.value}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {!isEditing && (
              <div className="border-t border-slate-100 pt-8">
                <button
                  onClick={() => { setShowPasswordForm(!showPasswordForm); setPasswordError(""); setPasswordSuccess(""); }}
                  className="flex items-center gap-3 text-slate-600 hover:text-blue-600 font-bold transition-colors"
                >
                  <span className="bg-slate-100 text-slate-500 w-10 h-10 rounded-xl flex items-center justify-center text-xl">🔒</span>
                  {showPasswordForm ? "Ẩn đổi mật khẩu" : "Đổi mật khẩu"}
                </button>

                {showPasswordForm && (
                  <form onSubmit={handleChangePassword} className="mt-6 space-y-4 animate-fade-in-up bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    {passwordSuccess && (
                      <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-xl font-bold flex items-center gap-2">
                        <span>✅</span> {passwordSuccess}
                      </div>
                    )}
                    {passwordError && (
                      <div className="bg-rose-50 border border-rose-200 text-rose-600 p-4 rounded-xl font-bold flex items-center gap-2">
                        <span>⚠️</span> {passwordError}
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Mật khẩu hiện tại</label>
                      <input
                        type="password"
                        required
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white"
                        placeholder="Nhập mật khẩu hiện tại"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Mật khẩu mới</label>
                        <input
                          type="password"
                          required
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white"
                          placeholder="Tối thiểu 6 ký tự"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Xác nhận mật khẩu mới</label>
                        <input
                          type="password"
                          required
                          value={newPasswordConfirm}
                          onChange={(e) => setNewPasswordConfirm(e.target.value)}
                          className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white"
                          placeholder="Nhập lại mật khẩu mới"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={isChangingPassword}
                      className={`w-full py-4 rounded-2xl font-bold text-lg transition-all shadow-lg ${
                        isChangingPassword
                          ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                          : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/30 hover:shadow-xl hover:-translate-y-1"
                      }`}
                    >
                      {isChangingPassword ? "⏳ Đang xử lý..." : "🔑 Đổi mật khẩu"}
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
