<?php

namespace App\Filament\Resources\Rooms\Schemas;

use Filament\Schemas\Schema;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\FileUpload; // <-- IMPORT CÔNG CỤ UPLOAD ẢNH
use Illuminate\Database\Eloquent\Builder;

class RoomForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Thông tin cơ bản')
                    ->description('Nhập các thông số chính của phòng trọ')
                    ->icon('heroicon-o-information-circle')
                    ->columns(2)
                    ->schema([
                        Select::make('landlord_id')
                            ->label('Thuộc về Chủ trọ')
                            ->relationship('landlord', 'fullname', fn (Builder $query) => $query->where('role', 'chu_tro'))
                            ->searchable()
                            ->preload()
                            ->required()
                            ->columnSpanFull(),

                        TextInput::make('room_number')
                            ->label('Mã phòng (VD: P101)')
                            ->required()
                            ->maxLength(255),
                        
                        TextInput::make('floor')
                            ->label('Tầng')
                            ->required()
                            ->numeric()
                            ->minValue(1),
                            
                        TextInput::make('area')
                            ->label('Diện tích (m²)')
                            ->required()
                            ->numeric()
                            ->minValue(1),
                            
                        TextInput::make('base_price')
                            ->label('Giá thuê (VNĐ)')
                            ->required()
                            ->numeric()
                            ->minValue(0)
                            ->step(100000),
                    ]),

                // --- KHU VỰC UPLOAD ẢNH MỚI ĐƯỢC THÊM VÀO ĐÂY ---
                Section::make('Hình ảnh phòng trọ')
                    ->icon('heroicon-o-camera')
                    ->schema([
                        FileUpload::make('image')
                            ->label('Ảnh đại diện phòng')
                            ->image() // Chỉ cho phép up file ảnh
                            ->imageEditor() // Tích hợp sẵn công cụ cắt/xoay ảnh
                            ->directory('room-images') // Ảnh sẽ lưu vào thư mục này
                            ->visibility('public')
                            ->columnSpanFull(),
                    ]),
                // -------------------------------------------------

                Section::make('Trạng thái & Mô tả')
                    ->icon('heroicon-o-clipboard-document-list')
                    ->schema([
                        Select::make('status')
                            ->label('Trạng thái hiện tại')
                            ->options([
                                'available' => 'Còn trống',
                                'occupied' => 'Đã thuê',
                                'maintenance' => 'Bảo trì',
                            ])
                            ->required()
                            ->default('available')
                            ->native(false),
                            
                        Textarea::make('description')
                            ->label('Mô tả chi tiết (Nội thất, tiện ích...)')
                            ->rows(4)
                            ->columnSpanFull(),
                    ])
            ]);
    }
}