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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('prenom');
            $table->string('matricule')->unique();
            $table->string('cin')->unique();
            $table->string('gsm');
            $table->string('adresse');
            $table->date('date_naissance');
            
            $table->string('image')->nullable(); // Colonne pour stocker le chemin de l'image

            $table->decimal('cotaannuellesubvention', 10, 2)->nullable();

            $table->enum('fonction', ['Ouvrier','Receveur', 'Chef gare', 'Chef district ', 'Adjoint','Siége']);
            $table->enum('affectation', ['A1', 'A3', 'A4']);
            $table->enum('etat_civil', ['Marié', 'Célibataire', 'Divorcé', 'Veuve']);
            $table->enum('etat_adhesion', ['Actif', 'Inactif'])->default('Inactif'); // Valeur par défaut "Actif"

            $table->enum('role', ['admin', 'adherent'])->default('adherent'); 

            $table->rememberToken();
            $table->timestamp('email_verified_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
