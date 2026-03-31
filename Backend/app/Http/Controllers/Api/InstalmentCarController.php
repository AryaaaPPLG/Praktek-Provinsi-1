<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Helpers\ApiResponse;
use App\Http\Resources\ApplicationResource;
use App\Http\Resources\InstalmentResource;
use App\Models\Application;
use App\Models\Car;
use App\Models\Validations;
use Illuminate\Http\Request;

class InstalmentCarController extends Controller
{
    public function getAllCars()
    {
        $cars = Car::with('availableMonths')->get();
            return ApiResponse::successMessage('cars', InstalmentResource::collection($cars)->resolve());
    }

    public function getDetailCar($id)
    {
        $car = Car::with('availableMonth')->find($id);

        if(!$car) {
            return ApiResponse::errorMessage('Car Not Found', 404);
        }

        return ApiResponse::successMessage('Instalment',(new InstalmentResource($car))->resolve(), 200);
    }

    public function applyInstalment(Request $request)
    {
        $societyId = $request->user()->id;

        $validation = Validations::where('society_id', $societyId)->first();
        if (!$validation || $validation->status !== 'accepted') {
            return ApiResponse::errorMessage('Your Data Must Be Validated And Accepted', 401);
        }

        $exitingApply = Application::where('society_id', $societyId)->first();
        if ($exitingApply){
            return ApiResponse::errorMessage('Application for a instalment must be once', 401);
        }

        $car = Car::findOrFail($request->instalment_id);
        $amountPerMonth = $car->price / $request->month;

        Application::create([
            'society_id' => $societyId,
            'car_id' => $request->instalment_id,
            'month' => $request->months,
            'nominal' => $amountPerMonth,
            'notes' => $request->notes,
            'apply_status' => 'pending'
        ]);

        return ApiResponse::successMessage('Applying for instalment successful', 200);
    }

    public function getMyApplication(Request $request)
    {
        $societyId = $request->user()->id;

        $applications = Application::with('car')->where('society_id', $societyId)->get();

       return ApiResponse::successMessage('instalment', ApplicationResource::collection($applications)->resolve(), 200);
    }
}
