<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    public function index()
    {
        $rooms = Room::with(['landlord', 'utilities'])->get();

        return response()->json([
            'status' => 'success',
            'message' => 'Lấy danh sách phòng thành công',
            'data' => $rooms
        ], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'room_number' => 'required|string|max:50',
            'floor' => 'nullable|integer',
            'area' => 'required|numeric',
            'base_price' => 'required|numeric',
            'description' => 'nullable|string',
            'images' => 'nullable|array',
        ]);

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
            'message' => 'Thêm phòng mới thành công',
            'data' => $room
        ], 201);
    }

    public function show($id)
    {
        $room = Room::with(['landlord', 'utilities'])->find($id);
        if (!$room) {
            return response()->json(['message' => 'Không tìm thấy phòng'], 404);
        }
        return response()->json($room);
    }

    public function update(Request $request, $id)
    {
        $room = Room::find($id);
        if (!$room) {
            return response()->json(['message' => 'Không tìm thấy phòng'], 404);
        }

        $room->update($request->all());

        return response()->json([
            'message' => 'Cập nhật phòng thành công',
            'data' => $room
        ]);
    }

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