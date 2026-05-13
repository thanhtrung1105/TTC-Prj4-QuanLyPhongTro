import { Link } from "react-router-dom";

function Home() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div className="w-full font-sans overflow-x-hidden">
      <section 
        className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-40 px-4"
        style={{
          backgroundImage: "url('/hero_bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/70 to-slate-900/10"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-start animate-fade-in-up">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 backdrop-blur-md mb-6">
              <span className="text-blue-300 font-bold uppercase tracking-wider text-sm">Nền tảng dành cho sinh viên</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight">
              Tìm Phòng Trọ <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                Nhanh & Dễ Dàng
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-10 leading-relaxed font-light">
              Hệ thống cung cấp hàng trăm phòng trọ sạch sẽ, an ninh tốt với mức giá sinh viên. Mọi thủ tục thuê phòng và thanh toán đều được thực hiện trực tuyến cực kỳ minh bạch.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Link
                to="/phong-tro"
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-all transform hover:-translate-y-1 text-center"
              >
                Xem Phòng Ngay
              </Link>
              <Link
                to="/lien-he"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-xl font-bold text-lg transition-all text-center"
              >
                Liên Hệ Chủ Trọ
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 px-4 z-20">
          <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-8 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100 border border-slate-50">
            <div className="text-center pt-4 md:pt-0">
              <div className="text-5xl font-black text-slate-800 mb-2">500+</div>
              <div className="text-slate-500 font-bold uppercase tracking-widest text-xs">Phòng Trọ Sinh Viên</div>
            </div>
            <div className="text-center pt-8 md:pt-0">
              <div className="text-5xl font-black text-blue-600 mb-2">98%</div>
              <div className="text-slate-500 font-bold uppercase tracking-widest text-xs">Sinh Viên Hài Lòng</div>
            </div>
            <div className="text-center pt-8 md:pt-0">
              <div className="text-5xl font-black text-emerald-500 mb-2">24/7</div>
              <div className="text-slate-500 font-bold uppercase tracking-widest text-xs">Hỗ Trợ Kỹ Thuật</div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-40 pb-24 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Tiện Ích Nổi Bật</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">Chúng tôi mang đến những giải pháp quản lý và trải nghiệm thuê phòng tốt nhất cho bạn.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-2xl transition-all duration-300 group hover:-translate-y-3">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-100 to-blue-50 text-blue-600 flex items-center justify-center text-4xl mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-sm">
                📱
              </div>
              <h3 className="text-2xl font-extrabold text-slate-800 mb-4">Quản Lý Trực Tuyến</h3>
              <p className="text-slate-600 leading-relaxed font-medium">Xem hợp đồng, hóa đơn và gửi báo cáo sự cố hư hỏng hoàn toàn qua điện thoại. Không cần gặp mặt trực tiếp chủ nhà.</p>
            </div>

            <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-2xl transition-all duration-300 group hover:-translate-y-3 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                <span className="text-[12rem]">💳</span>
              </div>
              <div className="relative z-10">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-100 to-emerald-50 text-emerald-600 flex items-center justify-center text-4xl mb-8 group-hover:scale-110 group-hover:-rotate-3 transition-transform shadow-sm">
                  💸
                </div>
                <h3 className="text-2xl font-extrabold text-slate-800 mb-4">Thanh Toán Linh Hoạt</h3>
                <p className="text-slate-600 leading-relaxed font-medium">Bạn có thể chọn đóng tiền nhà thành nhiều đợt. Hỗ trợ đa dạng phương thức như MoMo, ZaloPay và chuyển khoản ngân hàng.</p>
              </div>
            </div>

            <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-2xl transition-all duration-300 group hover:-translate-y-3">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-purple-100 to-purple-50 text-purple-600 flex items-center justify-center text-4xl mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-sm">
                🛡️
              </div>
              <h3 className="text-2xl font-extrabold text-slate-800 mb-4">An Ninh & Minh Bạch</h3>
              <p className="text-slate-600 leading-relaxed font-medium">Giá điện nước luôn được báo cáo minh bạch rõ ràng hàng tháng. Khu trọ được trang bị camera giám sát 24/7 bảo đảm an toàn.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-slate-900 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600 rounded-full blur-[120px] opacity-20"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          {isLoggedIn ? (
            <>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Chào mừng bạn trở lại! 👋</h2>
              <p className="text-xl text-slate-300 mb-10">Quản lý hóa đơn, hợp đồng và yêu cầu bảo trì ngay từ bảng điều khiển của bạn.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/hoa-don-cua-toi"
                  className="inline-block bg-white text-slate-900 px-10 py-5 rounded-2xl font-bold text-xl shadow-xl hover:bg-slate-100 transition-colors transform hover:-translate-y-1"
                >
                  🧾 Xem Hóa Đơn
                </Link>
                <Link
                  to="/yeu-cau-bao-duong"
                  className="inline-block bg-white/10 backdrop-blur-md text-white border border-white/30 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white/20 transition-colors transform hover:-translate-y-1"
                >
                  🛠️ Yêu Cầu Bảo Trì
                </Link>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Bạn đã sẵn sàng dọn đến?</h2>
              <p className="text-xl text-slate-300 mb-10">Đừng bỏ lỡ những căn phòng có view đẹp và giá tốt nhất. Đăng nhập để giữ chỗ!</p>
              <Link
                to="/login"
                className="inline-block bg-white text-slate-900 px-10 py-5 rounded-2xl font-bold text-xl shadow-xl hover:bg-slate-100 transition-colors transform hover:-translate-y-1"
              >
                Đăng Nhập Ngay →
              </Link>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;

