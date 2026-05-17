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
        .info-grid { display: flex; justify-content: space-between; margin-bottom: 20px; }
        .info-col { width: 48%; }
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
        <p><strong>Trạng thái:</strong> {{ $invoice->status == 'paid' ? 'Đã thanh toán' : ($invoice->status == 'overdue' ? 'Quá hạn' : 'Chưa thanh toán') }}</p>
    </div>

    <div class="info">
        @if($invoice->contract)
        <p><strong>Phòng:</strong> {{ $invoice->contract->room->room_number ?? 'N/A' }} — Tầng {{ $invoice->contract->room->floor ?? 'N/A' }}</p>
        <p><strong>Khách thuê:</strong> {{ $invoice->contract->tenant->fullname ?? 'N/A' }}</p>
        <p><strong>SĐT:</strong> {{ $invoice->contract->tenant->phone ?? 'N/A' }}</p>
        @endif
    </div>

    <table>
        <thead>
            <tr>
                <th>STT</th>
                <th>Nội dung thu</th>
                <th style="text-align: right;">Số lượng</th>
                <th style="text-align: right;">Đơn giá</th>
                <th style="text-align: right;">Thành tiền</th>
            </tr>
        </thead>
        <tbody>
            @if($invoice->details && $invoice->details->count() > 0)
                @foreach($invoice->details as $index => $detail)
                <tr>
                    <td>{{ $index + 1 }}</td>
                    <td>{{ $detail->service_name }}</td>
                    <td style="text-align: right;">{{ number_format($detail->quantity, 0) }}</td>
                    <td style="text-align: right;">{{ number_format($detail->unit_price, 0, ',', '.') }} đ</td>
                    <td style="text-align: right;">{{ number_format($detail->amount, 0, ',', '.') }} VNĐ</td>
                </tr>
                @endforeach
            @else
                <tr>
                    <td>1</td>
                    <td>Tiền thuê phòng & Dịch vụ tháng {{ $invoice->month }}/{{ $invoice->year }}</td>
                    <td style="text-align: right;">1</td>
                    <td style="text-align: right;">{{ number_format($invoice->total_amount, 0, ',', '.') }} đ</td>
                    <td style="text-align: right;">{{ number_format($invoice->total_amount, 0, ',', '.') }} VNĐ</td>
                </tr>
            @endif
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