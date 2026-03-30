<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ValidationResource extends JsonResource
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
            'status' => $this->status,
            'job' => $this->job,
            'job_description' => $this->job_description,
            'income' => $this->income,
            'reason_accepted' => $this->reason_accepted,
            'validator_notes' => $this ->validator_notes,
            'validator' => null
        ];
    }
}
