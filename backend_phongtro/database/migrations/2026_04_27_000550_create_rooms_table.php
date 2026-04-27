<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            // Khóa ngoại liên kết với bảng users (chủ trọ)
            $table->foreignId('landlord_id')->constrained('users')->onDelete('cascade');
            
            $table->string('room_number', 50);
            $table->integer('floor')->default(1);
            $table->float('area');
            $table->decimal('base_price', 15, 2);
            $table->string('status', 20)->default('available');
            $table->text('description')->nullable();
            
            // Cột lưu mảng hình ảnh dạng JSON
            $table->json('images')->nullable();
            
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('rooms');
    }
};