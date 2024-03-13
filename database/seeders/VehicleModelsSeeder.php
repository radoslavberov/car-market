<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VehicleModelsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $models = [
            [
                'name' => 'S class',
                'vehicle_brand_id' => 1,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'E class',
                'vehicle_brand_id' => 1,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Q',
                'vehicle_brand_id' => 2,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'A',
                'vehicle_brand_id' => 2,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => '5 series',
                'vehicle_brand_id' => 3,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'X series',
                'vehicle_brand_id' => 3,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Tundra',
                'vehicle_brand_id' => 4,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Corolla',
                'vehicle_brand_id' => 4,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Trackhawk',
                'vehicle_brand_id' => 5,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Cherokee',
                'vehicle_brand_id' => 5,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Bravo',
                'vehicle_brand_id' => 6,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Punto',
                'vehicle_brand_id' => 6,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Model 3',
                'vehicle_brand_id' => 7,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Model S',
                'vehicle_brand_id' => 7,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Golf',
                'vehicle_brand_id' => 8,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Polo',
                'vehicle_brand_id' => 8,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'C',
                'vehicle_brand_id' => 9,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'DS',
                'vehicle_brand_id' => 9,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
        ];
        foreach ($models as $model) {
            DB::table('vehicle_models')->insertOrIgnore($model);
        }
    }
}
