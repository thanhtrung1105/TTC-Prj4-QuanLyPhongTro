<?php

namespace App\Filament\Widgets;

use App\Models\Room;
use App\Models\Tenant;
use App\Models\Contract;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    // Đẩy Widget này lên đầu trang
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        return [
            Stat::make('Tổng số phòng', Room::count())
                ->description('Toàn bộ phòng trọ trong hệ thống')
                ->descriptionIcon('heroicon-m-home-modern')
                ->color('primary'),
            
            Stat::make('Phòng đang trống', Room::where('status', 'available')->count())
                ->description('Sẵn sàng đón khách mới')
                ->descriptionIcon('heroicon-m-check-badge')
                ->color('success')
                ->chart([7, 2, 10, 3, 15, 4, 17]), // Biểu đồ lượn sóng trang trí
                
            Stat::make('Tổng khách thuê', Tenant::count())
                ->description('Hồ sơ khách hàng đang lưu trữ')
                ->descriptionIcon('heroicon-m-users')
                ->color('info'),
                
            Stat::make('Hợp đồng hiệu lực', Contract::where('status', 'active')->count())
                ->description('Đang mang lại doanh thu')
                ->descriptionIcon('heroicon-m-document-text')
                ->color('warning')
                ->chart([1, 4, 2, 8, 5, 9, 12]), // Biểu đồ lượn sóng trang trí
        ];
    }
}