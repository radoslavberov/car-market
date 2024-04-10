<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $seeders = [
            UsersTableSeeder::class,
            VehicleCategoriesTableSeeder::class,
            FuelsTableSeeder::class,
            VehicleBrandsTableSeeder::class,
            LocationsTableSeeder::class,
            TransmissionsTableSeeder::class,
            VehicleModelsSeeder::class,
            VehicleModelTypesSeeder::class,
//            AdvertisementSeeder::class
        ];
        $this->call($seeders);
    }
}
