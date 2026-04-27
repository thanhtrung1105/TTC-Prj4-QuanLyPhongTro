import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] text-center px-4 py-20 bg-gradient-to-b from-slate-50 to-slate-200">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
          Chào mừng đến với Hệ thống <br />
          <span className="text-blue-600 inline-block mt-2">
            Phòng Trọ TNMT
          </span>
        </h1>

        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Nền tảng tìm kiếm và cho thuê phòng trọ hiện đại, tiện lợi và minh
          bạch nhất dành cho sinh viên và người đi làm. Trải nghiệm không gian
          sống lý tưởng ngay hôm nay!
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/phong-tro"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            🔍 Xem Phòng Ngay
          </Link>
          <Link
            to="/lien-he"
            className="bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-200 px-8 py-4 rounded-xl font-bold text-lg shadow-sm hover:shadow transition-all"
          >
            📞 Liên hệ chúng tôi
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
