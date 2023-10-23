<?php

namespace App\Http\Controllers;

use App\Models\Activite;
use App\Models\Annonce;
use App\Models\Convention;
use App\Models\Enfant;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class ReservationController extends Controller
{
    public function makeReservationActivite(Request $request, $id)
    {
        $activite = Activite::findOrFail($id);
        $user = Auth::user();

        // Check if the user already has a reservation
        $existingReservation = Reservation::where('user_id', $user->id)->first();

        if ($existingReservation) {
            return response()->json(['message' => 'Déjà inscrit']);
        }

        // Calculate the total spots needed, including the user
        $enfantIds = $request->input('enfant_ids');
        $conjointId = $request->input('conjoint_id');
        $pereMeresId = $request->input('pere_meres_id');
        $totalSpotsNeeded = ($enfantIds ? count($enfantIds) : 0) + ($conjointId ? 1 : 0) + ($pereMeresId ? 1 : 0) + 1; // User included

        // Check if there are enough available spots
        if ($activite->placesDisponibles >= $totalSpotsNeeded) {
            // If there are available spots, create the reservation
            $reservation = new Reservation();
            $reservation->user_id = $user->id;
            $reservation->activite_id = $activite->id;
            $reservation->conjoint_id = $conjointId;
            $reservation->pere_meres_id = $pereMeresId;
            $reservation->save();

            if ($enfantIds) {
                $reservation->enfants()->attach($enfantIds);
            }

            // Decrement available spots and increment placesReservees
            $activite->decrement('placesDisponibles', $totalSpotsNeeded);
            $activite->increment('placesReservees', $totalSpotsNeeded);

            return response()->json(['message' => 'Réservation créée avec succès.', 'reservation' => $reservation], 201);
        } else {
            // If there are not enough available spots, return an error message
            return response()->json(['message' => 'Désolé, il n\'y a pas suffisamment de places disponibles.'], 400);
        }
    }






    public function userReservations()
    {
        // Get the authenticated user
        $user = Auth::user();
        $perPage = 10;

        // Fetch reservations made by the user along with related activities and conventions
        $reservations = Reservation::with('activites')
            ->where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        // Split reservations into separate arrays for activties and conventions
        $activtiesReservations = array_filter($reservations->items(), function ($reservation) {
            return $reservation->activites !== null;
        });

        // Return the reservations for activties and conventions as a JSON response
        return response()->json([
            'activties' => array_values($activtiesReservations),
        ]);
    }


    // Auth user can see his reservation in all convention
    public function getAllUserInfo()
    {
        // Get the currently authenticated user
        $user = auth()->user();

        if (!$user) {
            return response()->json(['message' => 'User not authenticated'], 401);
        }

        // Retrieve information from each table using Eloquent
        $userInfo = [
            'mobile_internets' => $user->mobileInternets,
            'adsls' => $user->adsls,
            'bon_achats' => $user->bonAchats,
            'engagement_achats' => $user->engagementAchats,
            'sports' => $user->sports,
        ];

        return response()->json([
            'user_info' => $userInfo,
        ]);
    }

    // for the admin can see all the info for his reservation  on all annonce
    public function getUserInfoById($userId)
    {
        $user = User::find($userId);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $userInfo = [
            'mobile_internets' => $user->mobileInternets,
            'adsls' => $user->adsls,
            'bon_achats' => $user->bonAchats,
            'engagement_achats' => $user->engagementAchats,
            'sports' => $user->sports,
        ];
        return response()->json($userInfo);
    }


    // get Bon Achat reservation
    public function getBonAchatsForUser()
    {
        // Get the currently authenticated user
        $user = auth()->user();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $bonAchats = $user->bonAchats;

        return response()->json([
            'bonAchats' => $bonAchats,
        ]);
    }
}
