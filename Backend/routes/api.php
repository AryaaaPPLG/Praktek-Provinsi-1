<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ValidationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('v1')->group(function () {
    Route::post('auth/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function() {
    Route::post('auth/logout', [AuthController::class, 'logout']);

    Route::post('/validation', [ValidationController::class, 'sendValidation']);
    Route::get('/validation', [ValidationController::class, 'getValidation']);
});
});

