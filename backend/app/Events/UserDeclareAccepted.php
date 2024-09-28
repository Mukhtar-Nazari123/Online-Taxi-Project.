<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class UserDeclareAccepted implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $driverInfo;

    /**
     * Create a new event instance.
     *
     * @param array $driverInfo
     */
    public function __construct(array $driverInfo)
    {
        $this->driverInfo = $driverInfo;
        Log::info('Driver Info:', $this->driverInfo);
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel
     */
    public function broadcastOn()
    {
        return new Channel('user-channel'); // Channel for drivers
    }

    /**
     * Get the event name to broadcast.
     *
     * @return string
     */
    public function broadcastAs()
    {
        return 'RideAccepted'; // Event name
    }

    /**
     * Prepare the data to be sent with the broadcast.
     *
     * @return array
     */
    public function broadcastWith()
    {
        return ['driverInfo' => $this->driverInfo];
    }
}
