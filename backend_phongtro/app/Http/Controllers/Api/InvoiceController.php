<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InvoiceController extends Controller
{
    public function getMyInvoices(Request $request)
    {
        $userId = $request->user()->id;

        $invoices = DB::table('tnmthoadon')
            ->join('tnmthopdong', 'tnmthoadon.contract_id', '=', 'tnmthopdong.id')
            ->join('tnmtkhachthue', 'tnmthopdong.tenant_id', '=', 'tnmtkhachthue.id')
            ->where('tnmtkhachthue.user_id', $userId)
            ->select(
                'tnmthoadon.id',
                'tnmthoadon.month',
                'tnmthoadon.year',
                'tnmthoadon.total_amount',
                'tnmthoadon.status'
            )
            ->orderBy('tnmthoadon.year', 'desc')
            ->orderBy('tnmthoadon.month', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $invoices
        ]);
    }

    public function getInvoiceDetail(Request $request, $id)
    {
        $userId = $request->user()->id;

        $invoice = \App\Models\Invoice::with(['details', 'payments', 'contract.room'])
            ->where('id', $id)
            ->whereHas('contract.tenant', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })->first();

        if (!$invoice) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy hóa đơn hoặc bạn không có quyền truy cập.'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $invoice
        ]);
    }

    public function payInvoice(Request $request, $id)
    {
        $userId = $request->user()->id;

        $invoice = \App\Models\Invoice::where('id', $id)
            ->whereHas('contract.tenant', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })->first();

        if (!$invoice) {
            return response()->json(['success' => false, 'message' => 'Không tìm thấy hóa đơn hoặc bạn không có quyền.'], 404);
        }

        if ($invoice->status === 'paid') {
            return response()->json(['success' => false, 'message' => 'Hóa đơn này đã được thanh toán toàn bộ.'], 400);
        }

        $request->validate([
            'amount' => 'required|numeric|min:1000',
            'payment_method' => 'required|in:cash,bank_transfer,momo,zalopay,other'
        ]);

        $amount = $request->amount;
        $paidAmount = \App\Models\Payment::where('invoice_id', $id)->sum('amount');
        $remaining = $invoice->total_amount - $paidAmount;

        if ($amount > $remaining) {
            return response()->json(['success' => false, 'message' => 'Số tiền thanh toán vượt quá số nợ còn lại.'], 400);
        }

        \App\Models\Payment::create([
            'invoice_id' => $id,
            'amount' => $amount,
            'payment_method' => $request->payment_method,
            'paid_at' => now(),
        ]);

        $newPaidAmount = $paidAmount + $amount;
        if ($newPaidAmount >= $invoice->total_amount) {
            $invoice->status = 'paid';
            $invoice->paid_at = now();
            $invoice->save();
        }

        return response()->json([
            'success' => true,
            'message' => 'Thanh toán thành công!',
            'data' => [
                'paid_amount' => $newPaidAmount,
                'remaining' => $invoice->total_amount - $newPaidAmount,
                'status' => $invoice->status
            ]
        ]);
    }
}