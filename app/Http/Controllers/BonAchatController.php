<?php

namespace App\Http\Controllers;

use App\Models\Annonce;
use App\Models\BonAchat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BonAchatController extends Controller
{
    public function store(Request $request)
    {
        $user = Auth::user(); // Get the authenticated user

        // Verify that annonce_id has the type_annonce set to "bonAchat"
        $annonce = Annonce::where('id', $request->annonce_id)
            ->where('type_annonce', 'bonAchat')
            ->first();

        if (!$annonce) {
            return response()->json(['error' => 'L\'annonce spécifiée n\'est pas de type "bonAchat".'], 400);
        }

        // Vérifiez si l'utilisateur a déjà une demande existante
        $existingDemande = BonAchat::where([
            'annonce_id' => $request->annonce_id, // Ajoutez le champ 'annonce_id'
            'user_id' => $user->id,
        ])->first();

        if ($existingDemande) {
            return response()->json(['error' => 'Une demande existe déjà.'], 400);
        }

        // Si l'utilisateur n'a pas déjà une demande, créez une nouvelle demande
        $validatedData = $request->validate([
            'annonce_id' => 'required',
            'montant' => 'required|in:100,150,200,250,300,350,400,450,500',
        ]);

        $bonAchat = new BonAchat();
        $bonAchat->annonce_id = $validatedData['annonce_id'];
        $bonAchat->user_id = $user->id;
        $bonAchat->montant = $validatedData['montant'];

        $bonAchat->save();

        return response()->json(['message' => 'Demande Bon Achat créée avec succès', 'bonAchat' => $bonAchat]);
    }
}
