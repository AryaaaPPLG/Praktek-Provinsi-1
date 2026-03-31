<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InstalmentResource extends JsonResource
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
            'car' => $this->name,
            'brand' => $this->brand,
            'price' => $this->price,
            'description' => $this->description,

            'available_month' => $this->availableMonths->map(function($m) {
                return [
                    'month' => $m->month,
                    'description' => $m->month . " Months"
                ];
            })
        ];
    }
}
