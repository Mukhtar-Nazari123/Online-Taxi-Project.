<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class UserMessage implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $userMessage;

    public function __construct(array $userMessage)
    {
        $this->userMessage = $userMessage;
    }

    public function broadcastOn()
    {
        return new Channel('userMessage-channel'); // Channel for drivers
    }

    public function broadcastAs()
    {
        return 'userMessageFt'; // Event name
    }

    public function broadcastWith()
    {
        return ['userMessage' => $this->userMessage];
    }
}
