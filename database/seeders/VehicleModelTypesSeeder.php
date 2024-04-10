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
        //adding model types
        $models = [
            [
                'name' => 'S 250',
                'vehicle_model_id' => 1,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'S 300',
                'vehicle_model_id' => 1,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'S 350',
                'vehicle_model_id' => 1,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'S 400',
                'vehicle_model_id' => 1,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'S 450',
                'vehicle_model_id' => 1,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'S 500',
                'vehicle_model_id' => 1,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'S 550',
                'vehicle_model_id' => 1,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'S 55 AMG',
                'vehicle_model_id' => 1,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'S 63 AMG',
                'vehicle_model_id' => 1,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'S 65 AMG',
                'vehicle_model_id' => 1,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'E 200',
                'vehicle_model_id' => 2,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'E 220',
                'vehicle_model_id' => 2,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'E 300',
                'vehicle_model_id' => 2,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'E 320',
                'vehicle_model_id' => 2,
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
                'name' => 'E 400',
                'vehicle_model_id' => 2,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'E 450',
                'vehicle_model_id' => 2,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'E 500',
                'vehicle_model_id' => 2,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'E 550',
                'vehicle_model_id' => 2,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'E 53 AMG',
                'vehicle_model_id' => 2,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'E 63 AMG',
                'vehicle_model_id' => 2,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'C 200',
                'vehicle_model_id' => 3,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'C 220',
                'vehicle_model_id' => 3,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'C 250',
                'vehicle_model_id' => 3,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'C 300',
                'vehicle_model_id' => 3,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'C 320',
                'vehicle_model_id' => 3,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'C 350',
                'vehicle_model_id' => 3,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'C 400',
                'vehicle_model_id' => 3,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'C 43 AMG',
                'vehicle_model_id' => 3,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'C 55 AMG',
                'vehicle_model_id' => 3,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'C 63 AMG',
                'vehicle_model_id' => 3,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'GLS 350',
                'vehicle_model_id' => 4,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'GLS 400',
                'vehicle_model_id' => 4,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'GLS 450',
                'vehicle_model_id' => 4,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'GLS 500',
                'vehicle_model_id' => 4,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'GLS 600',
                'vehicle_model_id' => 4,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'GLS 63 AMG',
                'vehicle_model_id' => 4,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'G 500',
                'vehicle_model_id' => 5,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'G 63 AMG',
                'vehicle_model_id' => 5,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'G 800',
                'vehicle_model_id' => 5,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'GLE 250',
                'vehicle_model_id' => 6,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'GLE 300',
                'vehicle_model_id' => 6,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'GLE 350',
                'vehicle_model_id' => 6,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'GLE 400',
                'vehicle_model_id' => 6,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'GLE 450',
                'vehicle_model_id' => 6,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'GLE 500',
                'vehicle_model_id' => 6,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'GLE 53 AMG',
                'vehicle_model_id' => 6,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'GLE 63 AMG',
                'vehicle_model_id' => 6,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'GLC 200',
                'vehicle_model_id' => 7,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'GLC 250',
                'vehicle_model_id' => 7,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'GLC 300',
                'vehicle_model_id' => 7,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'GLC 350',
                'vehicle_model_id' => 7,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'GLC 400',
                'vehicle_model_id' => 7,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'GLC 53 AMG',
                'vehicle_model_id' => 7,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'GLC 63 AMG',
                'vehicle_model_id' => 7,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Q3',
                'vehicle_model_id' => 8,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Q5',
                'vehicle_model_id' => 8,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Q7',
                'vehicle_model_id' => 8,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Q8',
                'vehicle_model_id' => 8,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'A3',
                'vehicle_model_id' => 9,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'A4',
                'vehicle_model_id' => 9,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'A5',
                'vehicle_model_id' => 9,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'A6',
                'vehicle_model_id' => 9,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'A7',
                'vehicle_model_id' => 9,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'A8',
                'vehicle_model_id' => 9,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'S4',
                'vehicle_model_id' => 10,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'S5',
                'vehicle_model_id' => 10,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'S6',
                'vehicle_model_id' => 10,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'S7',
                'vehicle_model_id' => 10,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'S8',
                'vehicle_model_id' => 10,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => '425',
                'vehicle_model_id' => 12,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => '435',
                'vehicle_model_id' => 12,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => '440',
                'vehicle_model_id' => 12,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'M4',
                'vehicle_model_id' => 12,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => '525',
                'vehicle_model_id' => 13,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => '535',
                'vehicle_model_id' => 13,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => '550',
                'vehicle_model_id' => 13,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'M5',
                'vehicle_model_id' => 13,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => '750',
                'vehicle_model_id' => 14,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => '760',
                'vehicle_model_id' => 14,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'X1',
                'vehicle_model_id' => 11,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'X3',
                'vehicle_model_id' => 11,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'X4',
                'vehicle_model_id' => 11,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'X5',
                'vehicle_model_id' => 11,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'X6',
                'vehicle_model_id' => 11,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'X7',
                'vehicle_model_id' => 11,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Tundra Sport',
                'vehicle_model_id' => 15,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Corrola',
                'vehicle_model_id' => 15,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Yaris',
                'vehicle_model_id' => 15,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'C-HR',
                'vehicle_model_id' => 15,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'C2',
                'vehicle_model_id' => 37,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'C3',
                'vehicle_model_id' => 37,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'C4',
                'vehicle_model_id' => 37,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'C5',
                'vehicle_model_id' => 37,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'C8',
                'vehicle_model_id' => 37,
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
