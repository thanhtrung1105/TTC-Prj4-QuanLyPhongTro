<?php

namespace App\Filament\Resources\MaintenanceRequests;

use App\Filament\Resources\MaintenanceRequests\Pages;
use App\Models\MaintenanceRequest;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Schemas\Components\Section; // <-- ĐÃ SỬA CHUẨN ĐƯỜNG DẪN FILAMENT V5 Ở ĐÂY
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;

class MaintenanceRequestResource extends Resource
{
    protected static ?string $model = MaintenanceRequest::class;

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-wrench-screwdriver';
    protected static ?string $navigationLabel = 'Bảo trì & Sửa chữa';
    protected static ?string $modelLabel = 'Yêu cầu bảo trì';
    protected static ?string $pluralModelLabel = 'Danh sách Yêu cầu';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Thông tin yêu cầu')
                    ->columns(2)
                    ->schema([
                        Select::make('room_id')
                            ->label('Phòng')
                            ->relationship('room', 'room_number')
                            ->required(),

                        Select::make('tenant_id')
                            ->label('Khách báo cáo')
                            ->relationship('tenant', 'full_name')
                            ->required(),

                        TextInput::make('title')
                            ->label('Tóm tắt sự cố (VD: Hỏng vòi nước)')
                            ->required()
                            ->columnSpanFull(),

                        Textarea::make('description')
                            ->label('Mô tả chi tiết')
                            ->rows(3)
                            ->columnSpanFull(),
                    ]),

                Section::make('Trạng thái & Chi phí')
                    ->columns(2)
                    ->schema([
                        Select::make('status')
                            ->label('Trạng thái xử lý')
                            ->options([
                                'pending' => 'Chờ xử lý',
                                'in_progress' => 'Đang sửa chữa',
                                'completed' => 'Đã hoàn thành',
                                'cancelled' => 'Đã hủy',
                            ])
                            ->default('pending')
                            ->required(),

                        TextInput::make('estimated_cost')
                            ->label('Chi phí dự kiến (VNĐ)')
                            ->numeric()
                            ->default(0),

                        TextInput::make('actual_cost')
                            ->label('Chi phí thực tế (VNĐ)')
                            ->numeric()
                            ->default(0),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('room.room_number')
                    ->label('Phòng')
                    ->weight('bold')
                    ->sortable(),

                TextColumn::make('tenant.full_name')
                    ->label('Người báo')
                    ->searchable(),

                TextColumn::make('title')
                    ->label('Sự cố')
                    ->searchable()
                    ->limit(30),

                TextColumn::make('status')
                    ->label('Trạng thái')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'pending' => 'warning',
                        'in_progress' => 'info',
                        'completed' => 'success',
                        'cancelled' => 'danger',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'pending' => 'Chờ xử lý',
                        'in_progress' => 'Đang sửa',
                        'completed' => 'Hoàn thành',
                        'cancelled' => 'Đã hủy',
                        default => $state,
                    }),

                TextColumn::make('actual_cost')
                    ->label('Chi phí thực tế')
                    ->money('VND')
                    ->sortable(),

                TextColumn::make('created_at')
                    ->label('Ngày báo')
                    ->dateTime('d/m/Y')
                    ->sortable(),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make()->label('Cập nhật'),
                DeleteAction::make()->label('Xóa'),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make()->label('Xóa đã chọn'),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListMaintenanceRequests::route('/'),
            'create' => Pages\CreateMaintenanceRequest::route('/create'),
            'edit' => Pages\EditMaintenanceRequest::route('/{record}/edit'),
        ];
    }
}