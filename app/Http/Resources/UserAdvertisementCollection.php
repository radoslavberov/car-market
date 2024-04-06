<?php

namespace App\Http\Resources;

use App\Http\Resources\Advertisement\AdvertisementResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class UserAdvertisementCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'data' => AdvertisementResource::collection($this->collection),
        ];
    }
}
