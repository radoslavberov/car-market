<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;

use App\Models\Advertisement;
use App\Models\ConstructionType;
use App\Models\District;
use App\Models\Estate;
use App\Models\EstateAnalysis;
use App\Models\EstateType;
use App\Models\EstateFavorite;
use App\Models\Location;
use App\Policies\AdvertisementPolicy;
use App\Policies\ConstructionTypePolicy;
use App\Policies\DistrictPolicy;
use App\Policies\EstateAnalysisPolicy;
use App\Policies\EstatePolicy;
use App\Policies\EstateTypePolicy;
use App\Policies\EstateFavoritePolicy;
use App\Policies\LocationPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Advertisement::class => AdvertisementPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        //
    }
}
