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
        Schema::create('conventions', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->string('description');
            $table->string('prix_mois');             
            $table->string('image')->nullable(); // Colonne pour stocker le chemin de l'image

            $table->date('date_fin')->nullable();
            
            $table->unsignedBigInteger('fornisseurs_id');
            $table->foreign('fornisseurs_id')->references('id')->on('fornisseurs')->onDelete('cascade');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('conventions');
    }
};
