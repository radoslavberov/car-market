<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAdvertisementRequest;
use App\Http\Requests\UpdateAdvertisementRequest;
use App\Http\Resources\Advertisement\AdvertisementCollection;
use App\Http\Resources\Advertisement\AdvertisementResource;
use App\Models\Advertisement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdvertisementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $advertisement = Advertisement::all();
        return AdvertisementCollection::make($advertisement);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAdvertisementRequest $request)
    {
//dd($request->all());
        $advertisement = Advertisement::create([
            'name'                  => $request->name,
            'description'           => $request->description,
            'color'                 => $request->color,
            'year'                  => $request->year,
            'mileage'               => $request->mileage,
            'horse_power'           => $request->horse_power,
            'engine_capacity'       => $request->engine_capacity,
            'price'                 => $request->price,
            'user_id'               => Auth::user()->id,
            'location_id'           => $request->location_id,
            'vehicle_brand_id'      => $request->vehicle_brand_id,
            'vehicle_model_id'      => $request->vehicle_model_id,
            'vehicle_model_type_id' => $request->vehicle_model_type_id,
            'vehicle_category_id'   => $request->vehicle_category_id,
            'fuel_id'               => $request->fuel_id,
            'transmission_id'       => $request->transmission_id,
        ]);

        return new AdvertisementResource($advertisement);
    }

    /**
     * Display the specified resource.
     */
    public function show(Advertisement $advertisement)
    {
        return AdvertisementResource::make($advertisement);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAdvertisementRequest $request, Advertisement $advertisement)
    {
        $this->authorize('update',$advertisement);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Advertisement $advertisement)
    {
        $this->authorize('delete', $advertisement);
        $advertisement->delete();
        return response()->json(['message' => 'Вие изтрихте вашата обява!', 200]);
    }
}
