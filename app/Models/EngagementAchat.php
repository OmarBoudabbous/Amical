<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EngagementAchat extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'annonce_id',
        'prix_article',
        'article',
        'nbrmois',
        'avance',
        'prix_finale',
        'deduction_mensuelle',
        
    ];

    public function annonce()
    {
        return $this->belongsTo(Annonce::class, 'annonce_id');
    }
}
