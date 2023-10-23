<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Enfant extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'scolarite',
        'date_naissance',
        'sexe'
    ];

    /**
     * Define the inverse of the relationship, indicating that each child belongs to one user.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function sport()
    {
        return $this->belongsToMany(Sport::class, 'sports');
    }

    public function reservations()
    {
        return $this->belongsToMany(Reservation::class);
    }
}
