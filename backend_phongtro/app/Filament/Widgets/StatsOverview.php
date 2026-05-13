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
    protected ?string $pollingInterval = '15s';

    protected function getStats(): array
    {
        $currentMonth = Carbon::now()->month;
        $currentYear = Carbon::now()->year;

        $monthlyRevenue = Invoice::where('month', $currentMonth)
            ->where('year', $currentYear)
            ->where('status', 'paid')
            ->sum('total_amount');

        $unpaidCount = Invoice::where('status', 'pending')->count();
        $unpaidAmount = Invoice::where('status', 'pending')->sum('total_amount');

        $totalRevenue = Invoice::where('status', 'paid')->sum('total_amount');

        $totalRooms = Room::count();
        $availableRooms = Room::where('status', 'available')->count();
        $occupiedRooms = Room::where('status', 'occupied')->count();

        $activeTenants = Tenant::where('status', 'active')->count();
        $activeContracts = Contract::where('status', 'active')->count();

        $pendingMaintenance = MaintenanceRequest::whereIn('status', ['pending', 'in_progress'])->count();

        return [
            Stat::make("Doanh thu T{$currentMonth}/{$currentYear}", number_format($monthlyRevenue, 0, ',', '.') . ' VNĐ')
                ->description('Đã thu trong tháng này')
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                ->color('success')
                ->chart([10, 20, 15, 30, 25, 40, 50]),

            Stat::make('Công nợ cần thu', number_format($unpaidAmount, 0, ',', '.') . ' VNĐ')
                ->description("{$unpaidCount} hóa đơn chưa thanh toán")
                ->descriptionIcon('heroicon-m-exclamation-circle')
                ->color('danger')
                ->chart([50, 40, 60, 30, 50, 20, 60]),

            Stat::make('Tổng doanh thu', number_format($totalRevenue, 0, ',', '.') . ' VNĐ')
                ->description('Lũy kế từ trước đến nay')
                ->descriptionIcon('heroicon-m-banknotes')
                ->color('success'),

            Stat::make('Tỷ lệ lấp đầy', "{$occupiedRooms}/{$totalRooms} phòng")
                ->description("Còn trống {$availableRooms} phòng")
                ->descriptionIcon('heroicon-m-home-modern')
                ->color('info'),

            Stat::make('Khách thuê', "{$activeTenants} người")
                ->description("{$activeContracts} hợp đồng đang hiệu lực")
                ->descriptionIcon('heroicon-m-document-text')
                ->color('primary'),

            Stat::make('Bảo trì', "{$pendingMaintenance} yêu cầu")
                ->description('Đang chờ hoặc đang xử lý')
                ->descriptionIcon('heroicon-m-wrench-screwdriver')
                ->color($pendingMaintenance > 0 ? 'warning' : 'success'),
        ];
    }
}