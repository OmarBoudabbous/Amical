<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Adsl extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'annonce_id',
        'debit',
        'Adresseinstallation',
        'codepostal',
    ];

    public function annonce()
    {
        return $this->belongsTo(Annonce::class, 'annonce_id');
    }
}
