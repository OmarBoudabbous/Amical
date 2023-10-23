<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;


class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'prenom',
        'gsm',
        'matricule',
        'adresse',
        'fonction',
        'affectation',
        'date_naissance',
        'etat_civil',
        'etat_adhesion',
        'cotaannuellesubvention',
        'cin',
        'image',

    ];

    /**
     * Define a one-to-many relationship with the enfants table.
     */
    public function enfants()
    {
        return $this->hasMany(Enfant::class);
    }

    /**
     * Define a one-to-many relationship with the activte table.
     */
    public function activiteReservations()
    {
        return $this->belongsToMany(Activite::class, 'reservations');
    }


    public function mobileInternets()
    {
        return $this->hasMany(DemandeMobileInternet::class, 'user_id');
    }

    public function adsls()
    {
        return $this->hasMany(Adsl::class, 'user_id');
    }

    public function engagementAchats()
    {
        return $this->hasMany(EngagementAchat::class, 'user_id');
    }

    public function bonAchats()
    {
        return $this->hasMany(BonAchat::class, 'user_id');
    } 

    public function hotelBangalos()
    {
        return $this->hasMany(HotelBangalo::class, 'user_id');
    }

    public function sports()
    {
        return $this->hasMany(Sport::class, 'user_id');
    }
    /**
     * Define a one-to-many relationship with the parent table.
     */
    public function pereMeres()
    {
        return $this->hasOne(PereMere::class);
    }

    /**
     * Define a one-to-many relationship with the conjoint table.
     */
    public function conjoint()
    {
        return $this->hasOne(Conjoint::class);
    }



    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
}
