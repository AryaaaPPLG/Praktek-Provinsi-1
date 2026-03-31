<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    protected $table = 'applications';
    protected $fillable = [
        'society_id',
        'car_id',
        'month',
        'nominal',
        'notes',
        'apply_status'
    ];

    public function car()
    {
        return $this->belongsTo(Car::class);
    }
}
