<?php

namespace App\Http\Resources\VehicleModels;

use App\Http\Resources\VehicleBrands\VehicleBrandResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VehicleModelResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'vehicleBrand' => $this->whenLoaded('vehicleBrand', new VehicleBrandResource($this->vehicleBrand)),
            'name' => $this->name,
            'active' => $this->active,
        ];
    }
}
