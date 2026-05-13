<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    public function getAvailableRooms(Request $request)
    {
        $query = Room::where('status', 'available');

        if ($request->filled('keyword')) {
            $keyword = $request->keyword;
            $query->where(function ($q) use ($keyword) {
                $q->where('room_number', 'like', "%{$keyword}%")
                  ->orWhere('description', 'like', "%{$keyword}%");
            });
        }

        if ($request->filled('floor')) {
            $query->where('floor', $request->floor);
        }

        if ($request->filled('min_area')) {
            $query->where('area', '>=', $request->min_area);
        }

        if ($request->filled('max_area')) {
            $query->where('area', '<=', $request->max_area);
        }

        if ($request->filled('min_price')) {
            $query->where('base_price', '>=', $request->min_price);
        }

        if ($request->filled('max_price')) {
            $query->where('base_price', '<=', $request->max_price);
        }

        $rooms = $query->orderBy('base_price', 'asc')->get();

        return response()->json([
            'success' => true,
            'message' => 'Lấy danh sách phòng trống thành công!',
            'total'   => $rooms->count(),
            'data'    => $rooms
        ], 200);
    }

    public function getRoomDetail($id)
    {
        $room = Room::with('utilities')->find($id);

        if (!$room) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy thông tin phòng này!'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data'    => $room
        ], 200);
    }
}