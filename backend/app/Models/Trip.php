<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trip extends Model
{
    use HasFactory;

    protected $table = 'trips';

    protected $fillable = [
        'user_id',
        'driver_id',
        'origin',
        'origin_latitude',
        'origin_longitude',
        'destination',
        'destination_latitude',
        'destination_longitude',
        'distance',
        'start_time',
        'end_time',
        'passenger_count',
        'fare_amount',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function driver()
    {
        return $this->belongsTo(Driver::class);
    }
}
