<?php

namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use App\Models\Driver;
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

    public function updateDriverDoc(Request $request, $driverId)
    {
        $driver = Driver::findOrFail($driverId);

        // Validation
        $validateDoc = Validator::make($request->all(), [
            'user_id' => 'nullable|exists:users,id', // Added user_id validation
            'your_photo' => 'nullable|image|mimes:jpg,png,jpeg,svg,bmp|max:2048',
            'id_card_photo' => 'nullable|image|mimes:jpg,png,jpeg,svg,bmp|max:2048',
            'license_photo' => 'nullable|image|mimes:jpg,png,jpeg,svg,bmp|max:2048',
            'address' => 'nullable|string',
        ]);

        if ($validateDoc->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validateDoc->messages()
            ], 400);
        }

        // Reuse the generateFilename function from the store function
        $generateFilename = function ($file) {
            return time() . '_' . uniqid() . '.' . $file->extension();
        };

        // File Handling
        $yourPhoto = $request->file('your_photo');
        $idCardPhoto = $request->file('id_card_photo');
        $licensePhoto = $request->file('license_photo');
        $address = $request->input('address');

        // Store Images
        if ($yourPhoto) {
            // Delete old image if it exists
            Log::info('Received your_photo file:', ['file_name' => $yourPhoto->getClientOriginalName()]);
            if ($driver->your_photo) {
                Storage::disk('public')->delete('photos/drivers/' . $driver->your_photo);
            }
            $yourPhotoPath = $yourPhoto->storeAs('public/photos/drivers', $generateFilename($yourPhoto));
            $driver->your_photo = basename($yourPhotoPath);
        }

        if ($idCardPhoto) {
            if ($driver->id_card_photo) {
                Storage::disk('public')->delete('photos/id_cards/' . $driver->id_card_photo);
            }
            $idCardPhotoPath = $idCardPhoto->storeAs('public/photos/id_cards', $generateFilename($idCardPhoto));
            $driver->id_card_photo = basename($idCardPhotoPath);
        }

        if ($licensePhoto) {
            if ($driver->license_photo) {
                Storage::disk('public')->delete('photos/licenses/' . $driver->license_photo);
            }
            $licensePhotoPath = $licensePhoto->storeAs('public/photos/licenses', $generateFilename($licensePhoto));
            $driver->license_photo = basename($licensePhotoPath);
        }

        // Update Address
        if ($request->filled('address')) {
            $driver->address = $address;
        }

        // Update Status
        if ($yourPhoto || $idCardPhoto || $licensePhoto) {
            $driver->status = 'pending'; // Set status to pending for admin review
        }

        // Save Changes
        $driver->save();

        return response()->json([
            'status' => 200,
            'message' => 'Driver information updated successfully.',
            'id' => $driver->id,
            'data' => $driver
        ], 200);
    }
}
