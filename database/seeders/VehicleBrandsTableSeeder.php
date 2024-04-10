<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VehicleBrandsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //Creating seeder for CarBrands
        $brands = [
            [
                'id' => 1,
                 'name' => 'Mercedes',
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 2,
                'name' => 'Audi',
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 3,
                'name' => 'BMW',
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 4,
                'name' => 'Toyota',
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 5,
                'name' => 'Jeep',
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 6,
                'name' => 'Fiat',
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 7,
                'name' => 'Tesla',
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 8,
                'name' => 'Volkswagen',
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 9,
                'name' => 'Citroen',
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 10,
                'name' => 'Ford',
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 11,
                'name' => 'Chevrolet',
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 12,
                'name' => 'Honda',
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 13,
                'name' => 'Nissan',
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 14,
                'name' => 'Hyundai',
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 15,
                'name' => 'Kia',
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 16,
                'name' => 'Volvo',
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 17,
                'name' => 'Subaru',
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 18,
                'name' => 'Lexus',
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 19,
                'name' => 'Porsche',
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 20,
                'name' => 'Jaguar',
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 21,
                'name' => 'Ferrari',
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 22,
                'name' => 'Peugeot',
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 23,
                'name' => 'Renault',
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 24,
                'name' => 'Mazda',
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 25,
                'name' => 'Dodge',
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 26,
                'name' => 'Alfa Romeo',
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 27,
                'name' => 'Aston Martin',
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 28,
                'name' => 'Bentley',
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 29,
                'name' => 'Lamborghini',
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 30,
                'name' => 'Rolls-Royce',
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 31,
                'name' => 'Skoda',
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 32,
                'name' => 'Suzuki',
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 33,
                'name' => 'Opel',
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 34,
                'name' => 'Ram',
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 35,
                'name' => 'MINI',
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 36,
                'name' => 'Seat',
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 37,
                'name' => 'Smart',
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],

        ];
        foreach ($brands as $brand) {
            DB::table('vehicle_brands')->insertOrIgnore($brand);
        }
    }
}
