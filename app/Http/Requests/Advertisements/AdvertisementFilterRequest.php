<?php

namespace App\Http\Requests\Advertisements;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AdvertisementFilterRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'vehicleCategory[]' => 'nullable|integer',
            'vehicleBrand[]' => 'nullable|integer',
            'vehicleModelType[]' => 'nullable|integer',
            'vehicleModel[]' => 'nullable|integer',
            'location[]' => 'nullable|integer',
            'sortBy' => Rule::in(['id', 'vehicleCategory', 'price', 'color', 'year', 'location', 'vehicleModel', 'vehicleModelType', 'createdAt']),
            'sort' => Rule::in(['asc', 'desc']),
        ];
    }
    public function messages()
    {
        return [
            'sortBy' => "The 'sortBy' parameter accepts only valid sorting fields",
            'sort' => "The 'sort' parameter accepts only 'asc' and 'desc' values",
        ];
    }
}
