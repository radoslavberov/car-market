<?php

namespace App\Http\Resources\Advertisement;

use App\Http\Resources\CommentCollection;
use App\Http\Resources\FuelResource;
use App\Http\Resources\Location\LocationResource;
use App\Http\Resources\TransmissionResource;
use App\Http\Resources\User\UserResource;
use App\Http\Resources\VehicleBrands\VehicleBrandResource;
use App\Http\Resources\VehicleCategoryResource;
use App\Http\Resources\VehicleModels\VehicleModelResource;
use App\Http\Resources\VehicleModelTypes\VehicleModelTypeResource;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

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
            'transmission'      => $this->whenLoaded('transmission', new TransmissionResource($this->transmission)),
            'comments'          => $this->whenLoaded('comments', function () {
                return $this->comments->map(function ($comment) {
                    return [
                        'user'              => new UserResource($comment->user),
                        'description'       => $comment->description,
                        'advertisement_id'  => $comment->advertisement_id,
                        'createdAt'         => Carbon::parse($comment->created_at)->format('d/m/y H:i')
                    ];
                });
            }),
            'images'            => $this->whenLoaded('images', function () {
                return $this->images->map(function ($image) {
                    return [
                        'title'             => $image->title,
                        'path'              => Storage::url($image->path),
                        'advertisement_id'  => $image->advertisement_id,
                        'createdAt'         => Carbon::parse($image->created_at)->format('d/m/y H:i')
                    ];
                });
            }),
        ];
    }
}
