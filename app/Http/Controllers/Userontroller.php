<?php

namespace App\Http\Controllers;

use App\Models\Conjoint;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class Userontroller extends Controller
{

    public function index()
    {
        $users = User::orderBy('created_at', 'desc')->paginate(5); // Fetch 5 users per page and order by created_at

        return response()->json($users, 200);
    }


    public function store(Request $request)
    {
        // Validate user input
        $request->validate([
            'name' => 'required|max:255',
            'prenom' => 'required|max:255',
            'matricule' => 'required|string|min:8|unique:users',
            'cin' => 'required|string|min:8|unique:users',
            'gsm' => 'required|string|min:8',
            'adresse' => 'required|string|max:255',
            'date_naissance' => 'required|date',
            'fonction' => 'required|string|max:50|in:Ouvrier,Receveur,Chef gare,Chef district,Adjoint,Siége',
            'affectation' => 'required|string|max:50|in:A1,A3,A4',
            'etat_civil' => 'required|string|max:50|in:Marié,Célibataire,Divorcé,Veuve',
            'cotaannuellesubvention' => 'nullable|numeric',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Assuming you're uploading an image
        ]);

        try {
            // Handle image upload
            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('profile_image', 'public');
            } else {
                $imagePath = url('storage/user.png');
            }

            $date_naissance = Carbon::createFromFormat('Y-m-d', $request->date_naissance);
            if ($date_naissance === false) {
                // Handle the case where the date conversion fails
                return response()->json(['message' => 'Invalid date format'], 400);
            }

            // Create a new user
            $user = User::create([
                'name' => $request->input('name'),
                'prenom' => $request->input('prenom'),
                'matricule' => $request->input('matricule'), // Hash the matricule
                'cin' => $request->input('cin'),
                'gsm' => $request->input('gsm'),
                'adresse' => $request->input('adresse'),
                'date_naissance' => $date_naissance,
                'fonction' => $request->input('fonction'),
                'affectation' => $request->input('affectation'),
                'etat_civil' => $request->input('etat_civil'),
                'cotaannuellesubvention' => $request->input('cotaannuellesubvention'),
                'image' => $imagePath, // Assign the image path
                // Add any other fields you want to save here
            ]);
            // Return a JSON response with a success message
            return response()->json(['message' => 'User created successfully', 'user' => $user], 201);
        } catch (\Exception $e) {
            // Handle the exception and return an error response
            return response()->json(['message' => 'Failed to create user. ' . $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        $user = User::with(['enfants', 'activiteReservations', 'pereMeres', 'conjoint'])
            ->find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json($user, 200);
    }


    public function update(Request $request, $id)
    {
        try {
            // Find the user by ID
            $user = User::find($id);

            if (!$user) {
                return response()->json(['message' => 'User not found'], 404);
            }

            // Validate user input
            $request->validate([
                'name' => 'max:255',
                'prenom' => 'max:255',
                'matricule' => 'string|min:8|unique:users,matricule,' . $id,
                'cin' => 'string|min:8|unique:users,cin,' . $id,
                'gsm' => 'string|min:8',
                'adresse' => 'string|max:255',
                'date_naissance' => 'date',
                'fonction' => 'string|max:50|in:Ouvrier,Receveur,Chef gare,Chef district,Adjoint,Siége',
                'affectation' => 'string|max:50|in:A1,A3,A4',
                'etat_civil' => 'string|max:50|in:Marié,Célibataire,Divorcé,Veuve',
                'cotaannuellesubvention' => 'nullable|numeric',
            ]);

            // Define an array to track which fields were updated
            $updatedFields = [];

            // Update user attributes based on the provided fields
            if ($request->has('name') && $user->name !== $request->input('name')) {
                $user->name = $request->input('name');
                $updatedFields[] = 'name';
            }

            if ($request->has('prenom') && $user->prenom !== $request->input('prenom')) {
                $user->prenom = $request->input('prenom');
                $updatedFields[] = 'prenom';
            }

            if ($request->has('matricule') && $user->matricule !== $request->input('matricule')) {
                $user->matricule = $request->input('matricule');
                $updatedFields[] = 'matricule';
            }

            if ($request->has('cin') && $user->cin !== $request->input('cin')) {
                $user->cin = $request->input('cin');
                $updatedFields[] = 'cin';
            }

            if ($request->has('gsm') && $user->gsm !== $request->input('gsm')) {
                $user->gsm = $request->input('gsm');
                $updatedFields[] = 'gsm';
            }

            if ($request->has('adresse') && $user->adresse !== $request->input('adresse')) {
                $user->adresse = $request->input('adresse');
                $updatedFields[] = 'adresse';
            }

            if ($request->has('date_naissance') && $user->date_naissance !== $request->input('date_naissance')) {
                $user->date_naissance = $request->input('date_naissance');
                $updatedFields[] = 'date_naissance';
            }

            if ($request->has('fonction') && $user->fonction !== $request->input('fonction')) {
                $user->fonction = $request->input('fonction');
                $updatedFields[] = 'fonction';
            }

            if ($request->has('affectation') && $user->affectation !== $request->input('affectation')) {
                $user->affectation = $request->input('affectation');
                $updatedFields[] = 'affectation';
            }

            if ($request->has('etat_civil') && $user->etat_civil !== $request->input('etat_civil')) {
                $user->etat_civil = $request->input('etat_civil');
                $updatedFields[] = 'etat_civil';
            }

            if ($request->has('image') && $user->image !== $request->input('image')) {
                $user->image = $request->input('image');
                $updatedFields[] = 'image';
            }

            if ($request->has('cotaannuellesubvention')) {
                $user->cotaannuellesubvention = $request->input('cotaannuellesubvention');
            }
            // Save the updated user
            $user->save();

            // Create a message indicating which fields were updated
            $message = 'User updated successfully';
            if (!empty($updatedFields)) {
                $message .= ' Fields updated: ' . implode(', ', $updatedFields);
            }

            // Return a JSON response with the message
            return response()->json(['message' => $message, 'user' => $user], 200);
        } catch (\Exception $e) {
            // Handle the exception and return an error response
            return response()->json(['message' => 'Failed to update user. ' . $e->getMessage()], 500);
        }
    }



    public function destroy($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Delete the user
        $user->delete();

        // Return a JSON response with a success message
        return response()->json(['message' => 'User deleted successfully'], 200);
    }


    public function updateEtatAdhesion(Request $request, $id)
    {
        try {
            // Find the user by ID
            $user = User::find($id);

            if (!$user) {
                return response()->json(['message' => 'User not found'], 404);
            }

            // Validate and update the etat_adhesion field
            $request->validate([
                'etat_adhesion' => 'required|in:Actif,Inactif',
            ]);

            $user->etat_adhesion = $request->input('etat_adhesion');
            $user->save();

            // Return a JSON response with a success message
            return response()->json(['message' => 'Etat adhesion updated successfully', 'user' => $user], 200);
        } catch (\Exception $e) {
            // Handle the exception and return an error response
            return response()->json(['message' => 'Failed to update etat adhesion. ' . $e->getMessage()], 500);
        }
    }


    public function getAuthUser(Request $request)
    {
        // Use the `auth` middleware to authenticate the request based on the access token
        if ($request->user()) {
            // User is authenticated, return user data
            $user = $request->user(); // Get the authenticated user
            return response()->json([
                'id' => $user->id,
                'name' => $user->name,
                'prenom' => $user->prenom,
                'gsm' => $user->gsm,
                'matricule' => $user->matricule,
                'adresse' => $user->adresse,
                'fonction' => $user->fonction,
                'affectation' => $user->affectation,
                'date_naissance' => $user->date_naissance,
                'etat_adhesion' => $user->etat_adhesion,
                'etat_civil' => $user->etat_civil,
                'cin' => $user->cin,
                'cotaannuellesubvention' => $user->cotaannuellesubvention,
                'image' => $user->image,
                'role' => $user->role,
                // Add any other user data you want to return
            ]);
        } else {
            // User is not authenticated or token is invalid
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }

    public function getUserByConjointInfo($userId)
    {
        // Retrieve the user by their ID along with specified relationships
        $user = User::with('conjoint')->find($userId);
    
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
    
        // Check if the conjoint has adhèrent_lAmical = 1
        if ($user->conjoint && $user->conjoint->adhèrent_lAmical == 1) {
            // Retrieve the user by conjoint information
            $conjointInfo = $user->conjoint;
    
            $matchingUser = User::with(['conjoint'])
                ->where('name', $conjointInfo->nom)
                ->where('prenom', $conjointInfo->prenom)
                ->where('date_naissance', $conjointInfo->date_naissance)
                ->first();
    
            if ($matchingUser) {
                // Check if a conjoint record already exists for the matching user
                if (!$matchingUser->conjoint) {
                    // Create a new conjoint record for the matching user
                    $newConjoint = new Conjoint([
                        'nom' => $user->name,
                        'prenom' => $user->prenom,
                        'fonction' => $user->fonction, // You can set other fields as needed
                        'date_naissance' => $user->date_naissance,
                        'adhèrent_lAmical' => 1,
                        'user_id' => $matchingUser->id, // User ID of the matching user
                    ]);
    
                    // Save the new conjoint record
                    $newConjoint->save();
    
                    return response()->json($matchingUser, 200);
                } else {
                    return response()->json($matchingUser, 200);
                }
            } else {
                return response()->json(['message' => 'No matching user found'], 404);
            }
        } else {
            return response()->json(['message' => 'Conjoint is not eligible'], 404);
        }
    }
    
}
