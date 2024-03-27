<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\API\AdvertisementController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\API\CommentController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function () {

    Route::get('/dashboard-stats', [DashboardController::class, 'dashboard']);

    Route::post('/auth/change-password', [AuthController::class, 'changePassword']);
    Route::post('/auth/edit', [AuthController::class, 'editUser']);
    Route::get('/auth/me', [AuthController::class, 'getCurrentUser']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::prefix('advertisements')->controller(AdvertisementController::class)->group(function() {
        Route::get('/', 'index');
        Route::get('{advertisement}', 'show');
        Route::post('/store', 'store');
        Route::patch('{advertisement}', 'update');
        Route::delete('{advertisement}', 'destroy');
    });

    Route::post('advertisements/{advertisement}/comment', [CommentController::class, 'store']);
    Route::delete('/comment/{comment}', [CommentController::class, 'destroy']);
});



