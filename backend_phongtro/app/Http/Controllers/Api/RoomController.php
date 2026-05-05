<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    public function getAvailableRooms()
    {
        // Lấy tất cả các phòng đang có trạng thái là 'available'
        $rooms = Room::where('status', 'available')->get();

        // Trả về dữ liệu dưới dạng JSON (Chuẩn giao tiếp API)
        return response()->json([
            'success' => true,
            'message' => 'Lấy danh sách phòng trống thành công!',
            'total'   => $rooms->count(),
            'data'    => $rooms
        ], 200);
    }
    
    public function getRoomDetail($id)
    {
        // Tìm phòng theo ID
        $room = \App\Models\Room::find($id);

        // Nếu không tìm thấy phòng
        if (!$room) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy thông tin phòng này!'
            ], 404);
        }

        // Nếu tìm thấy, trả về dữ liệu
        return response()->json([
            'success' => true,
            'data'    => $room
        ], 200);
    }
}