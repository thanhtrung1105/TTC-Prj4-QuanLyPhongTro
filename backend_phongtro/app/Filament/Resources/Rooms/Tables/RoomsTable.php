<?php

namespace App\Filament\Resources\Rooms\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class RoomsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                // Tôi đã ẩn cột landlord_id đi vì hiển thị mỗi con số (VD: 2) 
                // ở bảng danh sách phòng không mang lại nhiều ý nghĩa cho người xem.

                TextColumn::make('room_number')
                    ->label('Mã phòng')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'), // In đậm mã phòng

                TextColumn::make('floor')
                    ->label('Tầng')
                    ->numeric()
                    ->sortable(),

                TextColumn::make('area')
                    ->label('Diện tích')
                    ->numeric()
                    ->suffix(' m²') // Thêm chữ m² vào sau số
                    ->sortable(),

                TextColumn::make('base_price')
                    ->label('Giá thuê')
                    ->money('VND') // Tự động định dạng tiền Việt Nam đồng
                    ->sortable()
                    ->color('success'), // Chữ màu xanh lá cho số tiền

                TextColumn::make('status')
                    ->label('Trạng thái')
                    ->badge() // Biến thành huy hiệu
                    ->color(fn (string $state): string => match ($state) {
                        'available' => 'success',   // Trống -> Xanh lá
                        'occupied' => 'danger',     // Đã thuê -> Đỏ
                        'maintenance' => 'warning', // Bảo trì -> Vàng
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'available' => 'Còn trống',
                        'occupied' => 'Đã thuê',
                        'maintenance' => 'Bảo trì',
                        default => $state,
                    }),

                TextColumn::make('created_at')
                    ->label('Ngày tạo')
                    ->dateTime('d/m/Y H:i') // Định dạng ngày giờ VN
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true), // Giấu đi, bấm vào nút cột mới hiện ra

                TextColumn::make('updated_at')
                    ->label('Cập nhật lần cuối')
                    ->dateTime('d/m/Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make()->label('Sửa'), // Việt hóa chữ Edit
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make()->label('Xóa đã chọn'), // Việt hóa chữ Delete
                ]),
            ]);
    }
}