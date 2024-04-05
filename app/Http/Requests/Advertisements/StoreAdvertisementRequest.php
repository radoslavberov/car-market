<?php

namespace App\Http\Requests\Advertisements;

use App\Models\VehicleModel;
use App\Models\VehicleModelType;
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
            'images[]' => 'image|mimes:jpg,jpeg,png|max:2048',
//            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'color' => 'required|string|max:255',
            'year' => 'required|integer|min:1900|max:' . date('Y'),
            'mileage' => 'required|integer|min:0',
            'horse_power' => 'required|integer|min:0',
            'engine_capacity' => 'required|integer|min:0',
            'description' => 'required|string',
            'location_id' => 'required|exists:locations,id',
            'vehicle_brand_id' => 'required|exists:vehicle_brands,id',
            'vehicle_model_id' => [
                'required',
                'exists:vehicle_models,id',
                function ($attribute, $value, $fail) {
                    $vehicleBrandId = $this->vehicle_brand_id;
                    $vehicleModel = VehicleModel::findOrFail($value);
                    if (!$vehicleModel || $vehicleModel->vehicle_brand_id != $vehicleBrandId) {
                        return $fail('The selected vehicle model does not belong to the specified vehicle brand.');
                    }
                },
            ],
            'vehicle_model_type_id' => [
                'nullable',
                'exists:vehicle_model_types,id',
                function ($attribute, $value, $fail) {
                    $vehicleModelId = $this->vehicle_model_id;
                    $vehicleModelType = VehicleModelType::findOrFail($value);
                    if (!$vehicleModelType || $vehicleModelType->vehicle_model_id != $vehicleModelId) {
                        return $fail('The selected vehicle model type does not belong to the specified vehicle model.');
                    }
                },
            ],
            'vehicle_category_id' => 'required|exists:vehicle_categories,id',
            'fuel_id' => 'required|exists:fuels,id',
            'transmission_id' => 'required|exists:transmissions,id',
        ];
    }
}
