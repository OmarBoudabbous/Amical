<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PereMere extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom_pere',
        'nom_mere',

        'prenom_pere',
        'prenom_mere',
        
        'date_naissance_pere',
        'date_naissance_mere',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
