<?php

namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use App\Models\Trip;
use App\Models\DriverLocation;
use Illuminate\Support\Facades\Validator;

class TripController extends Controller
{
    public function createRequest(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'user_id' => 'required|exists:users,id',
                'origin' => 'required|string',
                'origin_latitude' => 'required|numeric',
                'origin_longitude' => 'required|numeric',
                'destination' => 'required|string',
                'destination_latitude' => 'required|numeric',
                'destination_longitude' => 'required|numeric',
                'passenger_count' => 'required|integer|min:1',
                'distance' => 'required|numeric',
                'fare_amount' => 'required|numeric',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $e->validator->errors()
            ], 400);
        }

        // Create the trip
        $trip = Trip::create([
            'user_id' => $validatedData['user_id'],
            'driver_id' => null,
            'origin' => $validatedData['origin'],
            'origin_latitude' => $validatedData['origin_latitude'],
            'origin_longitude' => $validatedData['origin_longitude'],
            'destination' => $validatedData['destination'],
            'destination_latitude' => $validatedData['destination_latitude'],
            'destination_longitude' => $validatedData['destination_longitude'],
            'passenger_count' => $validatedData['passenger_count'],
            'distance' => $validatedData['distance'],
            'fare_amount' => $validatedData['fare_amount'],
            'status' => 'pending',
        ]);

        $this->assignNearestDriver($trip);

        return response()->json($trip, 201);
    }


    /**
 * Assign the nearest available driver to the trip.
 */
    private function assignNearestDriver(Trip $trip)
    {
        $nearestDriver = $this->findNearestAvailableDriver(
            $trip->origin_latitude,
            $trip->origin_longitude
        );

        if ($nearestDriver) {
            // Optionally notify the driver about the trip request (implementation needed)
            // ...

            // Update the trip with the nearest driver's ID
            $trip->driver_id = $nearestDriver->driver_id; // Assuming driver_id is stored in driver_locations
            // Update status to indicate a driver is assigned
            $trip->save();
        } else {
            // Handle the case where no driver is available
            $trip->status = 'waiting_for_driver'; // Update status accordingly
            $trip->save();
        }
    }

    private function findNearestAvailableDriver($originLat, $originLon)
    {
        $drivers = DriverLocation::where('status', 'on')->get();

        $nearestDriver = null;
        $shortestDistance = PHP_INT_MAX;

        foreach ($drivers as $driver) {
            $driverDistance = $this->calculateNearestDistance(
                $originLat,
                $originLon,
                $driver->latitude,
                $driver->longitude
            );

            if ($driverDistance < $shortestDistance) {
                $shortestDistance = $driverDistance;
                $nearestDriver = $driver;
            }
        }
        return $nearestDriver;
    }

    /**
     * Calculate distance between two points using the Haversine formula.
     */
    private function calculateNearestDistance($lat1, $lon1, $lat2, $lon2)
    {
        $url = "http://router.project-osrm.org/route/v1/driving/{$lon1},{$lat1};{$lon2},{$lat2}?overview=false";

        $response = file_get_contents($url);

        // Check if the response is valid
        if ($response === FALSE) {
            Log::error("OSRM API request failed.");
            return null;
        }

        $data = json_decode($response, true);

        if (isset($data['routes']) && count($data['routes']) > 0) {
            $distance = $data['routes'][0]['distance'] / 1000; // Convert from meters to kilometers
            Log::info("Calculated Distance: {$distance} km");
            return round($distance, 2);
        } else {
            Log::error("No routes found in the OSRM response.");
            return null; // or handle the error as needed
        }
    }


    public function accept(Request $request, $tripId)
    {
        $validatedData = $request->validate([
            'driver_id' => 'required|exists:drivers,id',
        ]);

        $trip = Trip::findOrFail($tripId);
        $trip->update([
            'driver_id' => $validatedData['driver_id'],
            'status' => 'accepted',
        ]);

        return response()->json($trip);
    }

    /**
     * Start the trip.
     */
    public function start($tripId)
    {
        $trip = Trip::findOrFail($tripId);
        $trip->update(['start_time' => now()]);

        return response()->json($trip);
    }

    /**
     * Complete the trip.
     */
    public function complete(Request $request, $tripId)
    {
        $trip = Trip::findOrFail($tripId);

        // Optionally calculate final fare if necessary
        $finalFare = $trip->fare_amount; // Use initial fare or recalculate if needed

        $trip->update([
            'end_time' => now(),
            'fare_amount' => $finalFare,
            'status' => 'completed',
        ]);

        // Notify user (implementation needed)
        // ...

        return response()->json($trip);
    }

    /**
     * Calculate distance between two points.
     */
    private function calculateDistance($lat1, $lon1, $lat2, $lon2)
    {
        // Haversine formula or any distance calculation logic
        $earthRadius = 6371; // Radius of the Earth in km

        $dLat = deg2rad($lat2 - $lat1);
        $dLon = deg2rad($lon2 - $lon1);

        $a = sin($dLat / 2) * sin($dLat / 2) +
             cos(deg2rad($lat1)) * cos(deg2rad($lat2)) *
             sin($dLon / 2) * sin($dLon / 2);
        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));

        $result = round($earthRadius * $c, 2); // Distance in km
        return response()->json($result, 201);
    }
}
