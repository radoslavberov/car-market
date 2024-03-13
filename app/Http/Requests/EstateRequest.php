<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EstateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'provider_id' => 'required|integer|exists:providers,id',
            'location_id' => 'nullable|integer|exists:locations,id',
            'district_id' => 'nullable|integer|exists:districts,id',
            'estate_type_id' => 'nullable|integer|exists:estate_types,id',
            'construction_type_id' => 'nullable|integer|exists:construction_types,id',
            'external_id' => 'nullable|string|max:255',
            'url' => 'required|string|max:2000',
            'price' => 'nullable|numeric|min:0',
            'square_meters' => 'nullable|numeric|min:0',
            'price_square_meters' => 'nullable|numeric|min:0',
            'floor' => 'nullable|integer',
            'year' => 'nullable|integer',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'description' => 'nullable|string',
            'active' => 'required|boolean',
            'crawled_at' => 'nullable|date',
        ];
    }
}
