<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    protected $table = 'instalment_cars';

    protected $fillable = [
        'name',
        'brand',
        'price',
        'description'
    ];
}
