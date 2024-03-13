<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VehicleModelType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'vehicle_model_id',
        'active',
    ];

    public function vehicleModel(): BelongsTo
    {
        return $this->belongsTo(VehicleModel::class);
    }
}
