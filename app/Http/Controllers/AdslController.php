<?php

namespace App\Http\Controllers;

use App\Models\Adsl;
use App\Models\Annonce;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdslController extends Controller
{
    public function store(Request $request)
    {
        $user = Auth::user(); // Get the authenticated user

        // Verify that annonce_id has the type_annonce set to "adsl"
        $annonce = Annonce::where('id', $request->annonce_id)
            ->where('type_annonce', 'adsl')
            ->first();

        if (!$annonce) {
            return response()->json(['error' => 'L\'annonce spécifiée n\'est pas de type "adsl".'], 400);
        }

        // Vérifiez si l'utilisateur a déjà une demande existante
        $existingDemande = Adsl::where([
            'annonce_id' => $request->annonce_id, // Ajoutez le champ 'annonce_id'
            'user_id' => $user->id,
        ])->first();

        if ($existingDemande) {
            return response()->json(['error' => 'Une demande existe déjà.'], 400);
        }

        // Si l'utilisateur n'a pas déjà une demande, créez une nouvelle demande
        $validatedData = $request->validate([
            'annonce_id' => 'required',
            'debit' => 'required|in:8U,12U,20U,8D,12D,20D',
            'Adresseinstallation' => 'required',
            'codepostal' => 'required',
        ]);

        $adsl = new Adsl();
        $adsl->annonce_id = $validatedData['annonce_id'];
        $adsl->debit = $validatedData['debit'];
        $adsl->user_id = $user->id;
        $adsl->Adresseinstallation = $validatedData['Adresseinstallation'];
        $adsl->codepostal = $validatedData['codepostal'];

        $adsl->save();

        return response()->json(['message' => 'Demande ADSL créée avec succès']);
    }
}
