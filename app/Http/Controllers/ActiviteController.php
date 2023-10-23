<?php

namespace App\Http\Controllers;

use App\Models\Activite;
use App\Models\Fornisseur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ActiviteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $perPage = 3;
        $activites = Activite::with('fornisseur') // Eager load the fournisseur relationship
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        // Transform the activites as needed, including the fournisseur name
        $activites->transform(function ($activite) {
            if ($activite->image) {
                $activite->image_url = url('storage/' . $activite->image);
            } else {
                $activite->image_url = url('storage/image-non-disponible.jpg');
            }

            // Include fournisseur name in the response
            $activite->fornisseur_name = $activite->fornisseur ? $activite->fornisseur->nom : null;

            return $activite;
        });

        return response()->json(['activites' => $activites]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'finActivity' => 'required|string',
            'subvention' => 'required|numeric',
            'prix' => 'required|numeric',
            'nombreDePlace' => 'nullable|integer',
            'placesDisponibles' => 'nullable|integer',
            'placesReservees' => 'nullable|integer', // Change to nullable|integer if needed
            'description' => 'required|string',
            'titre' => 'required|string',
            'type' => 'required|in:sociale,loisire,sportive',
            'fornisseurs_id' => 'required|exists:fornisseurs,id',
            'user_id' => 'nullable|exists:users,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $imageUrl = null; // Default image URL

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('activite_image', 'public');
            $validatedData['image'] = $imagePath;

            // Generate the full image URL
            $imageUrl = url('storage/' . $imagePath);
        } else {
            // Use the default image URL when no image is uploaded
            $imageUrl = url('storage/image-non-disponible.jpg');
        }


        // Create the "Activite" record
        $activite = Activite::create($validatedData);

        // Retrieve the associated fournisseur's name
        $fournisseurName = Fornisseur::find($validatedData['fornisseurs_id'])->nom;

        // Add fournisseur name to the response
        return response()->json([
            'message' => 'Activite created successfully',
            'activite' => $activite,
            'image_url' => $imageUrl,
            'fournisseur_name' => $fournisseurName,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $activite = Activite::with('fornisseur')->findOrFail($id);

        // Format the created_at date as 'Y-m-d' (YYYY-MM-DD)
        $activite->created_at_formatted = $activite->created_at->format('Y-m-d');

        // Calculate the current time
        $currentTime = now();

        // Calculate the time difference in minutes between created_at and the current time
        $createdTimestamp = strtotime($activite->created_at);
        $currentTimestamp = strtotime($currentTime);
        $timeDifferenceMinutes = ceil(($currentTimestamp - $createdTimestamp) / 60);

        // Calculate hours and remaining minutes
        $hours = floor($timeDifferenceMinutes / 60);
        $minutes = $timeDifferenceMinutes % 60;

        // Format the time difference
        $formattedTimeDifference = ($hours > 0 ? $hours . ' heure' . ($hours > 1 ? 's' : '') : '') .
            ($minutes > 0 ? ' ' . $minutes . ' minute' . ($minutes > 1 ? 's' : '') : '');

        // Add the formatted time difference to the response data
        $activite->time_difference = $formattedTimeDifference;

        // Generate the image URL
        if ($activite->image) {
            $activite->image_url = url('storage/' . $activite->image);
        } else {
            // If no image is set, you can provide a default image URL
            $activite->image_url = url('storage/image-non-disponible.jpg');
        }

        return response()->json($activite);
    }





    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $activite = Activite::find($id);

        if (!$activite) {
            return response()->json(['message' => 'Activite not found'], 404);
        }

        $request->validate([
            'finActivity' => 'sometimes|required|string',
            'fornisseurs_id' => 'sometimes|required|numeric',
            'subvention' => 'sometimes|required|numeric',
            'prix' => 'sometimes|required|numeric',
            'nombreDePlace' => 'sometimes|required|integer',
            'description' => 'sometimes|required|string',
            'titre' => 'sometimes|required|string',
            'type' => 'sometimes|required|in:sociale,loisire,sportive',
            // Add validation rules for any other fields you want to allow updating
        ]);

        // Update the activite attributes based on the provided fields
        if ($request->has('titre')) {
            $activite->titre = $request->input('titre');
        }

        if ($request->has('fornisseurs_id')) {
            $activite->fornisseurs_id = $request->input('fornisseurs_id');
        }
        if ($request->has('type')) {
            $activite->type = $request->input('type');
        }
        if ($request->has('description')) {
            $activite->description = $request->input('description');
        }
        if ($request->has('nombreDePlace')) {
            $activite->nombreDePlace = $request->input('nombreDePlace');
        }
        if ($request->has('subvention')) {
            $activite->subvention = $request->input('subvention');
        }
        if ($request->has('finActivity')) {
            $activite->finActivity = $request->input('finActivity');
        }

        if ($request->has('prix')) {
            $activite->prix = $request->input('prix');
        }
        // Save the activite model to persist the changes
        $activite->save();

        return response()->json(['message' => 'Activite updated successfully', 'activite' => $activite], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $activite = Activite::findOrFail($id);
        $activite->delete();
        return response()->json(['message' => 'Activite deleted successfully']);
    }

    /**
     * Update ACtivite Image.
     */

    public function activityUpdateImage(Request $request, $id)
    {
        $activite = Activite::find($id);

        if (!$activite) {
            return response()->json(['message' => 'Activite not found'], 404);
        }

        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Adjust validation rules as needed
        ]);

        // Handle the image upload
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('activite_image', 'public');
            $activite->image = $imagePath;
        }

        // Save the activite model to persist the changes
        $activite->save();

        // Generate the full image URL
        $imageUrl = url('storage/' . $activite->image);

        return response()->json(['message' => 'Activite image updated successfully', 'image_url' => $imageUrl], 200);
    }

    public function getActivitesValid()
    {
        $perPage = 3;
        $currentDate = now(); // Get the current date and time

        $activites = Activite::where('finActivity', '>', $currentDate)
            ->where('placesReservees', '<', DB::raw('nombreDePlace'))
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
        // Transform the activites as needed, including the fournisseur name
        $activites->transform(function ($activite) {
            if ($activite->image) {
                $activite->image_url = url('storage/' . $activite->image);
            } else {
                $activite->image_url = url('storage/image-non-disponible.jpg');
            }
            return $activite;
        });

        return response()->json(['activites' => $activites]);
    }
}
