<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\RoomController as ApiRoomController;
use App\Http\Controllers\Api\InvoiceController as ApiInvoiceController;
use App\Http\Controllers\Api\ProfileController as ApiProfileController;
use App\Http\Controllers\Api\ContractController as ApiContractController;
use App\Http\Controllers\Api\ContactController as ApiContactController;
use App\Http\Controllers\Api\MaintenanceRequestController as ApiMaintenanceRequestController;

Route::get('/rooms/available', [ApiRoomController::class, 'getAvailableRooms']);
Route::get('/rooms/{id}', [ApiRoomController::class, 'getRoomDetail']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/contact', [ApiContactController::class, 'store']);

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/my-profile', [ApiProfileController::class, 'getMyProfile']);
    Route::put('/my-profile', [ApiProfileController::class, 'updateMyProfile']);
    Route::post('/change-password', [ApiProfileController::class, 'changePassword']);

    Route::get('/my-contracts', [ApiContractController::class, 'getMyContracts']);

    Route::get('/my-invoices', [ApiInvoiceController::class, 'getMyInvoices']);
    Route::get('/my-invoices/{id}', [ApiInvoiceController::class, 'getInvoiceDetail']);
    Route::post('/my-invoices/{id}/pay', [ApiInvoiceController::class, 'payInvoice']);

    Route::get('/my-maintenance-requests', [ApiMaintenanceRequestController::class, 'getMyRequests']);
    Route::post('/my-maintenance-requests', [ApiMaintenanceRequestController::class, 'store']);

    Route::post('/rooms', [RoomController::class, 'store']);
    Route::put('/rooms/{id}', [RoomController::class, 'update']);
    Route::delete('/rooms/{id}', [RoomController::class, 'destroy']);
});