<?php

namespace App\Http\Controllers;

use App\Models\Annonce;
use App\Models\DemandeMobileInternet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DemandeMobileInternetController extends Controller
{
    public function store(Request $request)
    {
        $user = Auth::user(); // Get the authenticated user

        // Verify that annonce_id has the type_annonce set to "mobileInternet"
        $annonce = Annonce::where('id', $request->annonce_id)
            ->where('type_annonce', 'mobileInternet')
            ->first();

        if (!$annonce) {
            return response()->json(['error' => 'L\'annonce spécifiée n\'est pas de type "mobileInternet".'], 400);
        }

        // Vérifiez si l'utilisateur a déjà une demande existante
        $existingDemande = DemandeMobileInternet::where([
            'annonce_id' => $request->annonce_id, // Ajoutez le champ 'annonce_id'
            'user_id' => $user->id,
        ])->first();

        if ($existingDemande) {
            return response()->json(['error' => 'Une demande existe déjà.'], 400);
        }

        // Si l'utilisateur n'a pas déjà une demande, créez une nouvelle demande
        $validatedData = $request->validate([
            'annonce_id' => 'required',
            'choixforfait' => 'required|in:voix,internet',
            'selected_value' => 'nullable',
            'prix' => 'nullable',
        ]);

        $demandeMobileInternet = new DemandeMobileInternet();
        $demandeMobileInternet->annonce_id = $validatedData['annonce_id'];
        $demandeMobileInternet->choixforfait = $validatedData['choixforfait'];
        $demandeMobileInternet->user_id = $user->id;
        $demandeMobileInternet->selected_value = $validatedData['selected_value'];
        $demandeMobileInternet->prix = $validatedData['prix'];

        $demandeMobileInternet->save();

        return response()->json(['message' => 'Demande Mobile Internet créée avec succès']);
    }

    public function index()
    {
        $user = Auth::user();
        $demands = DemandeMobileInternet::where('user_id', $user->id)->get();

        return response()->json($demands);
    }
}
