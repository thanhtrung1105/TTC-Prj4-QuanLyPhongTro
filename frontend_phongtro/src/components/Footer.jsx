import { Link } from "react-router-dom";

function Footer() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <footer className="bg-slate-900 text-slate-400 py-16 mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-1">
            <Link to="/" className="text-2xl font-black text-white tracking-tighter mb-4 inline-block">
              PhòngTrọ<span className="text-blue-500">TNMT</span>
            </Link>
            <p className="text-slate-500 leading-relaxed max-w-sm text-sm">
              Hệ thống tìm kiếm và quản lý phòng trọ sinh viên hiện đại, minh bạch và an toàn nhất khu vực.
            </p>
            <div className="flex gap-3 mt-5">
              <span className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-lg hover:bg-blue-600 transition-colors cursor-pointer">📧</span>
              <span className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-lg hover:bg-blue-600 transition-colors cursor-pointer">📞</span>
              <span className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-lg hover:bg-blue-600 transition-colors cursor-pointer">📍</span>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Khám Phá</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-blue-400 transition-colors text-sm font-medium">Trang chủ</Link></li>
              <li><Link to="/phong-tro" className="hover:text-blue-400 transition-colors text-sm font-medium">Danh sách phòng</Link></li>
              <li><Link to="/lien-he" className="hover:text-blue-400 transition-colors text-sm font-medium">Liên hệ hỗ trợ</Link></li>
            </ul>
          </div>

          {isLoggedIn && (
            <div>
              <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Khách Thuê</h4>
              <ul className="space-y-3">
                <li><Link to="/hoa-don-cua-toi" className="hover:text-blue-400 transition-colors text-sm font-medium">Hóa đơn của tôi</Link></li>
                <li><Link to="/hop-dong-cua-toi" className="hover:text-blue-400 transition-colors text-sm font-medium">Hợp đồng thuê</Link></li>
                <li><Link to="/yeu-cau-bao-duong" className="hover:text-blue-400 transition-colors text-sm font-medium">Yêu cầu bảo trì</Link></li>
                <li><Link to="/tai-khoan" className="hover:text-blue-400 transition-colors text-sm font-medium">Thông tin cá nhân</Link></li>
              </ul>
            </div>
          )}

          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Pháp Lý</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-blue-400 transition-colors text-sm font-medium">Điều khoản dịch vụ</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors text-sm font-medium">Bảo mật thông tin</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors text-sm font-medium">Chính sách hoàn tiền</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-sm flex flex-col md:flex-row justify-between items-center gap-2">
          <p>&copy; 2026 Hệ thống Quản lý Phòng Trọ TNMT.</p>
          <p>Đồ án thực hiện bởi <span className="text-white font-bold">Nhóm 5</span></p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

