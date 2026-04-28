<?php

namespace App\Filament\Resources\RoomUtilities\Pages;

use App\Filament\Resources\RoomUtilities\RoomUtilityResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListRoomUtilities extends ListRecords
{
    protected static string $resource = RoomUtilityResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
