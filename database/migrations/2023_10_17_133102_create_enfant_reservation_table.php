<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('enfant_reservation', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('enfant_id');
            $table->unsignedBigInteger('reservation_id');
            $table->timestamps();

            $table->foreign('enfant_id')->references('id')->on('enfants')->onDelete('cascade');
            $table->foreign('reservation_id')->references('id')->on('reservations')->onDelete('cascade');
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('enfant_reservation');
    }
};
