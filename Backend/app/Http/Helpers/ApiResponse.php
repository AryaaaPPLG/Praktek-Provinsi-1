<?php

namespace App\Http\Helpers;

class ApiResponse
{
    public static function successMessage($namaData = 'data', $data = null, $code = 200)
    {
        return response()->json([
            $namaData => $data,
        ], $code);
    }

    public static function DataResponse($data, $code = 200)
    {
        return response()->json($data, $code);
    }

    public static function messageResponse($message = null, $code = 200)
    {
        return response()->json([
            'message' => $message
        ], $code);
    }

    public static function errorMessage($message = null, $code = 401)
    {
        return response()->json([
            'message' => $message
        ], $code);
    }
}
