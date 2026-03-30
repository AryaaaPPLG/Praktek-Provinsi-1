<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Helpers\ApiResponse;
use App\Http\Resources\ValidationResource;
use App\Models\Validations;
use Illuminate\Http\Request;

class ValidationController extends Controller
{
    public function sendValidation(Request $request)
    {
        $societyId = $request->user()->id;

        $existingValidation = Validations::where('society_id', $societyId)->first();

        if ($existingValidation) {
            return ApiResponse::errorMessage('You Can Only Make One Validation Data Request', 400);
        }

        Validations::create([
            'society_id' => $societyId,
            'job' => $request->job,
            'job_description' => $request->job_description,
            'income' => $request->income,
            'reason_accepted' => $request->reason_accepted,
            'status' => 'pending'
        ]);

        return ApiResponse::messageResponse('Request Data Validation Sent Successfull', 200);
    }

    public function getValidation(Request $request)
    {
        $societyId = $request->user()->id;

        $validation = Validations::where('society_id', $societyId)->first();

        if(!$validation) {
            return ApiResponse::errorMessage('Data Validations Not Found', 404);
        }

        return ApiResponse::successMessage('validation', new ValidationResource($validation), 200);
    }
}
