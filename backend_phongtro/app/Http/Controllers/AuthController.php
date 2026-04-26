<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Kiểm tra dữ liệu đầu vào
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        // Kiểm tra tài khoản và mật khẩu
        if (!$user || !Hash::check($request->password, trim($user->password))) {
            return response()->json(['message' => 'Sai email hoặc mật khẩu'], 401);
        }

        // Tạo token
        $token = $user->createToken('token')->plainTextToken;

        return response()->json([
            'message' => 'Đăng nhập thành công',
            'token' => $token,
            'user' => $user
        ]);
    }

    public function logout(Request $request)
    {
        // Xóa token hiện tại
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Đăng xuất thành công']);
    }
}