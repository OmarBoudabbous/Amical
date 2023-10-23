<?php

namespace App\Http\Controllers;

use App\Models\Annonce;
use App\Models\Enfant;
use App\Models\Sport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SportController extends Controller
{
    public function store(Request $request)
    {
        $user = Auth::user(); // Get the authenticated user

        // Verify that annonce_id has the type_annonce set to "sport"
        $annonce = Annonce::where('id', $request->annonce_id)
            ->where('type_annonce', 'sport')
            ->first();

        if (!$annonce) {
            return response()->json(['error' => 'L\'annonce spécifiée n\'est pas de type "sport".'], 400);
        }

        // Vérifiez si l'utilisateur a déjà une demande existante
        $existingDemande = Sport::where([
            'annonce_id' => $request->annonce_id,
            'user_id' => $user->id,
            'enfant_id' => $request->enfant_id,
        ])->first();

        if ($existingDemande) {
            return response()->json(['error' => 'Une demande existe déjà.'], 400);
        }

        // Verify that the provided enfant_id belongs to the authenticated user
        $enfant = Enfant::where('id', $request->enfant_id)
            ->where('user_id', $user->id)
            ->first();

        if (!$enfant) {
            return response()->json(['error' => 'L\'enfant spécifié ne vous appartient pas.'], 403);
        }

        // If the user's child (enfant) exists, continue with creating a new Sport entry
        $validatedData = $request->validate([
            'annonce_id' => 'required',
            'enfant_id' => 'required',
            'type_abonnement' => 'required',
            'niveau_etude' => 'required',
            'code_inscription' => 'required',
        ]);

        $sport = new Sport();
        $sport->annonce_id = $validatedData['annonce_id'];
        $sport->enfant_id = $validatedData['enfant_id'];

        // Populate additional fields for the sports table
        $sport->type_abonnement = $validatedData['type_abonnement'];
        $sport->niveau_etude = $validatedData['niveau_etude'];
        $sport->code_inscription = $validatedData['code_inscription'];

        $sport->user_id = $user->id;

        $sport->save();

        return response()->json(['message' => 'Demande SPORT créée avec succès']);
    }
}
