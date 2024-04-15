<?php

namespace App\Http\Requests\Advertisements;

use App\Models\VehicleModel;
use App\Models\VehicleModelType;
use Illuminate\Foundation\Http\FormRequest;

class UpdateAdvertisementRequest extends FormRequest
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
            'description' => 'nullable|string',
            'color' => 'nullable|string|max:255',
            'year' => 'nullable|integer',
            'mileage' => 'nullable|integer',
            'horse_power' => 'nullable|integer',
            'engine_capacity' => 'nullable|integer',
            'price' => 'nullable|numeric',
            'location_id' => 'nullable|exists:locations,id',
            'vehicle_brand_id' => 'nullable|exists:vehicle_brands,id',
            'vehicle_model_id' => [
                'nullable',
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
            'vehicle_category_id' => 'nullable|exists:vehicle_categories,id',
            'fuel_id' => 'nullable|exists:fuels,id',
            'transmission_id' => 'nullable|exists:transmissions,id',
        ];
    }
}
