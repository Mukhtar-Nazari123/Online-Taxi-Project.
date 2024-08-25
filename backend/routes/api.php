<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use App\Http\Controllers\API\UserAuthController;
use App\Http\Controllers\API\AdminController;
use App\Http\Controllers\API\DriverController;
use App\Http\Controllers\API\CarController;





Route::post('register', [UserAuthController::class, 'register']);

Route::post('login', [UserAuthController::class, 'login']);


Route::middleware('auth:sanctum')->group(function () {
    // User-specific routes
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::get('profile', [UserAuthController::class, 'profile']);
    Route::put('users/{user}', [UserAuthController::class, 'update']);
    Route::post('logout', [UserAuthController::class, 'logout']);

    // Other protected routes
    // ...
});


Route::prefix('admin')
    ->middleware('auth:sanctum')
    ->group(function () {
        Route::get('/users', [AdminController::class, 'allUsers']);
        Route::delete('/users/{id}', [AdminController::class, 'deleteUser']);
        Route::put('/drivers/{driver}/status', [DriverController::class, 'updateDriverStatus']);
        Route::get('/drivers', [AdminController::class, 'allDrivers']);
        Route::get('/drivers/{driver}', [DriverController::class, 'show']);
        Route::delete('/drivers/{id}', [AdminController::class, 'deleteDriver']);
        Route::put('/drivers/{driver}', [DriverController::class, 'updateDriverDoc']);
    });


Route::prefix('driver')
    ->middleware('auth:sanctum')
    ->group(function () {
        Route::post('/docs', [DriverController::class, 'store']);
        Route::get('/profile/{driver}', [DriverController::class, 'driverInfo']);

    });


Route::prefix('car')
    ->middleware('auth:sanctum')
    ->group(function () {
        Route::post('/info', [CarController::class, 'store']);
    });






