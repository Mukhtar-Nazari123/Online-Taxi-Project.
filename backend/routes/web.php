<?php

use Illuminate\Support\Facades\Route;
use App\Events\TripRequested;
use Illuminate\Support\Facades\Broadcast;




Route::get('/', function () {
    return view('welcome');
});

