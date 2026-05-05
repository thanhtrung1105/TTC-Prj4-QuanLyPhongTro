<?php

namespace App\Filament\Widgets;

use App\Models\Room;
use App\Models\Tenant;
use App\Models\Invoice;
use App\Models\Contract;
use App\Models\MaintenanceRequest;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Carbon\Carbon;

class StatsOverview extends BaseWidget
{
    protected ?string $pollingInterval = '10s';

    protected function getStats(): array
    {
        // Lấy tháng và năm hiện tại thực tế
        $currentMonth = Carbon::now()->month;
        $currentYear = Carbon::now()->year;

        // 1. DOANH THU THÁNG HIỆN TẠI
        $monthlyRevenue = Invoice::where('month', $currentMonth)
            ->where('year', $currentYear)
            ->where('status', 'paid')
            ->sum('total_amount');

        // 2. CÔNG NỢ (HÓA ĐƠN CHƯA THANH TOÁN)
        $unpaidInvoicesCount = Invoice::where('status', 'pending')->count();
        $unpaidInvoicesAmount = Invoice::where('status', 'pending')->sum('total_amount');

        // 3. TỔNG DOANH THU TỪ TRƯỚC ĐẾN NAY
        $totalRevenue = Invoice::where('status', 'paid')->sum('total_amount');

        // 4. TÌNH TRẠNG PHÒNG
        $totalRooms = Room::count();
        $availableRooms = Room::where('status', 'available')->count();
        $occupiedRooms = Room::where('status', 'occupied')->count();

        // 5. KHÁCH & HỢP ĐỒNG
        $activeTenants = Tenant::where('status', 'active')->count();
        $activeContracts = Contract::where('status', 'active')->count();

        // 6. BẢO TRÌ
        $pendingMaintenance = MaintenanceRequest::whereIn('status', ['pending', 'in_progress'])->count();

        return [
            Stat::make("Doanh thu T{$currentMonth}/{$currentYear}", number_format($monthlyRevenue, 0, ',', '.') . ' VNĐ')
                ->description('Tiền đã thu được trong tháng này')
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                ->color('success')
                ->chart([10, 20, 15, 30, 25, 40, 50]), // Đồ thị mini giả lập xu hướng tăng

            Stat::make('Công nợ cần thu', number_format($unpaidInvoicesAmount, 0, ',', '.') . ' VNĐ')
                ->description("Đang có {$unpaidInvoicesCount} hóa đơn chưa đóng")
                ->descriptionIcon('heroicon-m-exclamation-circle')
                ->color('danger')
                ->chart([50, 40, 60, 30, 50, 20, 60]), // Đồ thị mini cảnh báo

            Stat::make('Tổng doanh thu lũy kế', number_format($totalRevenue, 0, ',', '.') . ' VNĐ')
                ->description('Tổng tiền đã thu từ trước đến nay')
                ->descriptionIcon('heroicon-m-banknotes')
                ->color('success'),

            Stat::make('Tỷ lệ lấp đầy phòng', "{$occupiedRooms} / {$totalRooms} phòng")
                ->description("Còn trống {$availableRooms} phòng chưa cho thuê")
                ->descriptionIcon('heroicon-m-home-modern')
                ->color('info'),

            Stat::make('Khách & Hợp đồng', "{$activeTenants} khách thuê")
                ->description("{$activeContracts} hợp đồng đang có hiệu lực")
                ->descriptionIcon('heroicon-m-document-text')
                ->color('primary'),

            Stat::make('Sự cố cần xử lý', "{$pendingMaintenance} yêu cầu")
                ->description('Sự cố đang chờ duyệt hoặc đang sửa')
                ->descriptionIcon('heroicon-m-wrench-screwdriver')
                ->color($pendingMaintenance > 0 ? 'warning' : 'success'),
        ];
    }
}