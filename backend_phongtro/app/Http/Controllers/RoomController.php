<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    public function index()
    {
        // Sử dụng Model Room để lấy toàn bộ dữ liệu phòng.
        // Hàm "with" sẽ tự động join các bảng lại để lấy kèm thông tin Chủ trọ và Tiện ích.
        $rooms = Room::with(['landlord', 'utilities'])->get();

        // Trả dữ liệu về dưới định dạng JSON
        return response()->json([
            'status' => 'success',
            'message' => 'Lấy danh sách phòng thành công',
            'data' => $rooms
        ], 200);
    }
    public function store(Request $request)
{
    // 1. Kiểm tra dữ liệu gửi lên
    $request->validate([
        'room_number' => 'required|string|max:50',
        'floor' => 'nullable|integer',
        'area' => 'required|numeric',
        'base_price' => 'required|numeric',
        'description' => 'nullable|string',
        'images' => 'nullable|array', // Bắt buộc phải là một mảng
    ]);

    // 2. Tạo phòng mới
    // Laravel sẽ tự động chuyển mảng 'images' thành chuỗi JSON để lưu vào DB 
    // nhờ vào khai báo $casts trong Model Room.
    $room = Room::create([
        'landlord_id' => $request->user()->id, 
        'room_number' => $request->room_number,
        'floor' => $request->floor ?? 1,
        'area' => $request->area,
        'base_price' => $request->base_price,
        'status' => 'available',
        'description' => $request->description,
        'images' => $request->images, 
    ]);

    return response()->json([
        'message' => 'Thêm phòng mới thành công cho hệ thống TNMT',
        'data' => $room
    ], 201);
}
    // Xem chi tiết 1 phòng
    public function show($id)
    {
        $room = Room::with(['landlord', 'utilities'])->find($id);
        if (!$room) {
            return response()->json(['message' => 'Không tìm thấy phòng'], 404);
        }
        return response()->json($room);
    }

    // Cập nhật thông tin phòng
    public function update(Request $request, $id)
    {
        $room = Room::find($id);
        if (!$room) {
            return response()->json(['message' => 'Không tìm thấy phòng'], 404);
        }

        // Lấy tất cả dữ liệu gửi lên để cập nhật
        $room->update($request->all());

        return response()->json([
            'message' => 'Cập nhật phòng thành công',
            'data' => $room
        ]);
    }

    // Xóa phòng
    public function destroy($id)
    {
        $room = Room::find($id);
        if (!$room) {
            return response()->json(['message' => 'Không tìm thấy phòng'], 404);
        }

        $room->delete();
        return response()->json(['message' => 'Xóa phòng thành công']);
    }
}