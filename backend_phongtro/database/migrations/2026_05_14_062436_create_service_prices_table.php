<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tnmtbanggia', function (Blueprint $table) {
            $table->id();
            $table->string('service_name');
            $table->string('unit');
            $table->decimal('unit_price', 12, 0);
            $table->string('icon')->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        DB::table('tnmtbanggia')->insert([
            ['service_name' => 'Tiền điện', 'unit' => 'kWh', 'unit_price' => 3500, 'icon' => '⚡', 'sort_order' => 1, 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['service_name' => 'Tiền nước', 'unit' => 'm³', 'unit_price' => 15000, 'icon' => '💧', 'sort_order' => 2, 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['service_name' => 'Internet/Wifi', 'unit' => 'tháng', 'unit_price' => 100000, 'icon' => '📶', 'sort_order' => 3, 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['service_name' => 'Phí giữ xe', 'unit' => 'tháng', 'unit_price' => 50000, 'icon' => '🏍️', 'sort_order' => 4, 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['service_name' => 'Phí vệ sinh', 'unit' => 'tháng', 'unit_price' => 30000, 'icon' => '🧹', 'sort_order' => 5, 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('tnmtbanggia');
    }
};
