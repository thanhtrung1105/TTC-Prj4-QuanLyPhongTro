import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-2xl font-black text-white tracking-tighter mb-4 inline-block">
              PhòngTrọ<span className="text-blue-500">TNMT</span>
            </Link>
            <p className="text-slate-500 leading-relaxed max-w-sm">
              Hệ thống tìm kiếm và quản lý phòng trọ sinh viên hiện đại, minh bạch và an toàn nhất khu vực.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Khám Phá</h4>
            <ul className="space-y-2">
              <li><Link to="/phong-tro" className="hover:text-blue-400 transition-colors">Danh sách phòng</Link></li>
              <li><Link to="/lien-he" className="hover:text-blue-400 transition-colors">Liên hệ hỗ trợ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Pháp Lý</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Điều khoản dịch vụ</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Bảo mật thông tin</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 text-center text-sm flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2026 Hệ thống Quản lý Phòng Trọ TNMT.</p>
          <p className="mt-2 md:mt-0">Đồ án thực hiện bởi <span className="text-white font-bold">Nhóm 5</span></p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
