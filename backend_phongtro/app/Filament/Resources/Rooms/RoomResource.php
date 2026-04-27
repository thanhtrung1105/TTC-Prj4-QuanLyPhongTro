<?php

namespace App\Filament\Resources\Rooms;

use App\Filament\Resources\Rooms\Pages\CreateRoom;
use App\Filament\Resources\Rooms\Pages\EditRoom;
use App\Filament\Resources\Rooms\Pages\ListRooms;
use App\Filament\Resources\Rooms\Schemas\RoomForm;
use App\Filament\Resources\Rooms\Tables\RoomsTable;
use App\Models\Room;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;

class RoomResource extends Resource
{
    protected static ?string $model = Room::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-home-modern';
    protected static ?string $navigationLabel = 'Quản lý Phòng';
    
    // --- 2 DÒNG MỚI ĐỂ VIỆT HÓA TIÊU ĐỀ VÀ NÚT BẤM ---
    protected static ?string $modelLabel = 'Phòng trọ';
    protected static ?string $pluralModelLabel = 'Danh sách Phòng trọ';
    // -------------------------------------------------

    protected static ?string $recordTitleAttribute = 'room_number';

    public static function form(Schema $schema): Schema
    {
        return RoomForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return RoomsTable::configure($table);
    }

    public static function getPages(): array
    {
        return [
            'index' => ListRooms::route('/'),
            'create' => CreateRoom::route('/create'),
            'edit' => EditRoom::route('/{record}/edit'),
        ];
    }
}