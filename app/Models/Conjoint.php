<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conjoint extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'prenom',
        'fonction',
        'date_naissance',
        'adhèrent_lAmical',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
