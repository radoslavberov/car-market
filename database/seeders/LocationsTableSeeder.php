<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LocationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //creating seeder for locations
        $locations = [
        [
            'name' => 'София', 
            'active' => 1, 
            'created_at' => now(), 
            'updated_at' => now()
        ],
        [
            'name' => 'Пловдив', 
            'active' => 1, 
            'created_at' => now(), 
            'updated_at' => now()
        ],
        [
            'name' => 'Варна', 
            'active' => 1, 
            'created_at' => now(), 
            'updated_at' => now()
        ],
        [
            'name' => 'Бургас'
            , 'active' => 1, 
            'created_at' => now(), 
            'updated_at' => now()
        ],
        [
            'name' => 'Русе', 
            'active' => 1, 
            'created_at' => now(), 
            'updated_at' => now()
        ],
        [
            'name' => 'Стара Загора', 
            'active' => 1, 
            'created_at' => now(), 
            'updated_at' => now()
        ],
        [
            'name' => 'Плевен', 
            'active' => 1, 
            'created_at' => now(), 
            'updated_at' => now()
        ],
        [
            'name' => 'Сливен', 
            'active' => 1, 
            'created_at' => now(), 
            'updated_at' => now()
        ],
        [
            'name' => 'Добрич', 
            'active' => 1, 
            'created_at' => now(), 
            'updated_at' => now()
        ],
        [
            'name' => 'Шумен', 
            'active' => 1, 
            'created_at' => now(), 
            'updated_at' => now()
        ],
        [
            'name' => 'Габрово', 
            'active' => 1, 
            'created_at' => now(), 
            'updated_at' => now()
        ],
        [
            'name' => 'Айтос', 
            'active' => 1, 
            'created_at' => now(), 
            'updated_at' => now()
        ],
        [
            'name' => 'Банско', 
            'active' => 1, 
            'created_at' => now(), 
            'updated_at' => now()
        ],
        [
            'name' => 'Благоевград', 
            'active' => 1, 
            'created_at' => now(), 
            'updated_at' => now()
        ],
        [
            'name' => 'Видин', 
            'active' => 1, 
            'created_at' => now(), 
            'updated_at' => now()
        ],
        [
            'name' => 'Елена', 
            'active' => 1, 
            'created_at' => now(), 
            'updated_at' => now()
        ],
        [
            'name' => 'Казанлък', 
            'active' => 1, 
            'created_at' => now(), 
            'updated_at' => now()
        ],
        [
            'name' => 'Слънчев бряг', 
            'active' => 1, 
            'created_at' => now(), 
            'updated_at' => now()
        ],
        [
            'name' => 'Перник', 
            'active' => 1, 
            'created_at' => now(), 
            'updated_at' => now()
        ],
        [
            'name' => 'Разград', 
            'active' => 1, 
            'created_at' => now(), 
            'updated_at' => now()
        ],
        [
            'name' => 'Свищов', 
            'active' => 1, 
            'created_at' => now(), 
            'updated_at' => now()
        ],
        [
            'name' => 'Севлиево', 
            'active' => 1, 
            'created_at' => now(), 
            'updated_at' => now()
        ],
        [
            'name' => 'Трявна', 
            'active' => 1, 
            'created_at' => now(), 
            'updated_at' => now()
        ],
        ];
        foreach ($locations as $location) {
            DB::table('locations')->insertOrIgnore($location);
        }
    }
}
