<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MaintenanceRequest extends Model
{
    use HasFactory;

    protected $table = 'tnmtyeucaubaoduong';

    protected $fillable = [
        'room_id',
        'tenant_id',
        'title',
        'description',
        'status',
        'estimated_cost',
        'actual_cost',
    ];

    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }
}