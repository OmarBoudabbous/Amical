<?php

namespace App\Http\Controllers;

use App\Models\PereMere;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PereMereController extends Controller
{
    public function index()
    {
        // Get the authenticated user
        $user = Auth::user();
        // Retrieve the authenticated user's parent
        $peremeres = $user->peremeres;

        // Return JSON response
        return response()->json([
            'id'=>$peremeres->id,
            'date_naissance_mere' => $peremeres->date_naissance_mere,
            'date_naissance_pere' => $peremeres->date_naissance_pere,
            'nom_pere' => $peremeres->nom_pere,
            'prenom_pere' => $peremeres->prenom_pere,
            'nom_mere' => $peremeres->nom_mere,
            'prenom_mere' => $peremeres->prenom_mere,
        ]);
    }

    /* add a parent */
    public function store(Request $request)
    {
        // Get the authenticated user
        $user = Auth::user();

        // Check if a "pere mere" record already exists for the user
        $existingPereMere = PereMere::where('user_id', $user->id)->first();

        if ($existingPereMere) {
            // If a record exists, return an error response
            return response()->json(['message' => 'A "pere mere" record already exists for this user. You cannot add a new one.'], 400);
        }

        // If no record exists, create a new one
        $validatedData = $request->validate([
            'nom_pere' => 'required|string',
            'nom_mere' => 'required|string',
            'prenom_pere' => 'required|string',
            'prenom_mere' => 'required|string',
            'date_naissance_pere' => 'required|date',
            'date_naissance_mere' => 'required|date',
        ]);

        $peremeres = new PereMere();
        $peremeres->nom_pere = $validatedData['nom_pere'];
        $peremeres->nom_mere = $validatedData['nom_mere'];
        $peremeres->prenom_pere = $validatedData['prenom_pere'];
        $peremeres->prenom_mere = $validatedData['prenom_mere'];
        $peremeres->date_naissance_pere = $validatedData['date_naissance_pere'];
        $peremeres->date_naissance_mere = $validatedData['date_naissance_mere'];

        $peremeres->user_id = $user->id;
        $peremeres->save();

        // Return a JSON response indicating success
        return response()->json(['message' => 'Parent created successfully', 'Parent' => $peremeres], 201);
    }
}
