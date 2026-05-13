<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ContractController extends Controller
{
    public function getMyContracts(Request $request)
    {
        $userId = $request->user()->id;

        $contracts = DB::table('tnmthopdong')
            ->join('tnmtkhachthue', 'tnmthopdong.tenant_id', '=', 'tnmtkhachthue.id')
            ->join('tnmtphong', 'tnmthopdong.room_id', '=', 'tnmtphong.id')
            ->where('tnmtkhachthue.user_id', $userId)
            ->select(
                'tnmthopdong.id',
                'tnmthopdong.start_date',
                'tnmthopdong.end_date',
                'tnmthopdong.deposit_amount',
                'tnmthopdong.monthly_price',
                'tnmthopdong.status',
                'tnmthopdong.contract_file',
                'tnmthopdong.created_at',
                'tnmtphong.room_number',
                'tnmtphong.floor',
                'tnmtphong.area'
            )
            ->orderBy('tnmthopdong.created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $contracts
        ]);
    }
}
