<?php

namespace App\Filament\Resources\RoomUtilities\Pages;

use App\Filament\Resources\RoomUtilities\RoomUtilityResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditRoomUtility extends EditRecord
{
    protected static string $resource = RoomUtilityResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
