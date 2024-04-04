<?php

namespace App\Http\Resources\Advertisement;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class AdvertisementCollection extends ResourceCollection
{
    public function setPaginationData($currentPage, $total, $perPage)
    {
        $this->pagination = [
            'currentPage' => $currentPage,
            'from' => ($currentPage - 1) * $perPage + 1,
            'lastPage' => ceil($total / $perPage),
            'perPage' => $perPage,
            'to' => min($total, $currentPage * $perPage),
            'total' => $total,
        ];
    }
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */


    public function toArray(Request $request): array
    {
        return [
            'data' => AdvertisementResource::collection($this->collection),
            'meta' => $this->pagination,
        ];
    }
}
