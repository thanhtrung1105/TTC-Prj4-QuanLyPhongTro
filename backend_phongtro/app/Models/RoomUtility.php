<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoomUtility extends Model
{
    use HasFactory;

    // Trỏ đúng vào tên bảng trong database
    protected $table = 'room_utilities';

    // Các cột được phép thêm dữ liệu
    protected $fillable = [
        'room_id',
        'utility_name'
    ];

    // Mối quan hệ ngược lại: 1 Tiện ích thuộc về 1 Phòng
    public function room()
    {
        return $this->belongsTo(Room::class, 'room_id');
    }
}