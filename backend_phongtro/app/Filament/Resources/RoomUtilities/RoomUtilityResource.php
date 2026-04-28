<?php

// 1. ĐÃ SỬA LẠI ĐÚNG TÊN THƯ MỤC CỦA BẠN LÀ RoomUtilities
namespace App\Filament\Resources\RoomUtilities;

// 2. ĐÃ SỬA LẠI ĐÚNG ĐƯỜNG DẪN ĐẾN THƯ MỤC Pages
use App\Filament\Resources\RoomUtilities\Pages; 
use App\Models\RoomUtility;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\Hidden;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;

// 3. ĐÃ THÊM DÒNG NÀY ĐỂ FIX LỖI Get $get
use Filament\Forms\Get; 

class RoomUtilityResource extends Resource
{
    protected static ?string $model = RoomUtility::class;

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-bolt';
    protected static ?string $navigationLabel = 'Chỉ số Điện & Nước';
    protected static ?string $modelLabel = 'Chỉ số điện nước';
    protected static ?string $pluralModelLabel = 'Danh sách Chỉ số';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Thông tin chung')
                    ->columns(3)
                    ->schema([
                        Select::make('room_id')
                            ->label('Phòng')
                            ->relationship('room', 'room_number')
                            ->required(),
                        Select::make('month')
                            ->label('Tháng')
                            ->options(array_combine(range(1, 12), range(1, 12)))
                            ->default(now()->month)
                            ->required(),
                        Select::make('year')
                            ->label('Năm')
                            ->options(array_combine(range(2024, 2030), range(2024, 2030)))
                            ->default(now()->year)
                            ->required(),
                    ]),

                Section::make('Chỉ số Điện & Nước')
                    ->columns(2)
                    ->schema([
                        Section::make('Chỉ số Điện')
                            ->columnSpan(1)
                            ->schema([
                                TextInput::make('electricity_old')
                                    ->label('Số điện cũ')
                                    ->numeric()->default(0)->live(),
                                TextInput::make('electricity_new')
                                    ->label('Số điện mới')
                                    ->numeric()->default(0)->live(),
                                TextInput::make('electricity_price')
                                    ->label('Đơn giá điện')
                                    ->numeric()->default(3500)->suffix('đ/kWh')->live(),
                            ]),

                        Section::make('Chỉ số Nước')
                            ->columnSpan(1)
                            ->schema([
                                TextInput::make('water_old')
                                    ->label('Số nước cũ')
                                    ->numeric()->default(0)->live(),
                                TextInput::make('water_new')
                                    ->label('Số nước mới')
                                    ->numeric()->default(0)->live(),
                                TextInput::make('water_price')
                                    ->label('Đơn giá nước')
                                    ->numeric()->default(15000)->suffix('đ/m3')->live(),
                            ]),
                    ]),

                Section::make('Tổng kết')
                    ->schema([
                        Placeholder::make('total_display')
                            ->label('Tổng tiền dự kiến')
                            ->content(function (Get $get) {
                                $elec = ((float)$get('electricity_new') - (float)$get('electricity_old')) * (float)$get('electricity_price');
                                $water = ((float)$get('water_new') - (float)$get('water_old')) * (float)$get('water_price');
                                $total = max(0, $elec) + max(0, $water);
                                return number_format($total) . ' VNĐ';
                            }),
                        Hidden::make('total_amount')
                            ->default(0),
                    ])
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
                TextColumn::make('month')
                    ->label('Tháng/Năm')
                    ->formatStateUsing(fn ($record) => "T{$record->month}/{$record->year}"),
                
                TextColumn::make('electricity_usage')
                    ->label('Điện tiêu thụ')
                    ->state(fn ($record) => ($record->electricity_new - $record->electricity_old) . ' kWh'),

                TextColumn::make('water_usage')
                    ->label('Nước tiêu thụ')
                    ->state(fn ($record) => ($record->water_new - $record->water_old) . ' m3'),

                TextColumn::make('total_amount')
                    ->label('Thành tiền')
                    ->money('VND')
                    ->color('danger')
                    ->weight('bold'),
            ])
            ->filters([
                SelectFilter::make('month')->label('Lọc theo tháng')->options(array_combine(range(1, 12), range(1, 12))),
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
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
            'index' => Pages\ListRoomUtilities::route('/'),
            'create' => Pages\CreateRoomUtility::route('/create'),
            'edit' => Pages\EditRoomUtility::route('/{record}/edit'),
        ];
    }
}