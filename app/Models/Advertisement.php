<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Advertisement extends Model
{
    use HasFactory;
    protected $fillable = [
        'description',
        'color',
        'year',
        'mileage',
        'horse_power',
        'engine_capacity',
        'price',
        'user_id',
        'location_id',
        'vehicle_brand_id',
        'vehicle_model_id',
        'vehicle_model_type_id',
        'car_category_id',
        'car_fuel_id',
        'transmission_id',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function location(): BelongsTo
    {
        return $this->belongsTo(Location::class);
    }

    public function vehicleBrand(): BelongsTo
    {
        return $this->belongsTo(VehicleBrand::class);
    }

    public function vehicleModel(): BelongsTo
    {
        return $this->belongsTo(VehicleModel::class);
    }

    public function vehicleModelType(): BelongsTo
    {
        return $this->belongsTo(VehicleModelType::class);
    }

    public function carCategory(): BelongsTo
    {
        return $this->belongsTo(VehicleCategory::class);
    }

    public function carFuel(): BelongsTo
    {
        return $this->belongsTo(Fuel::class);
    }

    public function transmission(): BelongsTo
    {
        return $this->belongsTo(Transmission::class);
    }
}
