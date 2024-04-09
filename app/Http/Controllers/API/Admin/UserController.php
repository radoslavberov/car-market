<?php

namespace App\Http\Controllers\API\Admin;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Http\Resources\User\UserResource;
use App\Http\Resources\Admin\UserCollection;
use App\Http\Requests\Admin\UserRequest;

class UserController extends Controller
{
    public function index(UserRequest $request) {
        # Default and maximum number of items per page
        $defaultLimit = 20;
        $maxLimit = 50;

        # Get query parameters
        $sortBy = $request->query('sortBy', 'default');
        $sortDirection = $request->query('sort', 'desc');
        $page = $request->query('page', 1);
        $limit = $request->query('limit', $defaultLimit) > $maxLimit ? $defaultLimit : $request->query('limit', $defaultLimit);

        # Sort mapping for the query
        $sortMapping = [
            'advertisementsCount'   => 'advertisements_count',
            'admin'                 => 'is_admin',
            'active'                => 'active',
            'name'                  => 'name',
            'email'                 => 'email',
            'default'               => 'created_at'
        ];

        $usersQuery = User::withCount('advertisements')

        # Filter query by parameters
            ->when($request->admin === '1', function ($query) {
                return $query->where('users.is_admin', true);
            })
            ->when($request->admin === '0', function ($query) {
                return $query->where('users.is_admin', false);
            })
            ->when($request->active === '1', function($query) {
                return $query->where('users.active', true);
            })
            ->when($request->active === '0', function($query) {
                return $query->where('users.active', false);
            })
            ->when($request->search, function ($query, $search) {
                return $query->where(function ($innerQuery) use ($search) {
                    $innerQuery->where('users.name', 'like', "%{$search}%")
                                ->orWhere('users.email', 'like', "%{$search}%");
                });
            })
            ->orderBy($sortMapping[$sortBy], $sortDirection);

        # Apply limit and offset
        $total = $usersQuery->count();
        $offset = ($page - 1) * $limit;
        $users = $usersQuery->offset($offset)->limit($limit)->get();

        #Create a resource with pagination data
        $usersCollection = new UserCollection($users);
        $usersCollection->setPaginationData($page, $total, $limit);

        return $usersCollection;
    }

    public function deactivate(User $user) {

        $user->toggleActive();

        if (! $user->active) $user->tokens()->delete();

        return response(
            ['data' => new UserResource($user)], 201
        );
    }
}
