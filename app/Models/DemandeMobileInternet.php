<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DemandeMobileInternet extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'annonce_id',
        'choixforfait',
        'selected_value',
        'prix',
    ];


    public function annonce()
    {
        return $this->belongsTo(Annonce::class, 'annonce_id');
    }
    
}
