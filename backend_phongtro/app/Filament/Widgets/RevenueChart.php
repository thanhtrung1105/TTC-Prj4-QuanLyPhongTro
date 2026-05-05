<?php

namespace App\Filament\Widgets;

use Filament\Widgets\ChartWidget;

class RevenueChart extends ChartWidget
{
    // 1. Heading KHÔNG CÓ static
    protected ?string $heading = 'Biểu đồ Doanh thu năm nay';
    
    // Đẩy biểu đồ xuống dưới, chiếm toàn bộ chiều ngang
    protected int | string | array $columnSpan = 'full';
    
    // 2. Sort BẮT BUỘC PHẢI CÓ static
    protected static ?int $sort = 2;

    protected function getData(): array
    {
        return [
            'datasets' => [
                [
                    'label' => 'Doanh thu (VNĐ)',
                    'data' => [0, 0, 19850000, 20350000, 25000000, 21000000, 0, 0, 0, 0, 0, 0],
                    'backgroundColor' => '#3b82f6', 
                    'borderRadius' => 4, 
                ],
            ],
            'labels' => ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }
}