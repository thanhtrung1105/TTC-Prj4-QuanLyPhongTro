<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;

    // 1. Chỉ định chính xác tên bảng trong MySQL
    protected $table = 'TNMTphong';

    // 2. Cho phép thao tác thêm/sửa trên các cột này
    protected $fillable = [
        'landlord_id', 
        'room_number', 
        'floor', 
        'area', 
        'base_price', 
        'status', 
        'description', 
        'image',
    ];

    // 3. Định nghĩa mối quan hệ (Phòng thuộc về 1 Chủ trọ)
    public function landlord()
    {
        return $this->belongsTo(User::class, 'landlord_id');
    }

    // Phòng có nhiều tiện ích
    public function utilities()
    {
        return $this->hasMany(RoomUtility::class, 'room_id');
    }

    // Phòng có nhiều hợp đồng
    public function contracts()
    {
        return $this->hasMany(Contract::class, 'room_id');
    }

    protected $casts = [
    'images' => 'array', // Tự động chuyển đổi JSON <-> Array
];
}