<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class VehicleBrand extends Model
{
    use HasFactory;
    //Creating relationships between tables

    protected $fillable = [
        'name',
        'active',
    ];

    public function vehicleModel(): HasMany
    {
        return $this->hasMany(VehicleModel::class);
    }

    public function advertisements(): HasMany
    {
        return $this->hasMany(Advertisement::class);
    }
}
