<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class UserCollection extends ResourceCollection
{

    private $pagination;

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
        //dd($this);
        return [
            'rows' => $this->collection->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'isAdmin' => $user->is_admin,
                    'active' => $user->active,
                    'createdAt' => $user->created_at,
                    'updatedAt' => $user->updated_at,
                    'advertisementsDone' => $user->advertisementsCountThisMonth(),
                ];
            }),
            'meta' => $this->pagination,
        ];
    }
}
