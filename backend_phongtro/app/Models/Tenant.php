<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tenant extends Model
{
    use HasFactory;

    protected $table = 'tenants';

    protected $fillable = [
        'user_id',
        'fullname',
        'email',
        'phone',
        'cmnd',
        'address',
        'avatar',
        'status'
    ];

    // Khách thuê liên kết với 1 tài khoản User
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Khách thuê có thể có nhiều hợp đồng (qua các năm)
    public function contracts()
    {
        return $this->hasMany(Contract::class, 'tenant_id');
    }
}