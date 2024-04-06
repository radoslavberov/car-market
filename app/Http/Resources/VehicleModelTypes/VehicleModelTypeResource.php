<?php

namespace App\Http\Resources\VehicleModelTypes;

use App\Http\Resources\VehicleModels\VehicleModelResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VehicleModelTypeResource extends JsonResource
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
            'name' => $this->name,
            'active' => $this->active,
            'vehicleModel' => $this->whenLoaded('vehicleModel', new VehicleModelResource($this->vehicleModel)),
        ];
    }
}
