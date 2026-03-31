<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AvailableMonth extends Model
{
    protected $table = 'available_months';
    protected $fillable = [
        'car_id',
        'month'
    ];

    public function car()
    {
        return $this->belongsTo(Car::class);
    }
}
