<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;
use App\Models\Car;

class CarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $currentYear = Carbon::now()->year;

        $validateInfo = Validator::make($request->all(), [
            'driver_id' => 'required|exists:drivers,id',
            'model' => 'required|string|max:100',
            'year' => ['required', 'integer', 'digits:4', 'gt:1900', 'lt:' . $currentYear],
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
            'message' => 'Car information saved successfully',
            'data' => $car
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
