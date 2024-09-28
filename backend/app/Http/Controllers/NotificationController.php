<?php

namespace App\Http\Controllers;

use App\Events\MyEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class NotificationController extends Controller
{
    public function sendNotification(Request $request)
    {

        // Trigger the event
        event(new MyEvent('Hello, this is a real-time notification!'));


        // Return a JSON response
        return response()->json(['message' => 'Hello from Laravel']);
    }
}
