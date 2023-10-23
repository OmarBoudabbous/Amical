<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fornisseur extends Model
{
    use HasFactory;
    protected $fillable = [
        'nom',
        'adresse',
        'telephone',
    ];


    public function activites()
    {
        return $this->hasMany(Activite::class);
    }
    
    public function annonces()
    {
        return $this->hasMany(Annonce::class, 'fornisseurs_id');
    }
}
