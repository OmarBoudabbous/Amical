<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activite extends Model
{
    use HasFactory;

    protected $fillable = [
        'titre',
        'description',
        'type',
        'image',
        'finActivity',
        'subvention',
        'placesDisponibles',
        'placesReservees',
        'nombreDePlace',
        'fornisseurs_id',
        'user_id',
        'prix'
    ];

    /**
     * Define the inverse of the relationship, indicating that each activite belongs to one user.
     */
    public function users()
    {
        return $this->belongsToMany(User::class, 'reservations');
    }
    /**
     * Define the inverse of the relationship, indicating that each activite belongs to one fournisseur.
     */
    public function fornisseur()
    {
        return $this->belongsTo(Fornisseur::class,'fornisseurs_id');
    }
}
