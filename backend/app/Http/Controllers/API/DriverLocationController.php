<?php

namespace App\Http\Controllers\API;
use Illuminate\Http\Request;
use App\Models\Driver;
use App\Models\DriverLocation;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class DriverLocationController extends Controller
{
    public function saveLocation(Request $request, $driverId)
    {
        $request->validate([
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'status' => 'required|in:on,off',
        ]);
        
        if ($request->status === 'on') {
            DriverLocation::updateOrCreate(
                ['driver_id' => $driverId],
                [
                    'latitude' => $request->latitude,
                    'longitude' => $request->longitude,
                    'status' => 'on',
                ]
            );
        } else {

            DriverLocation::updateOrCreate(
                ['driver_id' => $driverId],
                ['status' => 'off']
            );
        }

        return response()->json(['message' => 'Location updated successfully.']);
    }
}
