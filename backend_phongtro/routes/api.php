<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoomController; // Controller gốc của bạn (Giữ nguyên)
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\RoomController as ApiRoomController; 
use App\Http\Controllers\Api\InvoiceController as ApiInvoiceController;

Route::get('/rooms/available', [ApiRoomController::class, 'getAvailableRooms']);
Route::get('/rooms/{id}', [ApiRoomController::class, 'getRoomDetail']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/my-invoices', [ApiInvoiceController::class, 'getMyInvoices']);
    Route::get('/my-invoices/{id}', [ApiInvoiceController::class, 'getInvoiceDetail']);
    Route::post('/my-invoices/{id}/pay', [ApiInvoiceController::class, 'payInvoice']);

    Route::post('/rooms', [RoomController::class, 'store']);
    Route::put('/rooms/{id}', [RoomController::class, 'update']);
    Route::delete('/rooms/{id}', [RoomController::class, 'destroy']);
    
});