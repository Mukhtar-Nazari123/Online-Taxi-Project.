<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class DriverRideAssigned implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $rideDetails;

    public function __construct(array $rideDetails)
    {
        $this->rideDetails = $rideDetails;
    }

    public function broadcastOn()
    {
        return new Channel('drivers-channel'); // Channel for drivers
    }

    public function broadcastAs()
    {
        return 'RideAssigned'; // Event name
    }

    public function broadcastWith()
    {
        return ['ride' => $this->rideDetails];
    }
}
