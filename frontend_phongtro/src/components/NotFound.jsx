import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-rose-400 rounded-full blur-[150px] opacity-10 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-400 rounded-full blur-[120px] opacity-10 pointer-events-none"></div>

      <div className="max-w-lg w-full text-center relative z-10 animate-fade-in-up">
        <div className="text-[10rem] font-black text-slate-200 leading-none select-none mb-[-2rem]">
          404
        </div>
        <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100">
          <h1 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">
            Trang không tồn tại
          </h1>
          <p className="text-slate-500 font-medium mb-8 leading-relaxed">
            Đường dẫn bạn đang truy cập không tồn tại hoặc đã bị di chuyển.
            Hãy quay về trang chủ để tiếp tục.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg shadow-blue-600/30 hover:shadow-xl hover:-translate-y-1"
            >
              Về Trang Chủ
            </Link>
            <Link
              to="/phong-tro"
              className="bg-white hover:bg-slate-50 text-slate-700 font-bold py-4 px-8 rounded-2xl transition-all shadow-sm border border-slate-200 hover:border-slate-300"
            >
              Xem Phòng Trọ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
