<?php

namespace App\Http\Controllers;

use App\Models\Annonce;
use App\Models\EngagementAchat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EngagementAchatController extends Controller
{
    public function store(Request $request)
    {
        $user = Auth::user(); // Get the authenticated user

        // Verify that annonce_id has the type_annonce set to "engagementAchat"
        $annonce = Annonce::where('id', $request->annonce_id)
            ->where('type_annonce', 'engagementAchat')
            ->first();

        if (!$annonce) {
            return response()->json(['error' => 'L\'annonce spécifiée n\'est pas de type "engagementAchat".'], 400);
        }

        // Vérifiez si l'utilisateur a déjà une demande existante
        $existingDemande = EngagementAchat::where([
            'annonce_id' => $request->annonce_id,
            'user_id' => $user->id,
        ])->first();

        if ($existingDemande) {
            return response()->json(['error' => 'Une demande existe déjà.'], 400);
        }

        // Si l'utilisateur n'a pas déjà une demande, créez une nouvelle demande
        $validatedData = $request->validate([
            'annonce_id' => 'required',
            'article' => 'required',
            'prix_article' => 'required', // Allow the user to specify 'prix_article'
            'nbrmois' => 'required|in:4,6,9,12',
            'avance' => 'sometimes|nullable', // Laissez l'avance être optionnelle
        ]);

        // Use the user-provided 'prix_article' as the initial 'prix_article' and 'prix_finale'
        $prix_article = $validatedData['prix_article'];
        $prix_finale = $validatedData['prix_article'];

        // Vérifier si l'avance est spécifiée dans la demande, sinon par défaut à 0
        $avance = $request->has('avance') ? $request->avance : 0;

        // Calculer la déduction mensuelle en fonction du prix de l'article et de la durée
        $deduction_mensuelle = ($prix_article - $avance) / $validatedData['nbrmois'];

        $engagementAchat = new EngagementAchat();
        $engagementAchat->user_id = $user->id;
        $engagementAchat->annonce_id = $validatedData['annonce_id'];
        $engagementAchat->article = $validatedData['article'];
        $engagementAchat->prix_article = $prix_article;
        $engagementAchat->prix_finale = $prix_finale;
        $engagementAchat->nbrmois = $validatedData['nbrmois'];
        $engagementAchat->avance = $avance;
        $engagementAchat->deduction_mensuelle = $deduction_mensuelle;

        $engagementAchat->save();

        return response()->json(['message' => 'Demande ENGAGEMENTACHAT créée avec succès', 'engagementAchat' => $engagementAchat]);
    }
}
