<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use App\Http\Controllers\API\UserAuthController;


Route::apiResource('users', UserAuthController::class)->middleware('auth:sanctum');

Route::post('register', [UserAuthController::class, 'register']);

Route::post('login', [UserAuthController::class, 'login']);

 
Route::group([
    "middleware" => ["auth:sanctum"]
],function(){
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::get('profile', [UserAuthController::class, 'profile']);
    Route::post('logout', [UserAuthController::class, 'logout']);
});



