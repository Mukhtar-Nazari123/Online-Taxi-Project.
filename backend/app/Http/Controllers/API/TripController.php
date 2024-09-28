<?php

namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use App\Models\Trip;
use App\Models\Driver;
use App\Models\User;
use App\Models\DriverLocation;
use App\Events\DriverRideAssigned;
use App\Events\UserDeclareAccepted;
use App\Events\ServiceNotAvaible;
use App\Events\UserMessage;
use Illuminate\Support\Facades\Validator;

class TripController extends Controller
{

    public function showTrips()
    {
        $trips = Trip::with(['user', 'driver.user'])->get(); // Eager load driver and related user

        return response()->json($trips);
    }

    public function deleteTrip($id)
    {
        $trip = Trip::findOrFail($id);
        $trip->delete();
        return response()->json(['message' => 'Trip deleted successfully.']);
    }

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
            // Eager load the user data
            $trip->load('user');

            // Prepare ride details including user information
            $rideDetails = [
                'id' => $trip->id,
                'origin' => $trip->origin,
                'origin_latitude' => $trip->origin_latitude,
                'origin_longitude' => $trip->origin_longitude,
                'destination' => $trip->destination,
                'destination_latitude' => $trip->destination_latitude,
                'destination_longitude' => $trip->destination_longitude,
                'passenger_count' => $trip->passenger_count,
                'distance' => $trip->distance,
                'fare_amount' => $trip->fare_amount,
                'user_name' => $trip->user->name,
                'user_phone' => $trip->user->phone_number,
                'driver_id' => $nearestDriver->driver_id,
            ];
            event(new DriverRideAssigned($rideDetails));
        } else {
            event(new ServiceNotAvaible(['message' => 'Service Not Available']));
        }
    }

    private function findNearestAvailableDriver($originLat, $originLon)
    {
        $drivers = DriverLocation::where('status', 'on')->get();

        if ($drivers->isEmpty()) {
            event(new ServiceNotAvaible(['message' => 'Service Not Available']));
        }

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


    public function driverAccept(Request $request, $tripId)
    {
        try {
            $validatedData = $request->validate([
                'driver_id' => 'required|exists:drivers,id',
            ]);

            $trip = Trip::findOrFail($tripId);
            $trip->update([
                'driver_id' => $validatedData['driver_id'],
            ]);

            $driver = Driver::with(['user', 'car'])->findOrFail($validatedData['driver_id']);

            if ($driver->user) {
                $driverInfo = [
                    'name' => $driver->user->name,
                    'phone' => $driver->user->phone_number,
                ];

                if ($driver->car) {
                    $driverInfo['car'] = [
                        'model' => $driver->car->model,
                        'year' => $driver->car->year,
                        'plate' => $driver->car->plate_number
                    ];
                }

                event(new UserDeclareAccepted($driverInfo));
            }

            $message = "Ride accepted successfully!!";
            return response()->json([
                'trip' => $trip,
                'message' => $message,
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    /**
     * Start the trip.
     */
    public function startTrip($tripId)
    {
        $trip = Trip::findOrFail($tripId);
        $trip->update(['start_time' => now()]);

        return response()->json([
            'message' => 'Trip started successfully',
            'trip' => $trip
        ]);
    }

    /**
     * Complete the trip.
     */
    public function completeTrip(Request $request, $tripId)
    {
        $trip = Trip::findOrFail($tripId);

        $trip->update([
            'end_time' => now(),
            'status' => 'completed',
        ]);

        event(new UserMessage(['userMessage' => $tripId]));
        return response()->json([
            'message' => 'Trip completed successfully',
            'trip' => $trip
        ]);
    }

}
