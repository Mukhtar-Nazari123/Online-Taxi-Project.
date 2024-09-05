<?php

namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use App\Models\Driver;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class DriverController extends Controller
{

    public function show(Driver $driver)
    {
        return response()->json($driver);
    }

    public function store(Request $request)
    {
        $validateDoc = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'your_photo' => 'required|image|mimes:jpg,png,jpeg,svg,bmp|max:2048',
            'id_card_photo' => 'required|image|mimes:jpg,png,jpeg,svg,bmp|max:2048',
            'license_photo' => 'required|image|mimes:jpg,png,jpeg,svg,bmp|max:2048',
            'address' => 'required|string',
        ]);

        if ($validateDoc->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validateDoc->messages()
            ], 400);
        }

        $generateFilename = function ($file) {
            return time() . '_' . uniqid() . '.' . $file->extension();
        };

        $yourPhotoPath = $request->file('your_photo')->
        storeAs('public/photos/drivers', $generateFilename($request->file('your_photo')));

        $idCardPhotoPath = $request->file('id_card_photo')->
        storeAs('public/photos/id_cards', $generateFilename($request->file('id_card_photo')));

        $licensePhotoPath = $request->file('license_photo')->
        storeAs('public/photos/licenses', $generateFilename($request->file('license_photo')));

        $driver = Driver::create([
            'user_id' => $request->user_id,
            'your_photo' => str_replace('public/', '', $yourPhotoPath),
            'id_card_photo' => str_replace('public/', '', $idCardPhotoPath),
            'license_photo' => str_replace('public/', '', $licensePhotoPath),
            'address' => $request->address,
            'status' => 'disabled',
        ]);

        return response()->json([
            'status' => 200,
            'message' => 'Your documents have been submitted and are pending admin approval.',
            'id' => $driver->id,
            'data' => $driver
        ], 201);
    }

    public function driverInfo(Driver $driver)
    {
        $driver->load('user');
        $driverInfo = [
            'id' => $driver->user->id,
            'name' => $driver->user->name,
            'email' => $driver->user->email,
            'phone' => $driver->user->phone_number,
            'role' => $driver->user->role,
            'address' => $driver->address,
            'photo' => Storage::url($driver->your_photo),
        ];
        return response()->json([
            'status' => true,
            'message' => 'driver information',
            'driver' => $driverInfo,
        ], 200);
    }



public function updateDriverInfo(Request $request, Driver $driver)
{
    $user = $driver->user;
    try {
        $validatedData = $request->validate([
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|string|email|unique:users,email,' . $user->id . '|max:255',
            'phone_number' => 'nullable|string|min:10|max:15', // Adjust max length as needed
            'address' => 'nullable|string|max:255',
            'your_photo' => 'nullable|image|mimes:jpg,png,jpeg,svg,bmp|max:2048',
        ]);
    } catch (ValidationException $e) {
        // Return validation errors with a 422 status code
        return response()->json(['errors' => $e->validator->errors()], 422);
    }


    if (isset($validatedData['name'])) {
        $driver->user->name = $validatedData['name'];
    }
    if (isset($validatedData['email'])) {
        $driver->user->email = $validatedData['email'];
    }
    if (isset($validatedData['phone_number'])) {
        $driver->user->phone_number = $validatedData['phone_number'];
    }

    if (isset($validatedData['address'])) {
        $driver->address = $validatedData['address'];
    }

    $generateFilename = function ($file) {
        return time() . '_' . uniqid() . '.' . $file->extension();
    };

    if ($request->hasFile('your_photo')) {
        if ($driver->your_photo) {
            Storage::delete('public/photos/drivers/' . $driver->your_photo);
        }

        $yourPhotoPath = $request->file('your_photo')->storeAs('public/photos/drivers', $generateFilename($request->file('your_photo')));
        $driver->your_photo = str_replace('public/', '', $yourPhotoPath);
    }

    $driver->user->save();
    $driver->save();

    return response()->json([
        'status' => true,
        'message' => 'Driver information updated successfully.',
        'driver' => [
            'id' => $driver->user->id,
            'name' => $driver->user->name,
            'email' => $driver->user->email,
            'phone' => $driver->user->phone_number,
            'role' => $driver->user->role,
            'address' => $driver->address,
            'photo' => Storage::url($driver->your_photo),
        ],
    ], 200);
}


    public function updateDriverStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:enabled,disabled', // Validate the status
        ]);

        $driver = Driver::findOrFail($id);
        $driver->status = $request->status; // Update status based on admin review
        $driver->save();

        return response()->json([
            'status' => 200,
            'message' => 'Driver status updated successfully.',
            'data' => $driver
        ]);
    }

    public function updateDriverDoc(Request $request, $id)
{
    // Validate the request, making all fields except 'address' optional
    $validateDoc = Validator::make($request->all(), [
        'your_photo' => 'nullable|image|mimes:jpg,png,jpeg,svg,bmp|max:2048',
        'id_card_photo' => 'nullable|image|mimes:jpg,png,jpeg,svg,bmp|max:2048',
        'license_photo' => 'nullable|image|mimes:jpg,png,jpeg,svg,bmp|max:2048',
        'address' => 'nullable|string', // Make address optional as well if desired
    ]);

    if ($validateDoc->fails()) {
        return response()->json([
            'status' => false,
            'message' => 'Validation error',
            'errors' => $validateDoc->messages()
        ], 400);
    }

    // Find the driver using the ID from the URL
    $driver = Driver::find($id);

    if (!$driver) {
        return response()->json([
            'status' => false,
            'message' => 'Driver not found'
        ], 404);
    }

    // Update fields if they are present in the request
    if ($request->has('address')) {
        $driver->address = $request->address;
    }

    $generateFilename = function ($file) {
        return time() . '_' . uniqid() . '.' . $file->extension();
    };

    // Handle file uploads
    if ($request->hasFile('your_photo')) {
        if ($driver->your_photo) {
            Storage::delete('public/photos/drivers/' . $driver->your_photo);
        }

        $yourPhotoPath = $request->file('your_photo')->storeAs('public/photos/drivers', $generateFilename($request->file('your_photo')));
        $driver->your_photo = str_replace('public/', '', $yourPhotoPath);
    }


    if ($request->hasFile('id_card_photo')) {
        if ($driver->id_card_photo) {
            Storage::delete('public/photos/id_cards/' . $driver->id_card_photo);
        }

        $idCardPhotoPath = $request->file('id_card_photo')->storeAs('public/photos/id_cards', $generateFilename($request->file('id_card_photo')));
        $driver->id_card_photo = str_replace('public/', '', $idCardPhotoPath);
    }

    if ($request->hasFile('license_photo')) {
        if ($driver->license_photo) {
            Storage::delete('public/photos/licenses/' . $driver->license_photo);
        }

        $licensePhotoPath = $request->file('license_photo')->storeAs('public/photos/licenses', $generateFilename($request->file('license_photo')));
        $driver->license_photo = str_replace('public/', '', $licensePhotoPath);
    }

    // Save updated driver information
    $driver->save();

    return response()->json([
        'status' => 200,
        'message' => 'Driver information updated successfully.',
        'data' => $driver
    ], 200);
}
}
