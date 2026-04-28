<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contract extends Model
{
    use HasFactory;

    // Các cột được phép lưu
    protected $fillable = [
        'room_id',
        'tenant_id',
        'start_date',
        'end_date',
        'deposit_amount',
        'rental_price',
        'status',
        'notes',
    ];

    // Khai báo: 1 Hợp đồng thuộc về 1 Phòng
    public function room()
    {
        return $this->belongsTo(Room::class, 'room_id');
    }

    // Khai báo: 1 Hợp đồng thuộc về 1 Khách thuê
    public function tenant()
    {
        return $this->belongsTo(Tenant::class, 'tenant_id');
    }
}