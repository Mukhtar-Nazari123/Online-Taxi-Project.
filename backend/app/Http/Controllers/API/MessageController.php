<?php
namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Message;
use App\Models\Trip;
use Illuminate\Support\Facades\Log;

class MessageController extends Controller
{

    public function storeMessage(Request $request, $trip_id)
    {
        try {
            $validatedData = $request->validate([
                'text' => 'required|string',
                'rating' => 'required|integer|min:1|max:5',
            ]);
            $validatedData['trip_id'] = $trip_id;

            $message = Message::create($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Message stored successfully!',
                'data' => $message
            ], 201);

        } catch (\Exception $e) {
            Log::error('Error storing message: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'An error occurred.',
            ], 500);
        }
    }
}
