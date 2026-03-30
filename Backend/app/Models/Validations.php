<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Validations extends Model
{
    protected $table  = 'validations';
    protected $fillable = [
     'society_id',
     'job',
     'job_description',
     'income',
     'reason_accepted',
     'validator_notes',
     'status'
    ];
}
