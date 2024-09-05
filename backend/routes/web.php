<?php

use Illuminate\Support\Facades\Route;
use App\Events\TripRequested;
use Illuminate\Support\Facades\Broadcast;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/test-trip-request', function () {
    broadcast(new TripRequested(['tripId' => 1, 'message' => 'New trip request!']));
    return 'Event broadcasted!';
});
