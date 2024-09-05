<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TripRequested
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $tripId;
    public $message;

    /**
     * Create a new event instance.
     */
    public function __construct($data)
    {
        $this->tripId = $data['tripId'];
        $this->message = $data['message'];
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel|Channel[]
     */
    public function broadcastOn()
    {
        return new PrivateChannel('drivers');
    }


}
