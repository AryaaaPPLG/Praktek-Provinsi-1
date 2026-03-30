<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Helpers\ApiResponse;
use App\Http\Resources\SocietyResource;
use App\Models\Societies;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $society = Societies::with('regional')->where('id_card_number', $request->id_card_number)->first();

        if(!$society || !Hash::check($request->password, $society->password)) {
            return ApiResponse::errorMessage('ID Card Or Password Incorrect', 401);
        }

        $token = $society->createToken('auth_token')->plainTextToken;

        $society->token = $token;

        return ApiResponse::DataResponse(SocietyResource::make($society)->resolve());
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return ApiResponse::messageResponse('Logout Success', 200);
    }

}
