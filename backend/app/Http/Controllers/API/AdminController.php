<?php

namespace App\Http\Controllers\API;
use App\Models\User;
use App\Models\Driver;
use App\Models\Car;
use App\Models\Message;
use App\Models\Trip;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AdminController extends Controller
{
    public function allUsers()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function deleteUser($id)
    {
        // Find the user by ID
        $user = User::findOrFail($id);

        // Check if the authenticated user is an admin
        if (!auth()->user()->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Delete the user account
        $user->delete();

        return response()->json(['message' => 'User account deleted successfully'], 200);
    }


    public function allDrivers()
    {
        $drivers = Driver::with('user')->get(); // Eager load the user relationship

        $drivers = $drivers->map(function ($driver) {
            return [
                'id' => $driver->id,
                'user_id' => $driver->user_id,
                'driver_name' => $driver->user->name,
                'your_photo' => Storage::url($driver->your_photo),
                'id_card_photo' => Storage::url($driver->id_card_photo),
                'license_photo' => Storage::url($driver->license_photo),
                'address' => $driver->address,
                'status' => $driver->status,
            ];
        });


    return response()->json($drivers);
    }


    public function deleteDriver($id)
    {
        $driver = Driver::findOrFail($id);

        if (!auth()->user()->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $driver->delete();
        return response()->json(['message' => 'Driver deleted successfully'], 200);
    }

    public function carsInfo()
    {
        $cars = Car::with('driver.user:id,name')->get();

        $carsWithDriverInfo = $cars->map(function ($car) {
            return [
                'id' => $car->id,
                'model' => $car->model,
                'year' => $car->year,
                'plate_number' => $car->plate_number,
                'color' => $car->color,
                'driver' => [
                    'name' => $car->driver->user->name,
                    'your_photo' => Storage::url($car->driver->your_photo),
                    ],
                ];
            });

        return response()->json([
            'status' => true,
            'data' => $carsWithDriverInfo,
        ], 200);
    }

    public function deleteCar($id)
    {
        try {
            $car = Car::findOrFail($id);
            $car->delete();
            return response()->json(['message' => 'Car info deleted successfully.'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error deleting car info.'], 500);
        }
    }

    public function getMessages()
    {
        try {
            $messages = Message::with('trip.driver.user')->get();
            return response()->json([
                'success' => true,
                'data' => $messages
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching messages: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while fetching messages.'
            ], 500);
        }
    }

    public function deleteMessage($id)
    {
        try {
            $message = Message::findOrFail($id);
            $message->delete();
            return response()->json(['message' => 'Message deleted successfully.'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error deleting message.'], 500);
        }
    }
}
