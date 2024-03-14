<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
//        $analysisLimit = 10;
//        $monthlyAnalyses = $this->analysisCountThisMonth();
//        $analysisRemaining = $analysisLimit - ($monthlyAnalyses > 0 ? $monthlyAnalyses : 0);


        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'isAdmin' => $this->is_admin,
            'active' => $this->active,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'emailVerifiedAt' => $this->email_verified_at,
//            'monthlyAnalysisDone' => $monthlyAnalyses,
//            'analysisRemaining' => $analysisRemaining,
//            'analysisLimit' => $analysisLimit
        ];
    }
}
