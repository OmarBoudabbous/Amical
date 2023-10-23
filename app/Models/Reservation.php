<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'activite_id',
        'enfants_id',
        'conjoint_id',
        'parent_id',
    ];


    public function activites()
    {
        return $this->belongsTo(Activite::class, 'activite_id');
    }

    public function enfants()
    {
        return $this->belongsToMany(Enfant::class);
    }
}
