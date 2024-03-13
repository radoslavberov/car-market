<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VehicleModelTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $models = [
            [
                'name' => 'S 63',
                'vehicle_model_id' => 1,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'E 350',
                'vehicle_model_id' => 2,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Q 7',
                'vehicle_model_id' => 3,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'A 7',
                'vehicle_model_id' => 4,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => '535',
                'vehicle_model_id' => 5,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'X 5',
                'vehicle_model_id' => 6,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'XK 50',
                'vehicle_model_id' => 7,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Verso',
                'vehicle_model_id' => 8,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'SRT',
                'vehicle_model_id' => 9,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'XJ',
                'vehicle_model_id' => 10,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Sport',
                'vehicle_model_id' => 11,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Grande',
                'vehicle_model_id' => 12,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Long Range',
                'vehicle_model_id' => 13,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Plaid',
                'vehicle_model_id' => 14,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => '5',
                'vehicle_model_id' => 15,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => '4',
                'vehicle_model_id' => 16,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => '4',
                'vehicle_model_id' => 17,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => '5',
                'vehicle_model_id' => 18,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
        ];
        foreach ($models as $model) {
            DB::table('vehicle_model_types')->insertOrIgnore($model);
        }
    }
}
