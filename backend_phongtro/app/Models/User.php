<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Filament\Models\Contracts\HasName; // <-- 1. Import class HasName của Filament

class User extends Authenticatable implements HasName // <-- 2. Khai báo implements HasName
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'TNMTnguoidung';

    protected $fillable = [
        'email',
        'password',
        'fullname',
        'phone',
        'role',
        'avatar',
        'status',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    // <-- 3. Thêm hàm này để Filament biết lấy cột nào làm tên hiển thị
    public function getFilamentName(): string
    {
        return $this->fullname ?? 'Admin'; 
    }

    // Nếu User là Chủ trọ (landlord), họ sẽ có nhiều Phòng
    public function rooms()
    {
        return $this->hasMany(Room::class, 'landlord_id');
    }

    // Nếu User là Khách thuê, họ sẽ liên kết 1-1 với bảng tenants
    public function tenantProfile()
    {
        return $this->hasOne(Tenant::class, 'user_id');
    }
}