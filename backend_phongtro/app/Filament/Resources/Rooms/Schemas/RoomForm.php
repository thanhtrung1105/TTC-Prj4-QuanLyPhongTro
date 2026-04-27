<?php

namespace App\Filament\Resources\Rooms\Schemas;

use Filament\Schemas\Schema; // Lõi Form mới
use Filament\Schemas\Components\Section; // Giao diện Section mới
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;

class RoomForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([ // Lõi Schema dùng components() ở ngoài cùng
                Section::make('Thông tin cơ bản')
                    ->description('Nhập các thông số chính của phòng trọ')
                    ->icon('heroicon-o-information-circle')
                    ->columns(2)
                    ->schema([ // Bên trong Section thì vẫn dùng schema()
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