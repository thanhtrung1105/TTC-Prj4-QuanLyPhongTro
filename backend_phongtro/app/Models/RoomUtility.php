<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoomUtility extends Model
{
    use HasFactory;

    protected $fillable = [
        'room_id',
        'month',
        'year',
        'electricity_old',
        'electricity_new',
        'electricity_price',
        'water_old',
        'water_new',
        'water_price',
        'total_amount',
    ];

    public function room()
    {
        return $this->belongsTo(Room::class);
    }
}