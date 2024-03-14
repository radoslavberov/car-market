<?php

namespace App\Http\Resources\Advertisement;

use App\Http\Resources\FuelResource;
use App\Http\Resources\LocationResource;
use App\Http\Resources\User\UserResource;
use App\Http\Resources\VehicleBrandResource;
use App\Http\Resources\VehicleCategoryResource;
use App\Http\Resources\VehicleModelResource;
use App\Http\Resources\VehicleModelTypeResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdvertisementResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'                => $this->id,
            'name'              => $this->name,
            'price'             => $this->price,
            'color'             => $this->color,
            'year'              => $this->year,
            'mileage'           => $this->mileage,
            'horsePower'        => $this->horse_power,
            'engine_capacity'   => $this->horse_power,
            'description'       => $this->description,
            'user'              => $this->whenLoaded('user', new UserResource($this->user)),
            'location'          => $this->whenLoaded('location', new LocationResource($this->location)),
            'vehicleBrand'      => $this->whenLoaded('vehicleBrand', new VehicleBrandResource($this->vehicleBrand)),
            'vehicleModel'      => $this->whenLoaded('vehicleModel', new VehicleModelResource($this->vehicleModel)),
            'vehicleModelType'  => $this->whenLoaded('vehicleModelType', new VehicleModelTypeResource($this->vehicleModelType)),
            'vehicleCategory'   => $this->whenLoaded('vehicleCategory', new VehicleCategoryResource($this->vehicleCategory)),
            'fuel'              => $this->whenLoaded('fuel', new FuelResource($this->fuel)),
            'transmission'      => $this->whenLoaded('transmission', new FuelResource($this->transmission)),
        ];
    }
}
