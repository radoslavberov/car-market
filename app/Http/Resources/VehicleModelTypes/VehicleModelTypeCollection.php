<?php

namespace App\Http\Resources\VehicleModelTypes;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class VehicleModelTypeCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'data' => VehicleModelTypeResource::collection($this->collection),
        ];
    }
}
