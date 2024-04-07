<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TransmissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //creating seeder for transmission
        $transmission = [
            [
                'name' => 'Ръчна', 
                'active' => 1, 
                'created_at' => now(), 
                'updated_at' => now()
            ],
            [
                'name' => 'Автоматична', 
                'active' => 1, 
                'created_at' => now(), 
                'updated_at' => now()
            ],
            [
                'name' => 'Полуавтоматична', 
                'active' => 1, 
                'created_at' => now(), 
                'updated_at' => now()
            ],
        ];
        foreach ($transmission as $transmissions) {
            DB::table('transmissions')->insertOrIgnore($transmissions);
        }
    }
}
