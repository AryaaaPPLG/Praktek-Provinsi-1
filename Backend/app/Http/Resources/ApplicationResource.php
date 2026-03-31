<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ApplicationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
        'id' => $this->id,
        'car' => $this->car->name,
        'brand' => $this->car->brand,
        'price' => ($this->car->price ?? 0),

        'applications' => [
            [
                'month' => $this->month,
                'apply_status' => $this->apply_status
            ]
        ]
        ];
    }
}
