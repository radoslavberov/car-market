<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FuelsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //creating seeders for fuels
        $fuels = [
            [
                'name' => 'Бензинов',
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Дизелов',
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Хибриден',
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Електрически',
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Plug-in хибрид',
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
        ];
        foreach ($fuels as $fuel) {
            DB::table('fuels')->insertOrIgnore($fuel);
        }
    }
}
