<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Driver extends Model
{
    use HasFactory;

    protected $table = 'drivers';

    protected $fillable = [
        'user_id',
        'your_photo',
        'id_card_photo',
        'license_photo',
        'address',
        'status',
    ];



    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function car()
    {
        return $this->hasOne(Car::class);
    }

    public function location()
    {
        return $this->hasOne(DriverLocation::class);
    }

    public function trips()
    {
        return $this->hasMany(Trip::class);
    }
}
