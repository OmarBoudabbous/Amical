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
        Schema::create('pere_meres', function (Blueprint $table) {
            $table->id();

            $table->string('nom_pere');
            $table->string('nom_mere');
            
            $table->string('prenom_pere');
            $table->string('prenom_mere');

            $table->date('date_naissance_pere');
            $table->date('date_naissance_mere');

            // Add the foreign key column to reference users table
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pere_meres');
    }
};
