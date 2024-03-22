<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DashboardResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        $data = $this->resource;
        return [
            'total' => [
                'advertisements' => $data['total']['advertisements'],
                'brands' => $data['total']['brands'],
                'locations' => $data['total']['locations'],
                'getTodayAdvertisements' => $data['total']['getTodayAdvertisements']
            ],
            'getAveragePriceByBrand' => $data['getAveragePriceByBrand']->map(function ($item) {
                return [
                    'price' => $item['price'],
                    'vehicleBrand' => $item['vehicleBrand'],
                ];
            }),
            'advertisementsCountByCategory' => $data['advertisementsCountByCategory']->map(function ($item) {
                return [
                    'count' => $item['count'],
                    'name' =>  $item['name'] ?? null,
                ];
            }),
            'advertisementsCountLastWeek' => $data['advertisementsCountLastWeek']->map(function ($item) {
                return [
                    'count' => $item['count'],
                    'date' => $item['date']
                ];
            })
        ];
    }

}
