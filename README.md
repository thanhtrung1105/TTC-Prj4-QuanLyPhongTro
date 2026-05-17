# Hệ Thống Quản Lý Phòng Trọ — PhòngTrọ TNMT

Đồ án thực tập cơ sở 4 — Trường Đại học Tài nguyên và Môi trường Hà Nội

**Lớp:** K23CNT2 — **Nhóm:** 5

**Sinh viên thực hiện:** Bùi Thành Trung — MSV: 2310900108

---

## Giới thiệu

Hệ thống quản lý phòng trọ sinh viên được xây dựng nhằm hỗ trợ chủ trọ và người thuê trong việc quản lý phòng, hợp đồng, hóa đơn, thanh toán và bảo trì một cách trực tuyến, minh bạch và tiện lợi.

### Chức năng chính

**Dành cho Người thuê (Frontend):**
- Xem danh sách phòng trọ còn trống, tìm kiếm và lọc theo giá, tầng, diện tích
- Xem chi tiết phòng: hình ảnh, tiện ích, bảng giá dịch vụ
- Đăng ký tài khoản, đăng nhập, đổi mật khẩu
- Xem hợp đồng thuê phòng, tải file hợp đồng
- Xem và thanh toán hóa đơn (hỗ trợ thanh toán nhiều lần)
- Gửi yêu cầu bảo trì / sửa chữa
- Gửi tin nhắn liên hệ với chủ trọ

**Dành cho Chủ trọ / Quản trị viên (Admin Panel):**
- Dashboard tổng quan: doanh thu, công nợ, tỷ lệ lấp đầy, biểu đồ
- Quản lý phòng: CRUD, upload nhiều ảnh, kéo thả thứ tự, lọc theo trạng thái/tầng
- Quản lý khách thuê: thông tin cá nhân, liên kết tài khoản đăng nhập
- Quản lý hợp đồng: tạo, sửa, theo dõi trạng thái
- Quản lý hóa đơn: tạo hóa đơn, ghi nhận thanh toán, in PDF
- Xử lý yêu cầu bảo trì: tiếp nhận, cập nhật trạng thái, ghi nhận chi phí
- Quản lý tiện ích phòng, bảng giá dịch vụ
- Xem tin nhắn liên hệ từ khách

---

## Công nghệ sử dụng

| Thành phần | Công nghệ | Phiên bản |
|------------|-----------|-----------|
| **Backend** | Laravel (PHP) | 13.x |
| **Admin Panel** | Filament | 5.x |
| **Frontend** | React (Vite) | 19.x |
| **CSS** | TailwindCSS | 4.x |
| **Xác thực API** | Laravel Sanctum | 4.x |
| **Xuất PDF** | DomPDF (barryvdh) | 3.x |
| **CSDL** | MySQL | 8.x |
| **Ngôn ngữ** | PHP 8.3+, JavaScript ES6+ | — |

---

## Cấu trúc thư mục

```
TTC-Prj4-QuanLyPhongTro/
├── backend_phongtro/          # Laravel Backend + Filament Admin
│   ├── app/
│   │   ├── Filament/          # Trang quản trị (Resources, Widgets)
│   │   ├── Http/Controllers/  # API Controllers
│   │   └── Models/            # Eloquent Models
│   ├── database/migrations/   # Migration CSDL
│   ├── resources/views/pdf/   # Template PDF hóa đơn
│   └── routes/api.php         # Định tuyến API
│
├── frontend_phongtro/         # React Frontend (Vite)
│   ├── src/
│   │   ├── components/        # Các trang giao diện
│   │   ├── utils/axios.js     # Cấu hình API
│   │   ├── App.jsx            # Routing chính
│   │   └── main.jsx           # Entry point
│   └── index.html
│
├── K23CNT2-TTCĐ-PRJ4--*.sql   # File SQL cơ sở dữ liệu
└── README.md
```

---

## Cơ sở dữ liệu

| Bảng | Tên trong DB | Mô tả |
|------|--------------|-------|
| Người dùng | `tnmtnguoidung` | Tài khoản đăng nhập (admin, chủ trọ, khách thuê) |
| Phòng trọ | `tnmtphong` | Thông tin phòng, giá, diện tích, hình ảnh |
| Tiện ích phòng | `tnmttienichphong` | Wifi, điều hòa, nóng lạnh,... |
| Khách thuê | `tnmtkhachthue` | Thông tin cá nhân, CCCD, liên hệ |
| Hợp đồng | `tnmthopdong` | Hợp đồng thuê phòng |
| Hóa đơn | `tnmthoadon` | Hóa đơn thu tiền hàng tháng |
| Chi tiết hóa đơn | `tnmtchitiethodon` | Các khoản thu trong hóa đơn |
| Thanh toán | `tnmtthanhtoan` | Lịch sử thanh toán |
| Yêu cầu bảo trì | `tnmtyeucaubaoduong` | Yêu cầu sửa chữa từ khách thuê |
| Liên hệ | `tnmtlienhe` | Tin nhắn liên hệ từ khách |

---

## Hướng dẫn cài đặt

### Yêu cầu hệ thống
- PHP >= 8.3
- Composer
- Node.js >= 18
- MySQL 8.x
- Git

### Bước 1: Clone dự án

```bash
git clone https://github.com/thanhtrung1105/TTC-Prj4-QuanLyPhongTro.git
cd TTC-Prj4-QuanLyPhongTro
```

