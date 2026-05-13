<?php

namespace App\Filament\Resources\RoomUtilities;

use App\Filament\Resources\RoomUtilities\Pages;
use App\Models\RoomUtility;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;

class RoomUtilityResource extends Resource
{
    protected static ?string $model = RoomUtility::class;

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-bolt';
    protected static ?string $navigationLabel = 'Tiện Ích Phòng';
    protected static ?string $modelLabel = 'Tiện ích phòng';
    protected static ?string $pluralModelLabel = 'Danh sách Tiện ích';
    protected static string|\UnitEnum|null $navigationGroup = 'Quản lý Phòng';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Thông tin tiện ích')
                    ->columns(2)
                    ->schema([
                        Select::make('room_id')
                            ->label('Phòng')
                            ->relationship('room', 'room_number')
                            ->searchable()
                            ->preload()
                            ->required(),

                        TextInput::make('utility_name')
                            ->label('Tên tiện ích')
                            ->placeholder('VD: Wifi, Điều hòa, Nóng lạnh...')
                            ->required()
                            ->maxLength(255),
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
                    ->sortable()
                    ->searchable(),

                TextColumn::make('utility_name')
                    ->label('Tiện ích')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('created_at')
                    ->label('Ngày thêm')
                    ->dateTime('d/m/Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([])
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
            'index' => Pages\ListRoomUtilities::route('/'),
            'create' => Pages\CreateRoomUtility::route('/create'),
            'edit' => Pages\EditRoomUtility::route('/{record}/edit'),
        ];
    }
}