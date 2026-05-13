<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    public function getMyProfile(Request $request)
    {
        $user = $request->user();
        $tenantProfile = $user->tenantProfile;

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $user->id,
                'fullname' => $user->fullname,
                'email' => $user->email,
                'phone' => $user->phone,
                'avatar' => $user->avatar,
                'role' => $user->role,
                'status' => $user->status,
                'created_at' => $user->created_at,
                'tenant' => $tenantProfile ? [
                    'id' => $tenantProfile->id,
                    'fullname' => $tenantProfile->fullname,
                    'cmnd' => $tenantProfile->cmnd,
                    'phone' => $tenantProfile->phone,
                    'email' => $tenantProfile->email,
                    'address' => $tenantProfile->address,
                ] : null,
            ]
        ]);
    }

    public function updateMyProfile(Request $request)
    {
        $request->validate([
            'fullname' => 'sometimes|string|max:255',
            'phone' => 'sometimes|string|max:20',
        ]);

        $user = $request->user();

        if ($request->has('fullname')) {
            $user->fullname = $request->fullname;
        }
        if ($request->has('phone')) {
            $user->phone = $request->phone;
        }

        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Cập nhật thông tin thành công!',
            'data' => [
                'fullname' => $user->fullname,
                'phone' => $user->phone,
            ]
        ]);
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required|string',
            'new_password' => 'required|string|min:6|confirmed',
        ], [
            'new_password.min' => 'Mật khẩu mới phải có ít nhất 6 ký tự.',
            'new_password.confirmed' => 'Xác nhận mật khẩu mới không khớp.',
        ]);

        $user = $request->user();

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Mật khẩu hiện tại không đúng.'
            ], 422);
        }

        $user->password = $request->new_password;
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Đổi mật khẩu thành công!'
        ]);
    }
}
