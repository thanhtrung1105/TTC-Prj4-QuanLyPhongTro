<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Hóa đơn tiền phòng</title>
    <style>
        body { font-family: 'DejaVu Sans', sans-serif; font-size: 14px; line-height: 1.5; }
        .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
        .title { font-size: 20px; font-weight: bold; text-transform: uppercase; }
        .info { margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { border: 1px solid #000; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .total { font-weight: bold; font-size: 16px; text-align: right; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="header">
        <h2>QUẢN LÝ TRỌ TNMT</h2>
        <p>Địa chỉ: Trường Đại học TNMT Hà Nội</p>
    </div>

    <div class="title" style="text-align: center;">HÓA ĐƠN TIỀN PHÒNG T{{ $invoice->month }}/{{ $invoice->year }}</div>

    <div class="info">
        <p><strong>Mã hóa đơn:</strong> HD-{{ str_pad($invoice->id, 5, '0', STR_PAD_LEFT) }}</p>
        <p><strong>Ngày lập:</strong> {{ \Carbon\Carbon::parse($invoice->created_at)->format('d/m/Y') }}</p>
        <p><strong>Trạng thái:</strong> {{ $invoice->status == 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán' }}</p>
    </div>

    <table>
        <thead>
            <tr>
                <th>Nội dung thu</th>
                <th style="text-align: right;">Thành tiền</th>
            </tr>
        </thead>
        <tbody>
            <!-- Nếu bạn có bảng chi tiết hóa đơn thì dùng vòng lặp ở đây, hiện tại mình hiển thị tổng tiền -->
            <tr>
                <td>Tiền thuê phòng & Dịch vụ tháng {{ $invoice->month }}/{{ $invoice->year }}</td>
                <td style="text-align: right;">{{ number_format($invoice->total_amount, 0, ',', '.') }} VNĐ</td>
            </tr>
        </tbody>
    </table>

    <div class="total">
        TỔNG CỘNG: {{ number_format($invoice->total_amount, 0, ',', '.') }} VNĐ
    </div>

    <div style="margin-top: 50px; text-align: right;">
        <p><strong>Chủ nhà trọ</strong></p>
        <p><em>(Ký & ghi rõ họ tên)</em></p>
    </div>
</body>
</html>