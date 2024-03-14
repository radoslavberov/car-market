<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Fuel extends Model
{
    use HasFactory;

    public function advertisements(): HasMany
    {
        return $this->hasMany(Advertisement::class);
    }
}
