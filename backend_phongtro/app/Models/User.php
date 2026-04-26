<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

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