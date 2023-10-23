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
        Schema::create('sports', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('enfant_id');
            $table->unsignedBigInteger('annonce_id');

            $table->enum('type_abonnement', ['silver','silver+', 'Gold','على بكرى', 'مللول للخر', '+مللول للخر']);
            $table->enum('niveau_etude', ['4eme','5eme', '6eme','7eme', '8eme', '9eme','1erSecondaire','2emeSecondaire','3emeSecondaire','Bac']);
            $table->string('code_inscription');
 
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('enfant_id')->references('id')->on('enfants')->onDelete('cascade');
            $table->foreign('annonce_id')->references('id')->on('annonces')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sports');
    }
};
