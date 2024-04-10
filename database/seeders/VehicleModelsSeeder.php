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
        //adding seeders for car models
        $models = [
            [
                'id' => 1,
                'name' => 'S class',
                'vehicle_brand_id' => 1,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 2,
                'name' => 'E class',
                'vehicle_brand_id' => 1,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 3,
                'name' => 'C class',
                'vehicle_brand_id' => 1,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 4,
                'name' => 'GLS',
                'vehicle_brand_id' => 1,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 5,
                'name' => 'G class',
                'vehicle_brand_id' => 1,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 6,
                'name' => 'GLE',
                'vehicle_brand_id' => 1,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 7,
                'name' => 'GLC',
                'vehicle_brand_id' => 1,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 8,
                'name' => 'Q',
                'vehicle_brand_id' => 2,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 9,
                'name' => 'A',
                'vehicle_brand_id' => 2,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 10,
                'name' => 'S',
                'vehicle_brand_id' => 2,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 11,
                'name' => 'X',
                'vehicle_brand_id' => 3,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 12,
                'name' => '4 series',
                'vehicle_brand_id' => 3,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 13,
                'name' => '5 series',
                'vehicle_brand_id' => 3,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 14,
                'name' => '7 series',
                'vehicle_brand_id' => 3,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 15,
                'name' => 'Tundra',
                'vehicle_brand_id' => 4,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 16,
                'name' => 'Corolla',
                'vehicle_brand_id' => 4,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 17,
                'name' => 'Yaris',
                'vehicle_brand_id' => 4,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 18,
                'name' => 'C-HR',
                'vehicle_brand_id' => 4,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 19,
                'name' => 'Trackhawk',
                'vehicle_brand_id' => 5,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 20,
                'name' => 'Cherokee',
                'vehicle_brand_id' => 5,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 21,
                'name' => 'Wrangler',
                'vehicle_brand_id' => 5,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 22,
                'name' => 'Grand Cherokee',
                'vehicle_brand_id' => 5,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 23,
                'name' => 'Bravo',
                'vehicle_brand_id' => 6,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 24,
                'name' => '500',
                'vehicle_brand_id' => 6,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 25,
                'name' => 'Panda',
                'vehicle_brand_id' => 6,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 26,
                'name' => 'Punto',
                'vehicle_brand_id' => 6,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 27,
                'name' => 'Tipo',
                'vehicle_brand_id' => 6,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 28,
                'name' => 'Model S',
                'vehicle_brand_id' => 7,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 29,
                'name' => 'Model 3',
                'vehicle_brand_id' => 7,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 30,
                'name' => 'Model X',
                'vehicle_brand_id' => 7,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 31,
                'name' => 'Model Y',
                'vehicle_brand_id' => 7,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 32,
                'name' => 'Golf',
                'vehicle_brand_id' => 8,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 33,
                'name' => 'Passat',
                'vehicle_brand_id' => 8,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 34,
                'name' => 'Tiguan',
                'vehicle_brand_id' => 8,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 35,
                'name' => 'Jetta',
                'vehicle_brand_id' => 8,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 36,
                'name' => 'C',
                'vehicle_brand_id' => 9,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 37,
                'name' => 'Berlingo',
                'vehicle_brand_id' => 9,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 38,
                'name' => 'DS',
                'vehicle_brand_id' => 9,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 39,
                'name' => 'Jumpy',
                'vehicle_brand_id' => 9,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 40,
                'name' => 'Fiesta',
                'vehicle_brand_id' => 10,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 41,
                'name' => 'Focus',
                'vehicle_brand_id' => 10,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 42,
                'name' => 'Mustang',
                'vehicle_brand_id' => 10,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 43,
                'name' => 'Explorer',
                'vehicle_brand_id' => 10,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 44,
                'name' => 'Camaro',
                'vehicle_brand_id' => 11,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 45,
                'name' => 'Silverado',
                'vehicle_brand_id' => 11,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 46,
                'name' => 'Malibu',
                'vehicle_brand_id' => 11,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 47,
                'name' => 'Equinox',
                'vehicle_brand_id' => 11,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 48,
                'name' => 'Civic',
                'vehicle_brand_id' => 12,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 49,
                'name' => 'Accord',
                'vehicle_brand_id' => 12,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 50,
                'name' => 'CR-V',
                'vehicle_brand_id' => 12,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 51,
                'name' => 'Pilot',
                'vehicle_brand_id' => 12,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 52,
                'name' => 'Jazz',
                'vehicle_brand_id' => 12,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 53,
                'name' => 'Altima',
                'vehicle_brand_id' => 13,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 54,
                'name' => 'Maxima',
                'vehicle_brand_id' => 13,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 55,
                'name' => 'Rogue',
                'vehicle_brand_id' => 13,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 56,
                'name' => 'Sentra',
                'vehicle_brand_id' => 13,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 57,
                'name' => 'Elantra',
                'vehicle_brand_id' => 14,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 58,
                'name' => 'Sonata',
                'vehicle_brand_id' => 14,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 59,
                'name' => 'Tucson',
                'vehicle_brand_id' => 14,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 60,
                'name' => 'Santa Fe',
                'vehicle_brand_id' => 14,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 61,
                'name' => 'Sorento',
                'vehicle_brand_id' => 15,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 62,
                'name' => 'Sportage',
                'vehicle_brand_id' => 15,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 63,
                'name' => 'Optima',
                'vehicle_brand_id' => 15,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 64,
                'name' => 'Forte',
                'vehicle_brand_id' => 15,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 65,
                'name' => 'XC90',
                'vehicle_brand_id' => 16,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 66,
                'name' => 'XC60',
                'vehicle_brand_id' => 16,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 67,
                'name' => 'S90',
                'vehicle_brand_id' => 16,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 68,
                'name' => 'V60',
                'vehicle_brand_id' => 16,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 69,
                'name' => 'Outback',
                'vehicle_brand_id' => 17,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 70,
                'name' => 'Forester',
                'vehicle_brand_id' => 17,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 71,
                'name' => 'Impreza',
                'vehicle_brand_id' => 17,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 72,
                'name' => 'Legacy',
                'vehicle_brand_id' => 17,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 73,
                'name' => 'RX',
                'vehicle_brand_id' => 18,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 74,
                'name' => 'ES',
                'vehicle_brand_id' => 18,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 75,
                'name' => 'IS',
                'vehicle_brand_id' => 18,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 76,
                'name' => 'LS',
                'vehicle_brand_id' => 18,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 77,
                'name' => '911',
                'vehicle_brand_id' => 19,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 78,
                'name' => 'Cayenne',
                'vehicle_brand_id' => 19,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 79,
                'name' => 'Macan',
                'vehicle_brand_id' => 19,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 80,
                'name' => 'Panamera',
                'vehicle_brand_id' => 19,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 81,
                'name' => 'XE',
                'vehicle_brand_id' => 20,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 82,
                'name' => 'XF',
                'vehicle_brand_id' => 20,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 83,
                'name' => 'F-Type',
                'vehicle_brand_id' => 20,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 84,
                'name' => 'E-Pace',
                'vehicle_brand_id' => 20,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 85,
                'name' => '458',
                'vehicle_brand_id' => 21,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 86,
                'name' => 'Portofino',
                'vehicle_brand_id' => 21,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 87,
                'name' => 'F8 Tributo',
                'vehicle_brand_id' => 21,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 88,
                'name' => 'Roma',
                'vehicle_brand_id' => 21,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 89,
                'name' => '208',
                'vehicle_brand_id' => 22,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 90,
                'name' => '308',
                'vehicle_brand_id' => 22,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 91,
                'name' => '508',
                'vehicle_brand_id' => 22,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 92,
                'name' => '2008',
                'vehicle_brand_id' => 22,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 93,
                'name' => 'Clio',
                'vehicle_brand_id' => 23,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 94,
                'name' => 'Megane',
                'vehicle_brand_id' => 23,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 95,
                'name' => 'Kadjar',
                'vehicle_brand_id' => 23,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 96,
                'name' => 'Captur',
                'vehicle_brand_id' => 23,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 97,
                'name' => 'Mazda3',
                'vehicle_brand_id' => 24,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 98,
                'name' => 'Mazda6',
                'vehicle_brand_id' => 24,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 99,
                'name' => 'CX-5',
                'vehicle_brand_id' => 24,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 100,
                'name' => 'CX-9',
                'vehicle_brand_id' => 24,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 101,
                'name' => 'Charger',
                'vehicle_brand_id' => 25,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 102,
                'name' => 'Challenger',
                'vehicle_brand_id' => 25,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 103,
                'name' => 'Durango',
                'vehicle_brand_id' => 25,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 104,
                'name' => 'Journey',
                'vehicle_brand_id' => 25,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 105,
                'name' => 'Giulia',
                'vehicle_brand_id' => 26,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 106,
                'name' => 'Stelvio',
                'vehicle_brand_id' => 26,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 107,
                'name' => '4C',
                'vehicle_brand_id' => 26,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 108,
                'name' => 'Giulietta',
                'vehicle_brand_id' => 26,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 109,
                'name' => 'DB11',
                'vehicle_brand_id' => 27,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 110,
                'name' => 'Vantage',
                'vehicle_brand_id' => 27,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 111,
                'name' => 'DBS Superleggera',
                'vehicle_brand_id' => 27,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 112,
                'name' => 'DBX',
                'vehicle_brand_id' => 27,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 113,
                'name' => 'Continental GT',
                'vehicle_brand_id' => 28,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 114,
                'name' => 'Bentayga',
                'vehicle_brand_id' => 28,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 115,
                'name' => 'Flying Spur',
                'vehicle_brand_id' => 28,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 116,
                'name' => 'Mulsanne',
                'vehicle_brand_id' => 28,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 117,
                'name' => 'Hurracan',
                'vehicle_brand_id' => 29,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 118,
                'name' => 'Aventador',
                'vehicle_brand_id' => 29,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 119,
                'name' => 'Urus',
                'vehicle_brand_id' => 29,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 120,
                'name' => 'Phantom',
                'vehicle_brand_id' => 30,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 121,
                'name' => 'Ghost',
                'vehicle_brand_id' => 30,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 122,
                'name' => 'Wraith',
                'vehicle_brand_id' => 30,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 123,
                'name' => 'Octavia',
                'vehicle_brand_id' => 31,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 124,
                'name' => 'Superb',
                'vehicle_brand_id' => 31,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 125,
                'name' => 'Kodiaq',
                'vehicle_brand_id' => 31,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 126,
                'name' => 'Karoq',
                'vehicle_brand_id' => 31,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 127,
                'name' => 'Swift',
                'vehicle_brand_id' => 32,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 128,
                'name' => 'Vitara',
                'vehicle_brand_id' => 32,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 129,
                'name' => 'SX4 S-Cross',
                'vehicle_brand_id' => 32,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 130,
                'name' => 'Jimny',
                'vehicle_brand_id' => 32,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 131,
                'name' => 'Corsa',
                'vehicle_brand_id' => 33,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 132,
                'name' => 'Astra',
                'vehicle_brand_id' => 33,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 133,
                'name' => 'Insignia',
                'vehicle_brand_id' => 33,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 134,
                'name' => 'Mokka',
                'vehicle_brand_id' => 33,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 135,
                'name' => '1500',
                'vehicle_brand_id' => 34,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 136,
                'name' => '2500',
                'vehicle_brand_id' => 34,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 137,
                'name' => '3500',
                'vehicle_brand_id' => 34,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 138,
                'name' => 'Chassis Cab',
                'vehicle_brand_id' => 34,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 139,
                'name' => 'Cooper',
                'vehicle_brand_id' => 35,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 140,
                'name' => 'Countryman',
                'vehicle_brand_id' => 35,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 141,
                'name' => 'Ibiza',
                'vehicle_brand_id' => 36,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 142,
                'name' => 'Leon',
                'vehicle_brand_id' => 36,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 143,
                'name' => 'For two',
                'vehicle_brand_id' => 37,
                'active' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 144,
                'name' => 'For four',
                'vehicle_brand_id' => 37,
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
