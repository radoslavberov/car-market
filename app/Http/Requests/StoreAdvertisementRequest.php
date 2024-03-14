<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAdvertisementRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'color' => 'required|string|max:255',
            'year' => 'required|integer|min:1900|max:' . date('Y'),
            'mileage' => 'required|integer|min:0',
            'horse_power' => 'required|integer|min:0',
            'engine_capacity' => 'required|integer|min:0',
            'description' => 'required|string',
            'location_id' => 'required|exists:locations,id',
            'vehicle_brand_id' => 'required|exists:vehicle_brands,id',
            'vehicle_model_id' => 'required|exists:vehicle_models,id',
            'vehicle_model_type_id' => 'required|exists:vehicle_model_types,id',
            'vehicle_category_id' => 'required|exists:vehicle_categories,id',
            'fuel_id' => 'required|exists:fuels,id',
            'transmission_id' => 'required|exists:transmissions,id',
        ];
    }
}
