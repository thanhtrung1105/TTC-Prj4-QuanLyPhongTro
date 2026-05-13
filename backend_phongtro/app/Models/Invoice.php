<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;

    protected $table = 'tnmthoadon';

    protected $fillable = [
        'contract_id',
        'month',
        'year',
        'total_amount',
        'status',
        'paid_at',
    ];

    public function contract()
    {
        return $this->belongsTo(Contract::class);
    }

    public function details()
    {
        return $this->hasMany(InvoiceDetail::class, 'invoice_id');
    }

    public function payments()
    {
        return $this->hasMany(Payment::class, 'invoice_id');
    }
}