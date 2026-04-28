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
        Schema::create('tenants', function (Blueprint $table) {
            $table->id();
            $table->string('full_name'); // Họ và tên
            $table->string('cccd')->unique(); // Số CCCD (Không được trùng nhau)
            $table->string('phone'); // Số điện thoại
            $table->string('email')->nullable(); // Email (có thể bỏ trống)
            $table->string('address')->nullable(); // Địa chỉ (có thể bỏ trống)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tenants');
    }
};
