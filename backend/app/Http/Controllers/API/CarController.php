<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;
use App\Models\Car;
use App\Models\Driver;


class CarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function showInfo(Request $request, $driverId)
    {
        try {
            $cars = Car::where('driver_id', $driverId)
                ->get();

            return response()->json([
                'status' => true,
                'message' => 'Cars retrieved successfully',
                'data' => $cars
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Error retrieving cars: ' . $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        $currentYear = Carbon::now()->year;

        $validateInfo = Validator::make($request->all(), [
            'driver_id' => 'required|exists:drivers,id',
            'model' => 'required|string|max:100',
            'year' => ['required', 'integer', 'digits:4', 'gt:1900', 'lte:' . $currentYear],
            'plate_number' => 'required|string|max:50',
            'color' => 'required|string|max:30',
        ]);

        if ($validateInfo->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validateInfo->messages()
            ], 400);
        }

        // Create the car with all required attributes, including driver_id
        $car = Car::create([
            'driver_id' => $request->driver_id, // Make sure to include driver_id
            'model' => $request->model,
            'year' => $request->year,
            'plate_number' => $request->plate_number,
            'color' => $request->color,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Car information saved successfully!',
            'data' => $car
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $currentYear = Carbon::now()->year;

        $validateInfo = Validator::make($request->all(), [
            'driver_id' => 'nullable|exists:drivers,id',
            'model' => 'nullable|string|max:100',
            'year' => ['nullable', 'integer', 'digits:4', 'gt:1900', 'lte:' . $currentYear],
            'plate_number' => 'nullable|string|max:50',
            'color' => 'nullable|string|max:30',
        ]);

        if ($validateInfo->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validateInfo->messages()
            ], 400);
        }

        // Find the car by ID
        $car = Car::findOrFail($id);

        // Update the car with the new information
        $updatedData = [];

        if ($request->has('model')) {
            $updatedData['model'] = $request->model;
        }

        if ($request->has('year')) {
            $updatedData['year'] = $request->year;
        }

        if ($request->has('plate_number')) {
            $updatedData['plate_number'] = $request->plate_number;
        }

        if ($request->has('color')) {
            $updatedData['color'] = $request->color;
        }

        $car->update($updatedData);

        return response()->json([
            'status' => true,
            'message' => 'Car information updated successfully!',
            'data' => $car
        ], 200);
    }

}
