import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function RoomDetail() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  // State quản lý thư viện ảnh
  const [gallery, setGallery] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0); // Quản lý bằng index (số thứ tự) thay vì link ảnh

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/rooms/${id}`)
      .then((response) => {
        const roomData = response.data;
        setRoom(roomData);

        // Demo mảng ảnh (Sau này nếu DB trả về mảng thật thì gán thẳng vào đây)
        const demoImages = [
          roomData.images ||
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1560185007-cde436f6a2d0?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
        ];

        setGallery(demoImages);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy thông tin phòng:", error);
        setLoading(false);
      });
  }, [id]);

  // Hàm chuyển ảnh Trước/Sau
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
      <div className="text-center py-20 text-xl font-semibold text-slate-600">
        Đang tải thông tin...
      </div>
    );
  if (!room)
    return (
      <div className="text-center py-20 text-xl font-bold text-red-500">
        Không tìm thấy phòng này!
      </div>
    );

  const formatPrice = (price) => Number(price).toLocaleString("vi-VN");

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Link
        to="/phong-tro"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mb-6 transition-colors"
      >
        <span className="mr-2">←</span> Quay lại danh sách
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* --- KHU VỰC THƯ VIỆN ẢNH --- */}
        <div className="flex flex-col">
          {/* Ảnh chính to đùng (Khu vực băng chuyền) */}
          <div className="h-80 md:h-[450px] w-full relative bg-slate-100 group overflow-hidden">
            {/* Dải track dài chứa TẤT CẢ ảnh xếp hàng ngang */}
            <div
              className="flex w-full h-full transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {gallery.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Phòng ${room.room_number} - Góc ${index + 1}`}
                  className="w-full h-full object-cover flex-shrink-0"
                />
              ))}
            </div>

            {/* Badge trạng thái */}
            <div className="absolute top-6 right-6">
              <span
                className={`px-4 py-2 text-sm font-bold rounded-full shadow-lg text-white ${room.status === "available" ? "bg-emerald-500" : "bg-rose-500"}`}
              >
                {room.status === "available" ? "Còn trống" : "Đã thuê"}
              </span>
            </div>

            {/* Nút Previous (Trái) */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white w-10 h-10 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              ❮
            </button>

            {/* Nút Next (Phải) */}
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white w-10 h-10 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              ❯
            </button>
          </div>

          {/* Dải ảnh nhỏ */}
          <div className="flex gap-4 p-4 bg-white border-b border-slate-100 overflow-x-auto">
            {gallery.map((img, index) => (
              <div
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`flex-shrink-0 w-24 h-20 md:w-32 md:h-24 rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-200 ${activeIndex === index ? "border-blue-600 opacity-100 shadow-md" : "border-transparent opacity-60 hover:opacity-100"}`}
              >
                <img
                  src={img}
                  alt={`Góc nhìn ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Phần chi tiết giữ nguyên... */}
        <div className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 border-b border-slate-100 pb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
                Phòng {room.room_number}
              </h1>
              <p className="text-slate-500 text-lg">
                Cập nhật lần cuối:{" "}
                {new Date(room.updated_at).toLocaleDateString("vi-VN")}
              </p>
            </div>
            <div className="mt-4 md:mt-0 text-3xl font-black text-blue-600">
              {formatPrice(room.base_price)}{" "}
              <span className="text-base text-slate-500 font-normal">
                VNĐ/tháng
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold text-slate-800 mb-4">
                Thông tin mô tả
              </h3>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                {room.description ||
                  "Chủ trọ chưa cập nhật mô tả chi tiết cho phòng này. Vui lòng liên hệ trực tiếp để xem phòng."}
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 h-fit">
              <h3 className="text-lg font-bold text-slate-800 mb-4">
                Đặc điểm nổi bật
              </h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex justify-between">
                  <span>📐 Diện tích:</span>{" "}
                  <span className="font-semibold">{room.area} m²</span>
                </li>
                <li className="flex justify-between">
                  <span>🏢 Vị trí:</span>{" "}
                  <span className="font-semibold">Tầng {room.floor}</span>
                </li>
                <li className="flex justify-between">
                  <span>🔑 Trạng thái:</span>{" "}
                  <span className="font-semibold">
                    {room.status === "available"
                      ? "Có thể dọn vào ngay"
                      : "Đang có người ở"}
                  </span>
                </li>
              </ul>

              <button className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors shadow-md">
                Liên hệ Chủ Trọ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomDetail;
