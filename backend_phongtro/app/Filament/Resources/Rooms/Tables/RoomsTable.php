<?php

namespace App\Filament\Resources\Rooms\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn; // <-- IMPORT CÔNG CỤ HIỂN THỊ ẢNH
use Filament\Tables\Table;

class RoomsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                // --- CỘT HIỂN THỊ ẢNH Ở ĐẦU BẢNG ---
                ImageColumn::make('image')
                    ->label('Ảnh')
                    ->circular() // Cắt ảnh thành hình tròn cho hiện đại
                    ->size(40), // Kích thước ảnh 40x40px
                // -----------------------------------

                TextColumn::make('landlord.fullname')
                    ->label('Chủ trọ')
                    ->searchable()
                    ->sortable()
                    ->icon('heroicon-m-user')
                    ->color('info'),

                TextColumn::make('room_number')
                    ->label('Mã phòng')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),

                TextColumn::make('floor')
                    ->label('Tầng')
                    ->numeric()
                    ->sortable(),

                TextColumn::make('area')
                    ->label('Diện tích')
                    ->numeric()
                    ->suffix(' m²')
                    ->sortable(),

                TextColumn::make('base_price')
                    ->label('Giá thuê')
                    ->money('VND')
                    ->sortable()
                    ->color('success'),

                TextColumn::make('status')
                    ->label('Trạng thái')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'available' => 'success',
                        'occupied' => 'danger',
                        'maintenance' => 'warning',
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
                    ->dateTime('d/m/Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

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
                EditAction::make()->label('Sửa'),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make()->label('Xóa đã chọn'),
                ]),
            ]);
    }
}