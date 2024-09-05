<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class MyEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;

    public function __construct($message)
    {
        $this->message = $message;
    }

    public function broadcastOn()
    {
        return new Channel('my-channel'); // Make sure to return a Channel instance
    }

    public function broadcastAs()
    {
        return 'MyEvent'; // Ensure this matches what you are listening for in React
    }

    public function broadcastWith()
    {
        return ['message' => $this->message]; // This is important for sending the message
    }
}
