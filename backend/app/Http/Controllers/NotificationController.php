<?php

namespace App\Http\Controllers;

use App\Events\MyEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class NotificationController extends Controller
{
    public function sendNotification(Request $request)
    {
        $message = 'Hello, this is a real-time notification!';

        // Trigger the event
        event(new MyEvent($message));

        // Log the event
        Log::info('Notification event triggered with message: ' . $message);

        // Return a JSON response
        return response()->json(['status' => 'Notification sent']);
    }
}
