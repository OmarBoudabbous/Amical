<?php

namespace App\Http\Controllers;

use App\Models\Enfant;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnfantController extends Controller
{
    /**
     * Display a listing of the children for a specific user.
     */
    public function adminindex($userId)
    {
        $user = User::findOrFail($userId);
        $enfants = $user->enfants;

        // Return JSON response
        return response()->json(['enfants' => $enfants]);
    }

    /**
     * Store a newly created child record in storage for a specific user.
     */
    public function adminstore(Request $request, $userId)
    {
        $request->validate([
            'nom' => 'required|string',
            'scolarite' => 'required|string',
            'date_naissance' => 'required|date',
            'sexe' => 'required|in:fille,garçon',
        ]);

        $user = User::findOrFail($userId);

        $enfant = new Enfant([
            'nom' => $request->input('nom'),
            'scolarite' => $request->input('scolarite'),
            'date_naissance' => $request->input('date_naissance'),
            'sexe' => $request->input('sexe'),
        ]);
        $user->enfants()->save($enfant);

        // Return a JSON response indicating success
        return response()->json(['message' => 'Child created successfully'], 201);
    }


    public function index()
    {
        // Get the authenticated user
        $user = Auth::user();
        // Retrieve the authenticated user's children
        $enfants = $user->enfants;

        // Return JSON response
        return response()->json($enfants);
    }


    /**
     * Store a newly created child record in storage for the authenticated user.
     */
    public function store(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'nom' => 'required|string',
            'scolarite' => 'required|string',
            'date_naissance' => 'required|date',
            'sexe' => 'required|in:fille,garçon',
        ]);

        // Get the authenticated user
        $user = Auth::user();

        // Create a new "enfant" record associated with the authenticated user
        $enfant = new Enfant();
        $enfant->nom = $validatedData['nom'];
        $enfant->scolarite = $validatedData['scolarite'];
        $enfant->date_naissance = $validatedData['date_naissance'];
        $enfant->sexe = $validatedData['sexe'];
        $enfant->user_id = $user->id; // Assuming you have a parent_id field in your Enfant model
        $enfant->save();

        // Return a JSON response indicating success
        return response()->json(['message' => 'Enfant created successfully', 'enfant' => $enfant], 201);
    }

    public function update(Request $request, $id)
    {
        // Find the "enfant" by ID
        $enfant = Enfant::find($id);

        // Check if the "enfant" exists
        if (!$enfant) {
            return response()->json(['message' => 'Enfant not found'], 404);
        }

        // Validate the incoming request data for the fields you want to allow updating
        $validatedData = $request->validate([
            'nom' => 'string',
            'scolarite' => 'string',
            'date_naissance' => 'date',
            'sexe' => 'in:fille,garçon',
        ]);

        // Update the "enfant" attributes if they are provided in the request
        if ($request->has('nom')) {
            $enfant->nom = $validatedData['nom'];
        }

        if ($request->has('scolarite')) {
            $enfant->scolarite = $validatedData['scolarite'];
        }

        if ($request->has('date_naissance')) {
            $enfant->date_naissance = $validatedData['date_naissance'];
        }

        if ($request->has('sexe')) {
            $enfant->sexe = $validatedData['sexe'];
        }

        $enfant->save();

        // Return a JSON response indicating success
        return response()->json(['message' => 'Enfant updated successfully', 'enfant' => $enfant], 200);
    }


    public function destroy($id)
    {
        // Find the "enfant" by ID
        $enfant = Enfant::find($id);

        // Check if the "enfant" exists
        if (!$enfant) {
            return response()->json(['message' => 'Enfant not found'], 404);
        }

        // Delete the "enfant" record
        $enfant->delete();

        // Return a JSON response indicating success
        return response()->json(['message' => 'Enfant deleted successfully'], 200);
    }
}
