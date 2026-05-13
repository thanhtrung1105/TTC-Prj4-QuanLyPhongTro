import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../utils/axios";

function RoomDetail() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  const [gallery, setGallery] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    api
      .get(`/rooms/${id}`)
      .then((response) => {
        const roomData = response.data.data;
        setRoom(roomData);

        let demoImages = [];
        if (roomData.images && Array.isArray(roomData.images) && roomData.images.length > 0) {
          demoImages = roomData.images;
        } else if (typeof roomData.images === 'string' && roomData.images) {
          demoImages = [roomData.images];
        } else {
          demoImages = [
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1560185007-cde436f6a2d0?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
          ];
        }

        setGallery(demoImages);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy thông tin phòng:", error);
        setLoading(false);
      });
  }, [id]);

  const nextImage = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === gallery.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevImage = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? gallery.length - 1 : prevIndex - 1,
    );
  };

  if (loading)
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-2xl font-bold text-slate-500 flex flex-col items-center gap-4">
          <span className="animate-spin text-5xl">⏳</span> 
          <span>Đang tải không gian sống...</span>
        </div>
      </div>
    );
    
  if (!room)
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-md w-full">
          <div className="text-6xl mb-4">🏠</div>
          <h2 className="text-2xl font-bold text-rose-600 mb-2">Không tìm thấy phòng!</h2>
          <p className="text-slate-500 mb-6">Căn phòng bạn đang tìm kiếm không tồn tại hoặc đã bị gỡ.</p>
          <Link to="/phong-tro" className="bg-blue-600 text-white font-bold py-3 px-6 rounded-xl block">
            Quay lại danh sách
          </Link>
        </div>
      </div>
    );

  const formatPrice = (price) => Number(price).toLocaleString("vi-VN");

  return (
    <div className="w-full font-sans bg-slate-50 min-h-screen pb-20">
      <div className="w-full h-64 md:h-80 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={gallery[0]} alt="Background blur" className="w-full h-full object-cover blur-md" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-40 md:-mt-56 relative z-10 animate-fade-in-up">
        
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/phong-tro"
            className="inline-flex items-center text-white/80 hover:text-white font-bold bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl transition-colors border border-white/20"
          >
            <span className="mr-2">←</span> Quay lại danh sách
          </Link>
          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 text-white font-medium text-sm">
            Cập nhật: {new Date(room.updated_at).toLocaleDateString("vi-VN")}
          </div>
        </div>

        <div className="bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          
          <div className="flex flex-col relative group">
            <div className="h-[300px] md:h-[550px] w-full relative bg-slate-900 overflow-hidden">
              <div
                className="flex w-full h-full transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {gallery.map((img, index) => (
                  <div key={index} className="w-full h-full flex-shrink-0 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 pointer-events-none"></div>
                    <img
                      src={img}
                      alt={`Phòng ${room.room_number} - Góc ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="absolute top-6 right-6 z-20">
                <span
                  className={`px-6 py-2.5 text-sm font-black uppercase tracking-wider rounded-xl shadow-2xl backdrop-blur-md text-white border border-white/20 ${room.status === "available" ? "bg-emerald-500/90" : "bg-rose-500/90"}`}
                >
                  {room.status === "available" ? "✨ Có thể dọn vào ngay" : "🔒 Đã cho thuê"}
                </span>
              </div>

              <button
                onClick={prevImage}
                className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 backdrop-blur-md text-white w-14 h-14 flex items-center justify-center rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 border border-white/20 hover:scale-110"
              >
                <span className="text-2xl font-bold -ml-1">❮</span>
              </button>
              <button
                onClick={nextImage}
                className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 backdrop-blur-md text-white w-14 h-14 flex items-center justify-center rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 border border-white/20 hover:scale-110"
              >
                <span className="text-2xl font-bold ml-1">❯</span>
              </button>

              <div className="absolute bottom-6 right-6 z-20 bg-black/40 backdrop-blur-md text-white px-4 py-2 rounded-xl text-sm font-bold border border-white/10">
                {activeIndex + 1} / {gallery.length}
              </div>
            </div>

            <div className="flex gap-4 p-6 bg-slate-50 border-b border-slate-100 overflow-x-auto scrollbar-hide">
              {gallery.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`flex-shrink-0 w-28 h-20 md:w-36 md:h-24 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 relative ${activeIndex === index ? "ring-4 ring-blue-500 ring-offset-2 scale-105" : "opacity-60 hover:opacity-100"}`}
                >
                  <img
                    src={img}
                    alt={`Góc nhìn ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {activeIndex === index && (
                    <div className="absolute inset-0 bg-blue-500/20 mix-blend-overlay"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 md:p-12 lg:p-16">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 pb-10 border-b border-slate-100 gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-700 font-bold text-sm mb-4">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span> Phân khúc sinh viên
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">
                  Phòng {room.room_number}
                </h1>
              </div>
              <div className="bg-slate-900 text-white px-8 py-6 rounded-3xl shadow-xl border border-slate-800 text-center min-w-[280px]">
                <div className="text-sm text-slate-400 font-bold uppercase tracking-widest mb-2">Giá thuê mỗi tháng</div>
                <div className="text-4xl md:text-5xl font-black text-emerald-400">
                  {formatPrice(room.base_price)}
                </div>
                <div className="text-slate-500 font-medium mt-1">VNĐ</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-extrabold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="bg-blue-100 text-blue-600 w-10 h-10 rounded-xl flex items-center justify-center text-xl">📝</span>
                  Thông tin mô tả
                </h3>
                <div className="prose prose-lg prose-slate text-slate-600 leading-relaxed max-w-none font-medium">
                  {room.description ? (
                    room.description.split('\n').map((line, i) => (
                      <p key={i} className="mb-4">{line}</p>
                    ))
                  ) : (
                    <p className="italic bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      Chủ trọ chưa cập nhật mô tả chi tiết cho phòng này. Vui lòng liên hệ trực tiếp để xem phòng và trải nghiệm thực tế.
                    </p>
                  )}
                </div>
              </div>

              <div>
                <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 sticky top-28">
                  <h3 className="text-xl font-extrabold text-slate-900 mb-6 flex items-center gap-3">
                    <span className="bg-amber-100 text-amber-600 w-10 h-10 rounded-xl flex items-center justify-center text-xl">✨</span>
                    Đặc điểm phòng
                  </h3>
                  
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                      <div className="flex items-center gap-3 text-slate-600 font-medium">
                        <span className="text-2xl">📐</span> Diện tích
                      </div>
                      <span className="font-bold text-slate-900 text-lg">{room.area} m²</span>
                    </li>
                    <li className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                      <div className="flex items-center gap-3 text-slate-600 font-medium">
                        <span className="text-2xl">🏢</span> Vị trí
                      </div>
                      <span className="font-bold text-slate-900 text-lg">Tầng {room.floor}</span>
                    </li>
                    <li className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                      <div className="flex items-center gap-3 text-slate-600 font-medium">
                        <span className="text-2xl">🔑</span> Trạng thái
                      </div>
                      <span className={`font-bold text-lg ${room.status === "available" ? "text-emerald-600" : "text-rose-600"}`}>
                        {room.status === "available" ? "Trống" : "Đã thuê"}
                      </span>
                    </li>
                  </ul>

                  <Link to="/lien-he" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 transform hover:-translate-y-1 flex justify-center items-center gap-3 text-lg">
                    <span>📱</span> Liên hệ Chủ Trọ
                  </Link>
                  <p className="text-center text-slate-500 text-sm mt-4 font-medium">Phản hồi nhanh trong vòng 30 phút</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomDetail;
