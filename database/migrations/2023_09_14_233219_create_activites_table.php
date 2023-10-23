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
        Schema::create('activites', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->string('description');
            $table->enum('type', ['sociale', 'loisire', 'sportive']);
            $table->string('image')->nullable(); // Colonne pour stocker le chemin de l'image

            $table->date('finActivity');
            $table->double('subvention')->default(0);;
            $table->double ('prix')->default(0);
            $table->integer('placesDisponibles')->nullable()->default(0);
            $table->integer('placesReservees')->nullable()->default(0);
            $table->integer('nombreDePlace')->nullable()->default(0);
        
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
        Schema::dropIfExists('activites');
    }
};
