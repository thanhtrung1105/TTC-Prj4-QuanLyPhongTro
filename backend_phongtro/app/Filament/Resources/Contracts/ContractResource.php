<?php

namespace App\Filament\Resources\Contracts; // <-- ĐÃ SỬA CHUẨN ĐƯỜNG DẪN THƯ MỤC

use App\Filament\Resources\Contracts\Pages; // <-- ĐÃ SỬA CHUẨN ĐƯỜNG DẪN PAGES
use App\Models\Contract;
use Filament\Resources\Resource;
use Filament\Schemas\Schema; 
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;

class ContractResource extends Resource
{
    protected static ?string $model = Contract::class;

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-document-text';
    protected static ?string $navigationLabel = 'Hợp Đồng';
    protected static ?string $modelLabel = 'Hợp đồng';
    protected static ?string $pluralModelLabel = 'Danh sách Hợp đồng';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Thông tin các bên')
                    ->icon('heroicon-o-users')
                    ->columns(2)
                    ->schema([
                        Select::make('room_id')
                            ->label('Chọn Phòng')
                            ->relationship('room', 'room_number')
                            ->searchable()
                            ->preload()
                            ->required(),

                        Select::make('tenant_id')
                            ->label('Chọn Khách thuê')
                            ->relationship('tenant', 'full_name')
                            ->searchable()
                            ->preload()
                            ->required(),
                    ]),

                Section::make('Chi tiết Hợp đồng')
                    ->icon('heroicon-o-currency-dollar')
                    ->columns(2)
                    ->schema([
                        DatePicker::make('start_date')
                            ->label('Ngày bắt đầu')
                            ->required()
                            ->native(false)
                            ->displayFormat('d/m/Y'),

                        DatePicker::make('end_date')
                            ->label('Ngày kết thúc')
                            ->native(false)
                            ->displayFormat('d/m/Y'),

                        TextInput::make('deposit_amount')
                            ->label('Tiền cọc (VNĐ)')
                            ->numeric()
                            ->required()
                            ->step(100000),

                        TextInput::make('rental_price')
                            ->label('Giá thuê chốt (VNĐ/Tháng)')
                            ->numeric()
                            ->required()
                            ->step(100000),

                        Select::make('status')
                            ->label('Trạng thái')
                            ->options([
                                'active' => 'Đang hiệu lực',
                                'expired' => 'Đã hết hạn',
                                'terminated' => 'Đã thanh lý',
                            ])
                            ->default('active')
                            ->required(),

                        Textarea::make('notes')
                            ->label('Ghi chú thêm')
                            ->columnSpanFull()
                            ->rows(3),
                    ])
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('room.room_number')
                    ->label('Phòng')
                    ->searchable()
                    ->sortable()
                    ->weight('bold')
                    ->color('primary'),

                TextColumn::make('tenant.full_name')
                    ->label('Khách thuê')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('start_date')
                    ->label('Ngày bắt đầu')
                    ->date('d/m/Y')
                    ->sortable(),

                TextColumn::make('deposit_amount')
                    ->label('Tiền cọc')
                    ->money('VND')
                    ->sortable(),

                TextColumn::make('status')
                    ->label('Trạng thái')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'active' => 'success',
                        'expired' => 'warning',
                        'terminated' => 'danger',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'active' => 'Đang hiệu lực',
                        'expired' => 'Đã hết hạn',
                        'terminated' => 'Đã thanh lý',
                        default => $state,
                    }),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make()->label('Sửa'),
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
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListContracts::route('/'),
            'create' => Pages\CreateContract::route('/create'),
            'edit' => Pages\EditContract::route('/{record}/edit'),
        ];
    }
}