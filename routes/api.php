<?php

use App\Http\Controllers\ActiviteController;
use App\Http\Controllers\AdslController;
use App\Http\Controllers\AnnonceController;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\BonAchatController;
use App\Http\Controllers\ConjointController;
use App\Http\Controllers\ConventionContorller;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DemandeMobileInternetController;
use App\Http\Controllers\EnfantController;
use App\Http\Controllers\EngagementAchatController;
use App\Http\Controllers\FornisseurController;
use App\Http\Controllers\HomePageController;
use App\Http\Controllers\PereMereController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\SportController;
use App\Http\Controllers\Userontroller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [AuthenticationController::class, 'register']);
Route::post('/login', [AuthenticationController::class, 'login']);
Route::get('/home', [HomePageController::class, 'index']);


Route::middleware(['auth:api', 'role:admin,adherent'])->group(function () {
    Route::post('/logout', [AuthenticationController::class, 'logout']);
    Route::get('/dashboard', [DashboardController::class, 'index']);
    //get auth user
    Route::get('/user', [Userontroller::class, 'getAuthUser']);

    Route::get('dashboard/activities/activities/{id}', [ActiviteController::class, 'show']);
    Route::get('dashboard/convention/convention/{id}', [ConventionContorller::class, 'show']);
    //mobile internet
    Route::get('/annonce', [AnnonceController::class, 'index']);
    Route::get('dashboard/annonce/annonce/{id}', [AnnonceController::class, 'show']);


});

// 'Admin'-specific routes here
Route::middleware(['auth:api', 'role:admin'])->group(function () {
    // users
    Route::get('/users', [Userontroller::class, 'index']);
    Route::post('/users',  [Userontroller::class, 'store']);
    Route::get('/dashboard/users/{id}',  [Userontroller::class, 'show']);
    Route::put('/users/{id}',  [Userontroller::class, 'update']);
    Route::delete('/users/{id}', [Userontroller::class, 'destroy']);
    Route::put('/user/{id}/update-etat-adhesion', [Userontroller::class, 'updateEtatAdhesion']);
    
    // get all convetion form user id 
    Route::get('/user/convention/getUserInfoById/{userId}', [ReservationController::class, 'getUserInfoById']);



    Route::get('/user/conjoint/adherent/{id}', [Userontroller::class, 'getUserByConjointInfo']);

    // fournisseur
    Route::get('/fournisseur', [FornisseurController::class, 'index']);
    Route::get('/fournisseur/all', [FornisseurController::class, 'all']);
    Route::post('/fournisseur', [FornisseurController::class, 'store']);
    Route::get('/fournisseur/{id}', [FornisseurController::class, 'show']);
    Route::put('/fournisseur/{id}', [FornisseurController::class, 'update']);
    Route::delete('/fournisseur/{id}', [FornisseurController::class, 'destroy']);

    //conjoint 
    Route::get('/user/conjoint/{id}', [ConjointController::class, 'show']);

    //update enfant
    Route::put('/update/enfants/{id}', [EnfantController::class, 'update']);
    Route::delete('/delete/enfants/{id}', [EnfantController::class, 'destroy']);

    //activites
    Route::get('/activites', [ActiviteController::class, 'index']);
    Route::post('/activites', [ActiviteController::class, 'store']);
    Route::put('/activites/{id}', [ActiviteController::class, 'update']);
    Route::post('/activites/{id}/update-image', [ActiviteController::class, 'activityUpdateImage']);
    Route::delete('/activites/{id}', [ActiviteController::class, 'destroy']);

    //convention
    Route::get('/convention', [ConventionContorller::class, 'index']);
    Route::post('/convention', [ConventionContorller::class, 'store']);
    Route::post('/convention/{id}', [ConventionContorller::class, 'update']);
    Route::delete('/convention/{id}', [ConventionContorller::class, 'destroy']);

    // reservation user par activter
    Route::post('/admin/{userId}/{activityId}', [ReservationController::class, 'associateUserActivity']);

    //home page 
    Route::post('/home', [HomePageController::class, 'store']);

    //annonce 
    Route::post('/annonce', [AnnonceController::class, 'store']);
    Route::post('/annonce/{id}', [AnnonceController::class, 'update']);
    Route::delete('/annonce/{id}', [AnnonceController::class, 'destroy']);

    // demande pour un offre mobile ou internet
    Route::get('/demandeMobile', [DemandeMobileInternetController::class, 'index']);
    Route::post('/demandeMobile/{id}', [DemandeMobileInternetController::class, 'update']);
    Route::delete('/demandeMobile/{id}', [DemandeMobileInternetController::class, 'destroy']);

});

// 'Adherent'-specific routes here
Route::middleware(['auth:api', 'role:adherent'])->group(function () {

    //enfants
    Route::get('/user/enfants', [EnfantController::class, 'index']);
    Route::post('/add/enfants', [EnfantController::class, 'store']);

    //parent
    Route::get('/user/parent', [PereMereController::class, 'index']);
    Route::post('/add/parent', [PereMereController::class, 'store']);
    //conjoint
    Route::get('/user/conjoint', [ConjointController::class, 'index']);
    Route::post('/add/conjoint', [ConjointController::class, 'store']);


    Route::get('/activites/adherent', [ActiviteController::class, 'getActivitesValid']);
    Route::get('/convention/adherent', [ConventionContorller::class, 'getConventionValid']);

    //reservation activite 
    Route::post('/activites/{id}/reservations', [ReservationController::class, 'makeReservationActivite']);
    Route::get('/reservation/adherent', [ReservationController::class, 'userReservations']);
    Route::get('/getAllConvention/adherent', [ReservationController::class, 'getAllUserInfo']);
    Route::get('/getBonAchatsForUser', [ReservationController::class, 'getBonAchatsForUser']);

    // tous les Annonces by type annonce
    Route::get('/announcements', [AnnonceController::class, 'indexByUrl']);

    //demande mobile 
    Route::post('/demandeMobile', [DemandeMobileInternetController::class, 'store']);
    Route::get('/demandeMobile', [DemandeMobileInternetController::class, 'index']);
    
    //adsl
    Route::post('/adsl', [AdslController::class, 'store']);

    //engagmentAchat
    Route::post('/engagment', [EngagementAchatController::class, 'store']);

    //bonAchat
    Route::post('/bonAchat', [BonAchatController::class, 'store']);
    
    //sport
    Route::post('/sport', [SportController::class, 'store']);

});
