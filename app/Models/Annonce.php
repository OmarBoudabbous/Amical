<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Annonce extends Model
{
    use HasFactory;

    protected $fillable = [
        'image',
        'titre',
        'fornisseurs_id',
        'type_annonce'
    ];


    public function fornisseur()
    {
        return $this->belongsTo(Fornisseur::class, 'fornisseurs_id');
    }

    public function mobileInternets()
    {
        return $this->hasMany(DemandeMobileInternet::class, 'annonce_id');
    }

    public function adsls()
    {
        return $this->hasMany(Adsl::class, 'annonce_id');
    }

    public function bonAchats()
    {
        return $this->hasMany(BonAchat::class, 'annonce_id');
    }

    public function engagementAchats()
    {
        return $this->hasMany(EngagementAchat::class, 'annonce_id');
    }

    public function hotelBangalos()
    {
        return $this->hasMany(HotelBangalo::class, 'annonce_id');
    }

    public function sports()
    {
        return $this->hasMany(Sport::class, 'annonce_id');
    }
}
