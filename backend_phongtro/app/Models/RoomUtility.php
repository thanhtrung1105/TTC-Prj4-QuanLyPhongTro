<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoomUtility extends Model
{
    use HasFactory;
    
    protected $table = 'tnmttienichphong';

    protected $fillable = [
        'room_id',
        'utility_name',
    ];

    public function room()
    {
        return $this->belongsTo(Room::class);
    }
}