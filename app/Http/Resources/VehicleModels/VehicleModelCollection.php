<?php

namespace App\Http\Resources\VehicleModels;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class VehicleModelCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'data' => VehicleModelResource::collection($this->collection),
        ];
    }
}
