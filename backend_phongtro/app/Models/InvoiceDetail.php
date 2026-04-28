<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvoiceDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice_id',
        'service_name',
        'quantity',
        'unit_price',
        'amount',
    ];

    // 1 Chi tiết thuộc về 1 Hóa đơn
    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }
}