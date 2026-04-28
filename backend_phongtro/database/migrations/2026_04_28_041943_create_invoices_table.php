<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            
            // Khóa ngoại kết nối với bảng contracts (Nếu xóa hợp đồng, hóa đơn bay theo)
            $table->foreignId('contract_id')->constrained('contracts')->cascadeOnDelete();
            
            $table->string('billing_month'); // Ký hiệu tháng thu tiền
            
            // --- Chỉ số Điện ---
            $table->integer('electricity_old')->default(0);
            $table->integer('electricity_new')->default(0);
            $table->decimal('electricity_price', 10, 2)->default(3500); // 3.500đ/chữ
            
            // --- Chỉ số Nước ---
            $table->integer('water_old')->default(0);
            $table->integer('water_new')->default(0);
            $table->decimal('water_price', 10, 2)->default(25000); // 25.000đ/khối
            
            // --- Tiền phòng và Tổng tiền ---
            $table->decimal('room_price', 15, 2); 
            $table->decimal('total_amount', 15, 2)->default(0);
            
            // --- Trạng thái ---
            // unpaid: Chưa đóng | paid: Đã đóng
            $table->string('status')->default('unpaid');
            $table->text('notes')->nullable();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
