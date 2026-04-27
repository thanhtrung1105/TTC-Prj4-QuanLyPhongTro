function Contact() {
  return (
    <div className="app-container">
      <div className="page-header">
        <h1 className="page-title">Thông tin Liên hệ</h1>
      </div>

      <div className="contact-box">
        <h2 style={{ marginBottom: "20px", color: "#1e293b" }}>
          Hỗ trợ trực tuyến 24/7
        </h2>
        <p>
          📍 <strong>Địa chỉ:</strong> Khu công nghệ cao, TP. Hà Nội
        </p>
        <p>
          📞 <strong>Điện thoại:</strong> 0901.234.567
        </p>
        <p>
          📧 <strong>Email:</strong> buitrung4212@gmail.com
        </p>
        <p>
          🕒 <strong>Giờ làm việc:</strong> 8:00 - 18:00 (Thứ 2 - Thứ 7)
        </p>
      </div>
    </div>
  );
}

export default Contact;
