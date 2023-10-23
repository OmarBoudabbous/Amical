<?php

namespace App\Http\Controllers;

use App\Models\Fornisseur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FornisseurController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $perPage = 3; // Nombre d'enregistrements par page (vous pouvez ajuster cela selon vos besoins)
        $fournisseurs = Fornisseur::orderBy('created_at', 'desc')
            ->paginate($perPage);
        return response()->json(['fournisseurs' => $fournisseurs]);
    }

    public function all()
    {
        $fournisseurs = Fornisseur::all(); // Paginer les enregistrements "Fornisseur"
        return response()->json(['fournisseurs' => $fournisseurs]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the incoming data
        $validatedData = $request->validate([
            'nom' => 'required|string',
            'adresse' => 'required|string',
            'telephone' => 'required|string',
        ]);

        // Create a new Fournisseur instance
        $fournisseur = new Fornisseur;
        $fournisseur->nom = $validatedData['nom'];
        $fournisseur->adresse = $validatedData['adresse'];
        $fournisseur->telephone = $validatedData['telephone'];

        // Save the Fournisseur instance to the database
        $fournisseur->save();

        // Return a response indicating success
        return response()->json(['message' => 'Fournissuer creé avec succée'], 201);
    }


    public function show($id)
    {
        // Find the Fournisseur by ID
        $fournisseur = Fornisseur::find($id);

        // Check if the Fournisseur was found
        if (!$fournisseur) {
            return response()->json(['message' => 'Fournisseur not found'], 404);
        }

        // Return the Fournisseur data
        return response()->json($fournisseur);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Find the Fournisseur by ID
        $fournisseur = Fornisseur::findOrFail($id);
        if (!$fournisseur) {
            return response()->json(['message' => 'Convention not found'], 404);
        }

        // Validate and update the provided fields
        $request->validate([
            'nom' => 'string',
            'adresse' => 'string',
            'telephone' => 'string',
        ]);
        if ($request->has('nom')) {
            $fournisseur->nom = $request->input('nom');
        }
        if ($request->has('adresse')) {
            $fournisseur->adresse = $request->input('adresse');
        }
        if ($request->has('telephone')) {
            $fournisseur->telephone = $request->input('telephone');
        }
        // Save the updated Fournisseur instance to the database
        $fournisseur->save();
        // Return a response indicating success
        return response()->json(['message' => 'Fournisseur updated successfully', 'data' => $fournisseur]);
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Find the Fournisseur by ID
        $fournisseur = Fornisseur::findOrFail($id);

        // Delete the Fournisseur from the database
        $fournisseur->delete();

        // Return a response indicating success
        return response()->json(['message' => 'Fournisseur deleted successfully']);
    }
}
