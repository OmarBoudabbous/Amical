<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\HomePage;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $this->call(AdminSeeder::class);
         // Sample data to seed the HomePage model
         $data = [
            'h1' => 'Sample H1 Text',
            'h2' => 'Sample H2 Text',
            'p' => 'Sample Paragraph Text',
        ];

        // If you have a sample image to use, you can store it in the 'public' disk
        // and provide the image path.
        $sampleImagePath = 'storage/person.png';

        // Check if the sample image exists in the storage.
        if (Storage::disk('public')->exists($sampleImagePath)) {
            $data['image'] = $sampleImagePath;
        }

        // Insert the data into the database
        HomePage::create($data);
        
    }
}
