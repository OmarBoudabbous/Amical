<?php

namespace App\Http\Controllers;

use App\Models\Annonce;
use App\Models\Fornisseur;
use Illuminate\Http\Request;

class AnnonceController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'titre' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif', // Assuming you're uploading an image
            'fornisseurs_id' => 'required|exists:fornisseurs,id',
            'type_annonce' => 'required|string|max:50|in:mobileInternet,adsl,bonAchat,sport,engagementAchat,HotelBangalo',
        ]);

        $imageUrl = null; // Default image URL

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('annonce_images', 'public');
            $validatedData['image'] = $imagePath;

            // Generate the full image URL
            $imageUrl = url('storage/' . $imagePath);
        } else {

            // Use the default image URL when no image is uploaded
            $imageUrl = url('storage/image-non-disponible.jpg');
        }

        // Create the " MobileInternet" record
        $annonce = Annonce::create($validatedData);

        // Retrieve the associated fournisseur's name
        $fournisseurName = Fornisseur::find($validatedData['fornisseurs_id'])->nom;

        // Add fournisseur name to the response
        return response()->json([
            'message' => 'Annonce created successfully',
            'annonce' => $annonce,
            'image_url' => $imageUrl,
            'fournisseur_name' => $fournisseurName,
        ], 201);
    }



    public function update(Request $request, $id)
    {
        $annonce = Annonce::find($id);
        if (!$annonce) {
            return response()->json(['message' => 'annonce not found'], 404);
        }

        $request->validate([
            'titre' => 'sometimes|required|string',
            'image' => 'sometimes|image',
            'fornisseurs_id' => 'sometimes|required|numeric',
            'type_annonce' => 'required|string|max:50|in:mobileInternet,adsl,bonAchat,sport,engagementAchat,HotelBangalo',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('annonce_images', 'public');
            $annonce->image = $imagePath;
        }

        if ($request->has('titre')) {
            $annonce->titre = $request->input('titre');
        }

        if ($request->has('fornisseurs_id')) {
            $annonce->fornisseurs_id = $request->input('fornisseurs_id');
        }

        if ($request->has('type_annonce')) {
            $annonce->type_annonce = $request->input('type_annonce');
        }

        $annonce->save();

        return response()->json(['message' => 'annonce updated successfully', 'annonce' => $annonce]);
    }

    public function show($id)
    {
        $annonce = Annonce::with('fornisseur')->findOrFail($id);
        if ($annonce->image) {
            $annonce->image_url = url('storage/' . $annonce->image);
        } else {
            // If no image is set, you can provide a default image URL
            $annonce->image_url = url('storage/image-non-disponible.jpg');
        }
        return response()->json($annonce);
    }

    public function destroy($id)
    {
        $annonce = Annonce::findOrFail($id);
        $annonce->delete();
        return response()->json(['message' => 'Annonce deleted successfully']);
    }

    public function index()
    {
        $perPage = 5; // Nombre d'enregistrements par page (vous pouvez ajuster cela selon vos besoins)
        $annonces = Annonce::with('fornisseur') //il bin 9awsen function fi Annonce model 
            ->orderBy('created_at', 'desc')
            ->paginate($perPage); // Order by creation date in descending order

        // Iterate through the annonce and add the image URL to each one
        $annonces->transform(function ($annonce) {
            if ($annonce->image) {
                $annonce->image_url = url('storage/' . $annonce->image);
            } else {
                $annonce->image_url = url('storage/image-non-disponible.jpg');
            }

            // Include fournisseur name in the response
            $annonce->fornisseur_name = $annonce->fornisseur ? $annonce->fornisseur->nom : null;

            return $annonce;
        });
        return response()->json(['tous les annonces' => $annonces]);
    }

    public function indexByUrl(Request $request)
    {
        $perPage = 4; // Number of records per page (adjust to your needs)
        $type_annonce = $request->input('type_annonce'); // Get the type_annonce from the request

        // Query announcements, filtering by type_annonce
        $annonces = Annonce::with('fornisseur')
            ->where('type_annonce', $type_annonce)
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        // Iterate through the announcements and format the data
        $annonces->transform(function ($annonce) {
            if ($annonce->image) {
                $annonce->image_url = url('storage/' . $annonce->image);
            } else {
                $annonce->image_url = url('storage/image-non-disponible.jpg');
            }

            $annonce->fornisseur_name = $annonce->fornisseur ? $annonce->fornisseur->nom : null;

            return $annonce;
        });

        return response()->json(['tous les annonces' => $annonces]);
    }

   
}
