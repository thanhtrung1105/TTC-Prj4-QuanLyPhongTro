<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;

    protected $table = 'tnmtphong';

    protected $fillable = [
        'landlord_id',
        'room_number',
        'floor',
        'area',
        'base_price',
        'status',
        'description',
        'images',
    ];

    protected $casts = [
        'images' => 'array',
    ];

    public function landlord()
    {
        return $this->belongsTo(User::class, 'landlord_id');
    }

    public function utilities()
    {
        return $this->hasMany(RoomUtility::class, 'room_id');
    }

    public function contracts()
    {
        return $this->hasMany(Contract::class, 'room_id');
    }
}