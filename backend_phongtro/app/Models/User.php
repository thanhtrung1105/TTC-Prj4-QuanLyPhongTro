<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Filament\Models\Contracts\HasName;

class User extends Authenticatable implements HasName
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'tnmtnguoidung';

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

    public function getFilamentName(): string
    {
        return $this->fullname ?? 'Admin';
    }

    public function rooms()
    {
        return $this->hasMany(Room::class, 'landlord_id');
    }

    public function tenantProfile()
    {
        return $this->hasOne(Tenant::class, 'user_id');
    }
}