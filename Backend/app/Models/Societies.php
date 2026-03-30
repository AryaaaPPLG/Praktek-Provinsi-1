<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Societies extends Authenticatable
{
    use HasApiTokens, HasFactory;

    protected $guarded = ['id'];

    protected $hidden = [
        'password'
    ];

    public function regional()
    {
        return $this->belongsTo(Regional::class);
    }
}
