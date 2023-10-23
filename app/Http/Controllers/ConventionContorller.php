<?php

namespace App\Http\Controllers;

use App\Models\Convention;
use App\Models\Fornisseur;
use Illuminate\Http\Request;

class ConventionContorller extends Controller
{
    public function index()
    {
        $perPage = 3; // Nombre d'enregistrements par page (vous pouvez ajuster cela selon vos besoins)
        $conventions = Convention::with('fornisseur')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage); // Order by creation date in descending order

        // Iterate through the conventions and add the image URL to each one
        $conventions->transform(function ($convention) {
            if ($convention->image) {
                $convention->image_url = url('storage/' . $convention->image);
            } else {
                $convention->image_url = url('storage/image-non-disponible.jpg');
            }

            // Include fournisseur name in the response
            $convention->fornisseur_name = $convention->fornisseur ? $convention->fornisseur->nom : null;

            return $convention;
        });

        return response()->json(['conventions' => $conventions]);
    }


    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'titre' => 'required|string|max:255',
            'description' => 'required|string',
            'prix_mois' => 'required|numeric',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Assuming you're uploading an image
            'date_fin' => 'nullable|string',
            'fornisseurs_id' => 'required|exists:fornisseurs,id',
        ]);

        $imageUrl = null; // Default image URL

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('convention_image', 'public');
            $validatedData['image'] = $imagePath;

            // Generate the full image URL
            $imageUrl = url('storage/' . $imagePath);
        } else {

            // Use the default image URL when no image is uploaded
            $imageUrl = url('storage/image-non-disponible.jpg');
        }

        // Create the "Convention" record
        $convention = Convention::create($validatedData);

        // Retrieve the associated fournisseur's name
        $fournisseurName = Fornisseur::find($validatedData['fornisseurs_id'])->nom;

        // Add fournisseur name to the response
        return response()->json([
            'message' => 'Convention created successfully',
            'convention' => $convention,
            'image_url' => $imageUrl,
            'fournisseur_name' => $fournisseurName,
        ], 201);
    }



    public function update(Request $request, $id)
    {
        $convention = Convention::find($id);
        if (!$convention) {
            return response()->json(['message' => 'Convention not found'], 404);
        }

        $request->validate([
            'titre' => 'sometimes|required|string',
            'description' => 'sometimes|required|string',
            'prix_mois' => 'sometimes|required|numeric',
            'image' => 'sometimes|image', // Add the image validation rule
            'date_fin' => 'sometimes|required|string',
            'fornisseurs_id' => 'sometimes|required|numeric',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('convention_images', 'public');
            $convention->image = $imagePath;
        }

        if ($request->has('titre')) {
            $convention->titre = $request->input('titre');
        }

        if ($request->has('description')) {
            $convention->description = $request->input('description');
        }

        if ($request->has('prix_mois')) {
            $convention->prix_mois = $request->input('prix_mois');
        }

        if ($request->has('date_fin')) {
            $convention->date_fin = $request->input('date_fin');
        }

        if ($request->has('fornisseurs_id')) {
            $convention->fornisseurs_id = $request->input('fornisseurs_id');
        }

        $convention->save();

        return response()->json(['message' => 'Convention updated successfully', 'convention' => $convention]);
    }

    public function show($id)
    {
        $convention = Convention::with('fornisseur')->findOrFail($id);
        if ($convention->image) {
            $convention->image_url = url('storage/' . $convention->image);
        } else {
            // If no image is set, you can provide a default image URL
            $convention->image_url = url('storage/image-non-disponible.jpg');
        }
        return response()->json($convention);
    }

    public function destroy($id)
    {
        $convention = Convention::findOrFail($id);
        $convention->delete();
        return response()->json(['message' => 'Convention deleted successfully']);
    }

    public function getConventionValid()
    {
        $perPage = 3;
        $currentDate = now(); // Get the current date and time

        $convention = Convention::where('date_fin', '>', $currentDate)
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
        // Transform the convention as needed, including the fournisseur name
        $convention->transform(function ($activite) {
            if ($activite->image) {
                $activite->image_url = url('storage/' . $activite->image);
            } else {
                $activite->image_url = url('storage/image-non-disponible.jpg');
            }
            return $activite;
        });

        return response()->json(['convention' => $convention]);
    }
}
