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
        Schema::create('contracts', function (Blueprint $table) {
            $table->id();
            
            // Khóa ngoại: Hợp đồng này của phòng nào? Khách nào thuê?
            $table->foreignId('room_id')->constrained('rooms')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');

            // Thông tin hợp đồng
            $table->date('start_date'); // Ngày bắt đầu tính tiền
            $table->date('end_date')->nullable(); // Ngày kết thúc (có thể bỏ trống nếu thuê dài hạn)
            $table->decimal('deposit', 15, 2)->default(0); // Tiền cọc
            $table->string('status')->default('active'); // Trạng thái: active (đang ở), expired (đã chuyển đi)

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contracts');
    }
};
