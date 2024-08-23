<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Driver;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class UserAuthController extends Controller
{


    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function show(User $user)
    {
        return response()->json($user);
    }

    public function register(Request $request)
    {
        $validateUser = Validator::make($request->all(),
        [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users|max:255',
            'phone_number' => 'required|string|max:10|min:10',
            'password' => 'required|string|min:8',
            'confirm_password' => 'required|same:password',
            'role' => 'required|string',
        ]);

        if($validateUser->fails()){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => $validateUser->messages()
            ]);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone_number' => $request->phone_number,
            'password' => $request->password,
            'role' => $request->role,
        ]);

        $token = $user->createToken($user->email.'_Token')->plainTextToken;

        return response()->json([
            'status' => 200,
            'id' => $user->id,
            'name' => $user->name,
            'token' => $token,
            'message' => 'Congratulations! Your account has been successfully created.'
        ]);
    }

        public function update(Request $request, User $user)
    {
        $validatedData = $request->validate([
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|string|email|unique:users,email,'.$user->id.'|max:255',
            'phone_number' => 'nullable|string|max:10|min:10',
            'old_password' => 'required_with:password|string|min:8',
            'password' => 'nullable|string|min:8',
            'confirm_password' => 'required_with:password|same:password',
        ]);

        $updatedFields = [];

        if ($request->has('name')) {
            $updatedFields['name'] = $validatedData['name'];
        }

        if ($request->has('email')) {
            $updatedFields['email'] = $validatedData['email'];
        }

        if ($request->has('phone_number')) {
            $updatedFields['phone_number'] = $validatedData['phone_number'];
        }

        if ($request->has('password')) {
            if (Hash::check($validatedData['old_password'], $user->password)) {
                $updatedFields['password'] = $validatedData['password'];
            } else {
                return response()->json(['error' => 'Incorrect old password'], 400);
            }
        }

        $user->update($updatedFields);
        try {
            $user->update($updatedFields);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json($e->errors(), 422);
        }

        // Refresh the user instance to ensure the password is updated correctly
        $user->refresh();

        return response()->json($user);
    }


    public function login(Request $request)
    {
        try {
            // Validate the user's credentials
            $validateUser = Validator::make($request->all(), [
                'email' => 'required|string|email',
                'password' => 'required|string',
            ]);

            if ($validateUser->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Validation error',
                    'errors' => $validateUser->messages()
                ], 401);
            }

            // Attempt to authenticate the user
            if (!Auth::attempt($request->only(['email', 'password']))) {
                return response()->json([
                    'status' => false,
                    'error' => 'Invalid email or password. Please try again.'
                ], 401);
            }

            // Retrieve the authenticated user
            $user = Auth::user(); // Get the authenticated user directly

            // Find the associated driver (assuming you have a 'driver' relationship in your User model)
            $driver = $user->driver;

            $driverStatus = 'N/A'; // Default status if no driver is found

            if ($driver) {
                $driverStatus = $driver->status; // Get the driver's status
            }

            return response()->json([
                'status' => true,
                'message' => 'Congratulations! You logged in successfully.',
                'id'=> $user->id,
                'name' => $user->name,
                'role' => $user->role,  // Include user role
                'token' => $user->createToken("API TOKEN")->plainTextToken,
                'driverStatus' => $driverStatus
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    public function profile(){

        $userData = auth()->user();
        return response()->json([
            'status' => true,
            'message' => 'profile information',
            'name' => $userData->name,
            'email' => $userData->email,
            'phone' => $userData->phone_number,
            'id' => auth()->user()->id,
        ], 200);
    }
    public function logout(){
        auth()->user()->tokens()->delete();
        return response()->json([
            'status' => true,
            'message' => 'User logged out',
            'data' => [],
        ], 200);
    }
}
