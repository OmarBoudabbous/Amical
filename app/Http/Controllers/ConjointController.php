<?php

namespace App\Http\Controllers;

use App\Models\Conjoint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ConjointController extends Controller
{
    public function index()
    {
        // Get the authenticated user
        $user = Auth::user();
        // Retrieve the authenticated user's conjoint
        $conjoint = $user->conjoint;

        // Return JSON response
        return response()->json([
            'id'=>$conjoint->id,
            'nom' => $conjoint->nom,
            'prenom' => $conjoint->prenom,
            'date_naissance' => $conjoint->date_naissance,
            'fonction' => $conjoint->fonction,
            'adhèrent_lAmical' => $conjoint->adhèrent_lAmical,
        ]);
    }

    public function show($id)
    {
        // Find the Fournisseur by ID
        $conjoint = Conjoint::find($id);

        // Check if the Conjo$conjoint was found
        if (!$conjoint) {
            return response()->json(['message' => 'conjoint not found'], 404);
        }

        // Return the Conjo$conjoint data
        return response()->json($conjoint);
    }


    public function store(Request $request)
    {
        // Get the authenticated user
        $user = Auth::user();

        // Check if a "conjoint" record already exists for the user
        $existingConjoint = Conjoint::where('user_id', $user->id)->first();

        if ($existingConjoint) {
            // If a record exists, return an error response
            return response()->json(['message' => 'A "conjoint" record already exists for this user. You cannot add a new one.'], 400);
        }

        // If no record exists, validate the request data
        $validatedData = $request->validate([
            'nom' => 'required|string',
            'prenom' => 'required|string',
            'fonction' => 'required|string',
            'date_naissance' => 'required|date',
            'adhèrent_lAmical' => 'required|boolean', // Validate the boolean field
        ]);

        // Create a new Conjoint instance with validated data
        $conjoint = new Conjoint([
            'nom' => $validatedData['nom'],
            'prenom' => $validatedData['prenom'],
            'fonction' => $validatedData['fonction'],
            'date_naissance' => $validatedData['date_naissance'],
            'adhèrent_lAmical' => $validatedData['adhèrent_lAmical'], // Set the boolean field
            'user_id' => $user->id,
        ]);

        $conjoint->save();

        // Return a JSON response indicating success
        return response()->json(['message' => 'Conjoint created successfully', 'Parent' => $conjoint], 201);
    }
}
