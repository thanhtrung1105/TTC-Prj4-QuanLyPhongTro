<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MaintenanceRequestController extends Controller
{
    public function getMyRequests(Request $request)
    {
        $userId = $request->user()->id;

        $requests = DB::table('tnmtyeucaubaoduong')
            ->join('tnmtkhachthue', 'tnmtyeucaubaoduong.tenant_id', '=', 'tnmtkhachthue.id')
            ->join('tnmtphong', 'tnmtyeucaubaoduong.room_id', '=', 'tnmtphong.id')
            ->where('tnmtkhachthue.user_id', $userId)
            ->select(
                'tnmtyeucaubaoduong.id',
                'tnmtyeucaubaoduong.title',
                'tnmtyeucaubaoduong.description',
                'tnmtyeucaubaoduong.status',
                'tnmtyeucaubaoduong.estimated_cost',
                'tnmtyeucaubaoduong.actual_cost',
                'tnmtyeucaubaoduong.created_at',
                'tnmtphong.room_number'
            )
            ->orderBy('tnmtyeucaubaoduong.created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $requests
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $userId = $request->user()->id;

        $tenant = DB::table('tnmtkhachthue')->where('user_id', $userId)->first();

        if (!$tenant) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy thông tin khách thuê.'
            ], 404);
        }

        $contract = DB::table('tnmthopdong')
            ->where('tenant_id', $tenant->id)
            ->where('status', 'active')
            ->first();

        if (!$contract) {
            return response()->json([
                'success' => false,
                'message' => 'Bạn chưa có hợp đồng đang hoạt động.'
            ], 400);
        }

        $todayCount = DB::table('tnmtyeucaubaoduong')
            ->where('tenant_id', $tenant->id)
            ->whereDate('created_at', now()->toDateString())
            ->count();

        if ($todayCount >= 3) {
            return response()->json([
                'success' => false,
                'message' => 'Bạn đã gửi tối đa 3 yêu cầu trong hôm nay. Vui lòng thử lại vào ngày mai.'
            ], 429);
        }

        $id = DB::table('tnmtyeucaubaoduong')->insertGetId([
            'room_id' => $contract->room_id,
            'tenant_id' => $tenant->id,
            'title' => $request->title,
            'description' => $request->description,
            'status' => 'pending',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Yêu cầu bảo trì đã được gửi thành công!',
            'data' => ['id' => $id]
        ], 201);
    }
}
