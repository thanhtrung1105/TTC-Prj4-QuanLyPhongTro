<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contract extends Model
{
    use HasFactory;

    protected $table = 'contracts';

    protected $fillable = [
        'tenant_id',
        'room_id',
        'start_date',
        'end_date',
        'monthly_price',
        'deposit_amount',
        'status',
        'contract_file'
    ];

    // Hợp đồng thuộc về 1 Khách thuê
    public function tenant()
    {
        return $this->belongsTo(Tenant::class, 'tenant_id');
    }

    // Hợp đồng thuộc về 1 Phòng
    public function room()
    {
        return $this->belongsTo(Room::class, 'room_id');
    }

    // 1 Hợp đồng sẽ sinh ra nhiều Hóa đơn hàng tháng
    public function invoices()
    {
        return $this->hasMany(Invoice::class, 'contract_id');
    }
}