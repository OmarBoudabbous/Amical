<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
    
        $imagePath = url('http://127.0.0.1:8000/storage/user.png');

        $user = User::create([
            'name' => 'omar',
            'prenom' => 'boudabbous',
            'gsm' => '12345678',
            'matricule' => '11223344',
            'cin' => '11223344',
            'adresse' => 'mhamdia',
            'affectation' => 'A1',
            'date_naissance' => '1992-10-10',
            'etat_civil' => 'Marié',
            'etat_adhesion' => 'Actif',
            'cotaannuellesubvention' => 1000,
            'image' =>$imagePath,
            'role' => 'admin'
        ]);
        
        $user2 = User::create([
            'name' => 'choukou',
            'prenom' => 'bessouss',
            'gsm' => '12345678',
            'matricule' => '22334455',
            'cin' => '22334455',
            'adresse' => 'mhamdia',
            'affectation' => 'A1',
            'date_naissance' => '1992-10-10',
            'etat_civil' => 'Marié',
            'etat_adhesion' => 'Actif',
            'cotaannuellesubvention' => 1000,
            'image' =>$imagePath,
            'role' => 'adherent'
        ]);
    }


}
