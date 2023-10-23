<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Convention extends Model
{
    use HasFactory;

    protected $fillable = [
        'titre',
        'description',
        'prix_mois',
        'periode',
        'image',
        'date_fin',
        'fornisseurs_id'
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
