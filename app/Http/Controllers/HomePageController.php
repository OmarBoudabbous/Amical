<?php

namespace App\Http\Controllers;

use App\Models\HomePage;
use Illuminate\Http\Request;

class HomePageController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'h1' => 'required|string',
            'h2' => 'required|string',
            'p' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif',
        ]);

        $imageUrl = null; // Default image URL

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('home_image', 'public');
            $validatedData['image'] = $imagePath;

            // Generate the full image URL
            $imageUrl = url('storage/' . $imagePath);
        } else {
            // Use the default image URL when no image is uploaded
            $imageUrl = url('storage/image-non-disponible.jpg');
        }
        $homeTable = HomePage::create($validatedData);
        return response()->json([
            'message' => 'creation avec succès',
            'homepage' => $homeTable,
            'image_url' => $imageUrl,
        ], 201);
    }


    public function index()
    {
        $dynamicContent = HomePage::latest()->first();
        if ($dynamicContent->image) {
            $dynamicContent->image_url = url('storage/' . $dynamicContent->image);
        } else {
            $dynamicContent->image_url = url('storage/person.png');
        }
        return response()->json($dynamicContent);
    }
}
