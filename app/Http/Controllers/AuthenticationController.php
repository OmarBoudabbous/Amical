<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthenticationController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|max:255',
            'prenom' => 'required|max:255',
            'matricule' => 'required|string|min:8|unique:users',
            'cin' => 'required|string|min:8|unique:users',
            'gsm' => 'required|string|min:8',
            'adresse' => 'string|max:255',
            'date_naissance' => 'date',
            'fonction' => 'string|max:50|in:Ouvrier,Receveur,Chef gare,Chef district,Adjoint,Siége',
            'affectation' => 'string|max:50|in:A1,A3,A4',
            'etat_civil' => 'string|max:50|in:Marié,Célibataire,Divorcé,Veuve',
            'cotaannuellesubvention' => 'nullable|numeric', // Cotaannuellesubvention is optional and should be a numeric value if provided.
        ]);

        // Convert the date_naissance to the desired format (YYYY-MM-DD)
        $date_naissance = Carbon::createFromFormat('d-M-Y', $request->date_naissance)->format('Y-m-d');

        $user = User::create([
            'name' => $request->name,
            'matricule' => Hash::make($request->matricule),
            'cin' => $request->cin,
            'prenom' => $request->prenom,
            'date_naissance' => $date_naissance,
            'gsm' => $request->gsm,
            'adresse' => $request->adresse,
            'fonction' => $request->fonction,
            'affectation' => $request->affectation,
            'etat_civil' => $request->etat_civil,
            'cotaannuellesubvention' => $request->cotaannuellesubvention,
            // Add any other fields you want to save here
        ]);


        $token = $user->createToken('auth_token')->accessToken;
        $userData = $user->only(['id', 'name', 'cin', 'gsm', 'adresse', 'date_naissance', 'fonction', 'affectation', 'etat_civil', 'cotaannuellesubvention', 'etat_adhesion']);

        return response([
            'token' => $token,
            'user' => $userData,
        ]);
    }

    
    public function login(Request $request)
    {
        $request->validate([
            'cin' => 'required',
            'matricule' => 'required',
        ]);

        $user = User::where('cin', $request->cin)->first();

        if (!$user || $request->matricule !== $user->matricule) {
            return response([
                'message' => 'The provided credentials are incorrect'
            ], 401);
        }
    
        $token = $user->createToken('auth_token')->accessToken;
        // Exclude the 'matricule' field from the user data
        $userData = $user->only(['id', 'name', 'cin', 'gsm', 'adresse', 'date_naissance', 'fonction', 'affectation', 'etat_civil', 'cotaannuellesubvention', 'etat_adhesion','role']);

        return response([
            'token' => $token,
            'user' => $userData
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response([
            'message' => 'Logged out succ'
        ]);
    }
}
