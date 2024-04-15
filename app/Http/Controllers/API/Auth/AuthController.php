<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\ChangePasswordRequest;
use App\Http\Requests\EditUserRequest;
use App\Http\Resources\User\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    //Creatinng controller for login and register
    public function register(RegisterRequest $request)
    {
        # Check if user has accepted terms and conditions
        if (! $request->terms) {

            return response()->json(['message' => 'Please accept terms and conditions'], 400);
        }

        $user = User::create([
            'name' =>$request->name,
            'email' => $request->email,
            'phone_number' => $request->phone_number,
            'password' => $request->password,
            'is_admin' => 0,
            'active' => 1
        ]);

        $token = $user->createToken('authtoken')->plainTextToken;

        return response(
            [
                'user' => new UserResource($user),
                'token' => $token,
            ], 201);
    }

    public function login(LoginRequest $request)
    {
        $user = User::where('email', $request['email'])->first();

        abort_if($user?->active === 0, 401, 'Unauthorized');

        $userPassword = $user && Hash::check($request['password'], $user->password);

        if (!$user || !$userPassword) {
            return response()->json([
                'message' => 'Wrong credentials!'
            ], 401);
        }

        $token = $user->createToken('authtoken')->plainTextToken;

        return response(
            [
                'user' => new UserResource($user),
                'token' => $token,
            ], 201);
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();

        return response()->json(['message' => 'Logged out!']);
    }

    public function changePassword(ChangePasswordRequest $request)
    {
        if (!Hash::check($request->old_password, auth()->user()->getAuthPassword())) {
            return response()->json(['message' => 'Invalid old password'], 422);
        }

        auth()->user()->update([
            auth()->user()->password = Hash::make($request->password)
        ]);
        return response()->json(['message' => 'Password successfully updated'], 200);
    }

    public function getCurrentUser()
    {
        $user = auth()->user();
//            ->load('estatesAnalyses');
        return response([
            'data' => new UserResource($user),
        ]);
    }

    public function editUser(EditUserRequest $request)
    {
        auth()->user()->name = $request->name;
        auth()->user()->email = $request->email;
        auth()->user()->update();
        return response()->json(['message' => 'User details updated successfully']);
    }
}
