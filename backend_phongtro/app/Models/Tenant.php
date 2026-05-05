<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tenant extends Model
{
    use HasFactory;

    protected $table = 'tnmtkhachthue';

    // Cho phép lưu các cột này vào Database
    protected $fillable = [
        'full_name',
        'cccd',
        'phone',
        'email',
        'address',
    ];
}