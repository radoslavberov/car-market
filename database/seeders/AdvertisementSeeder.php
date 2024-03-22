<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AdvertisementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $advertisements = [
            [
                'name' => 'Example Advertisement 1',
                'price' => 25000.00,
                'color' => 'Red',
                'year' => 2020,
                'mileage' => 10000,
                'horse_power' => 150,
                'engine_capacity' => 2000,
                'description' => 'Detailed description of the vehicle.',
                'user_id' => 1, // Ensure this ID exists in your users table
                'location_id' => 1, // Ensure this ID exists in your locations table
                'vehicle_brand_id' => 1, // Assuming 1 is the ID for Mercedes
                'vehicle_model_id' => 2, // ID for Mercedes E Class, ensure it exists and is correct
                'vehicle_model_type_id' => 2, // Ensure this ID is correct for the E Class model type
                'vehicle_category_id' => 4, // Ensure this ID exists in your vehicle_categories table
                'fuel_id' => 1, // Ensure this ID exists in your fuels table
                'transmission_id' => 1, // Ensure this ID exists in your transmissions table
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Example Advertisement 2',
                'price' => 2500.00,
                'color' => 'Blue',
                'year' => 2021,
                'mileage' => 10000,
                'horse_power' => 150,
                'engine_capacity' => 2000,
                'description' => 'Detailed description of the vehicle.',
                'user_id' => 1, // Ensure this ID exists in your users table
                'location_id' => 2, // Ensure this ID exists in your locations table
                'vehicle_brand_id' => 3, // Assuming 1 is the ID for Mercedes
                'vehicle_model_id' => 5, // ID for Mercedes E Class, ensure it exists and is correct
                'vehicle_model_type_id' => 5, // Ensure this ID is correct for the E Class model type
                'vehicle_category_id' => 8, // Ensure this ID exists in your vehicle_categories table
                'fuel_id' => 1, // Ensure this ID exists in your fuels table
                'transmission_id' => 1, // Ensure this ID exists in your transmissions table
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Example Advertisement 3',
                'price' => 3500.00,
                'color' => 'Blue',
                'year' => 2001,
                'mileage' => 10000,
                'horse_power' => 150,
                'engine_capacity' => 2000,
                'description' => 'Detailed description of the vehicle.',
                'user_id' => 1, // Ensure this ID exists in your users table
                'location_id' => 2, // Ensure this ID exists in your locations table
                'vehicle_brand_id' => 4, // Assuming 1 is the ID for Mercedes
                'vehicle_model_id' => 8, // ID for Mercedes E Class, ensure it exists and is correct
                'vehicle_model_type_id' => 8, // Ensure this ID is correct for the E Class model type
                'vehicle_category_id' => 2, // Ensure this ID exists in your vehicle_categories table
                'fuel_id' => 1, // Ensure this ID exists in your fuels table
                'transmission_id' => 1, // Ensure this ID exists in your transmissions table
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Example Advertisement 4',
                'price' => 4500.00,
                'color' => 'White',
                'year' => 2001,
                'mileage' => 10000,
                'horse_power' => 150,
                'engine_capacity' => 2000,
                'description' => 'Detailed description of the vehicle.',
                'user_id' => 1, // Ensure this ID exists in your users table
                'location_id' => 2, // Ensure this ID exists in your locations table
                'vehicle_brand_id' => 2, // Assuming 1 is the ID for Mercedes
                'vehicle_model_id' => 3, // ID for Mercedes E Class, ensure it exists and is correct
                'vehicle_model_type_id' => 3, // Ensure this ID is correct for the E Class model type
                'vehicle_category_id' => 1, // Ensure this ID exists in your vehicle_categories table
                'fuel_id' => 1, // Ensure this ID exists in your fuels table
                'transmission_id' => 2, // Ensure this ID exists in your transmissions table
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ];

        foreach ($advertisements as $advertisement) {
            DB::table('advertisements')->insertOrIgnore($advertisement);
        }
    }
}
