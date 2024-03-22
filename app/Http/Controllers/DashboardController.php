<?php

namespace App\Http\Controllers;

use App\Http\Resources\DashboardResource;
use App\Models\Advertisement;
use App\Models\Location;
use App\Models\VehicleBrand;
use Carbon\Carbon;
use Database\Seeders\AdvertisementSeeder;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function dashboard()
    {
        # Build the dashboard data by calling separate functions for each metric
        $data = [
            'total' => [
                'advertisements' => Advertisement::count(),
                'locations' => Location::count(),
                'brands' => VehicleBrand::count(),
                'getTodayAdvertisements' => $this->getTodayAdvertisements()
            ],
            'getAveragePriceByBrand' => $this->getAveragePriceByBrand(),
            'advertisementsCountByCategory' => $this->advertisementsCountByCategory(),
            'advertisementsCountLastWeek' => $this->advertisementsCountLastWeek(),
        ];

        # Return the dashboard data in a formatted resource
        return new DashboardResource($data);
    }

    # Retrieve average price per square meter grouped by location and provider
    private function getAveragePriceByBrand()
    {
        return Advertisement::with('vehicleBrand:id,name')
            ->selectRaw('AVG(price) as price, vehicle_brand_id')
            ->groupBy( 'vehicle_brand_id')
            ->orderByDesc('price')
            ->limit(5)
            ->get()
            ->map(function ($item) {
                return [
                    'price' => $item->price ?: 0,
                    'vehicleBrand' => optional($item->vehicleBrand)->name,
                ];
            });
    }

    # Retrieve estate count by type, considering only active records
    private function advertisementsCountByCategory()
    {
        return Advertisement::
//        where('active', 1)
            with(['vehicleCategory:id,name'])
            ->selectRaw('COUNT(id) as count, vehicle_category_id')
            ->groupBy('vehicle_category_id')
            ->get()
            ->map(function ($item) {
                return [
                    'count' => $item->count ?: 0,
                    'name' => optional($item->vehicleCategory)->name,
                ];
            });
    }

    # Retrieve estate count for the last week, considering only active records
    private function advertisementsCountLastWeek()
    {
        return Advertisement::
//        where->('active', 1)
            where('created_at', '>=', now()->subDays(7))
            ->selectRaw('DATE(created_at) as date, COUNT(id) as count')
            ->groupBy('date')
            ->orderBy('date', 'ASC')
            ->get()
            ->map(function ($item) {
                return [
                    'date' => $item->date,
                    'count' => $item->count ?: 0,
                ];
            });
    }

    private function getTodayAdvertisements()
    {
        return Advertisement::whereDate('created_at', Carbon::today())->count();
    }

}