### Bước 2: Cài đặt Backend

```bash
cd backend_phongtro
composer install
cp .env.example .env
php artisan key:generate
```

Cấu hình file `.env`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=qlphongtro
DB_USERNAME=root
DB_PASSWORD=
```

Chạy migration và tạo link storage:
```bash
php artisan migrate
php artisan storage:link
```

Tạo tài khoản admin:
```bash
php artisan make:filament-user
```

Khởi chạy backend:
```bash
php artisan serve
```

Backend chạy tại: `http://127.0.0.1:8000`
Trang quản trị: `http://127.0.0.1:8000/admin`

### Bước 3: Cài đặt Frontend

```bash
cd frontend_phongtro
npm install
npm run dev
```

Frontend chạy tại: `http://localhost:5173`

---

## 🎓 Hướng dẫn chạy thử (Dành cho Giảng viên / Người đánh giá)

Để thuận tiện nhất cho việc chấm đồ án, thầy/cô có thể làm theo các bước sau để trải nghiệm đầy đủ các vai trò trong hệ thống:

**1. Khởi động dự án:**
- Đảm bảo đã import file `K23CNT2-TTCĐ-PRJ4--BuiThanhTrung-2310900108-CSDL.sql` vào MySQL (tên DB: `tnmtquanlyphongtro` hoặc theo cấu hình `.env`).
- Chạy Backend (`backend_phongtro`): `php artisan serve`
- Chạy Frontend (`frontend_phongtro`): `npm run dev`

**2. Tài khoản Quản trị viên (Admin / Chủ trọ):**
- Truy cập trang quản trị: `http://127.0.0.1:8000/admin`
- Do mật khẩu được mã hóa bảo mật, thầy/cô vui lòng tạo tài khoản Admin mới nhanh chóng bằng lệnh sau (chạy trong thư mục `backend_phongtro`):
  ```bash
  php artisan make:filament-user
  ```
- *Hệ thống sẽ hỏi Name, Email và Password. Sau khi tạo xong, thầy/cô dùng tài khoản này để đăng nhập.*
- *Vai trò Admin có toàn quyền:* Thêm/sửa/xóa phòng, quản lý hợp đồng, tạo hóa đơn, duyệt yêu cầu bảo trì, và có thể cấp quyền "Chủ trọ" cho các tài khoản khác.

**3. Tài khoản Người thuê (Sinh viên / Khách hàng):**
- Truy cập giao diện người dùng: `http://localhost:5173`
- Thầy/cô vui lòng bấm vào nút **Đăng ký** trên thanh điều hướng để tạo một tài khoản người thuê mới.
- *Trải nghiệm thực tế:* Xem danh sách phòng, xem chi tiết, liên hệ chủ trọ. Sau khi Admin tạo hợp đồng cho tài khoản này, thầy/cô có thể đăng nhập để xem hợp đồng, thanh toán hóa đơn trực tuyến và gửi yêu cầu sửa chữa.

---

## API Endpoints

| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| `POST` | `/api/register` | Đăng ký tài khoản | Không |
| `POST` | `/api/login` | Đăng nhập | Không |
| `POST` | `/api/logout` | Đăng xuất | Có |
| `GET` | `/api/rooms/available` | Danh sách phòng trống | Không |
| `GET` | `/api/rooms/{id}` | Chi tiết phòng | Không |
| `POST` | `/api/contact` | Gửi tin nhắn liên hệ | Không |
| `GET` | `/api/my-profile` | Xem thông tin cá nhân | Có |
| `PUT` | `/api/my-profile` | Cập nhật thông tin | Có |
| `POST` | `/api/change-password` | Đổi mật khẩu | Có |
| `GET` | `/api/my-contracts` | Danh sách hợp đồng | Có |
| `GET` | `/api/my-invoices` | Danh sách hóa đơn | Có |
| `GET` | `/api/my-invoices/{id}` | Chi tiết hóa đơn | Có |
| `POST` | `/api/my-invoices/{id}/pay` | Thanh toán hóa đơn | Có |
| `GET` | `/api/my-maintenance-requests` | Danh sách yêu cầu bảo trì | Có |
| `POST` | `/api/my-maintenance-requests` | Tạo yêu cầu bảo trì | Có |

---

## Giao diện

### Trang người dùng (Frontend)
- Trang chủ giới thiệu hệ thống
- Danh sách phòng với bộ lọc nâng cao
- Chi tiết phòng: gallery ảnh, tiện ích, bảng giá dịch vụ
- Đăng nhập / Đăng ký
- Quản lý tài khoản cá nhân + đổi mật khẩu
- Hóa đơn: xem, thanh toán trực tuyến
- Hợp đồng: xem chi tiết, tải file
- Yêu cầu bảo trì: gửi mới, theo dõi trạng thái
- Liên hệ chủ trọ

### Trang quản trị (Admin Panel - Filament)
- Dashboard: thống kê doanh thu, biểu đồ theo tháng
- CRUD đầy đủ cho: Phòng, Khách thuê, Hợp đồng, Hóa đơn, Bảo trì
- In hóa đơn PDF
- Quản lý tin nhắn liên hệ

---

## Giấy phép

Dự án được thực hiện phục vụ mục đích học tập tại Trường Đại học Nguyễn Trãi
