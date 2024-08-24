<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    use HasFactory;

    protected $table = 'cars';

    protected $fillable = [
        'driver_id',
        'model',
        'year',
        'plate_number',
        'color',
    ];

    public function driver()
    {
        return $this->belongsTo(Driver::class);
    }
}
