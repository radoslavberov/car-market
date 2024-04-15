<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\Advertisements\AdvertisementFilterRequest;
use App\Http\Requests\Advertisements\StoreAdvertisementRequest;
use App\Http\Requests\Advertisements\UpdateAdvertisementRequest;
use App\Http\Resources\Advertisement\AdvertisementCollection;
use App\Http\Resources\Advertisement\AdvertisementResource;
use App\Http\Resources\Location\LocationCollection;
use App\Http\Resources\UserAdvertisementCollection;
use App\Http\Resources\VehicleBrands\VehicleBrandCollection;
use App\Http\Resources\VehicleModels\VehicleModelCollection;
use App\Http\Resources\VehicleModelTypes\VehicleModelTypeCollection;
use App\Models\Advertisement;
use App\Models\Image;
use App\Models\Location;
use App\Models\VehicleBrand;
use App\Models\VehicleModel;
use App\Models\VehicleModelType;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AdvertisementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(AdvertisementFilterRequest $request)
    {
        # Default and maximum number of items per page
        $defaultLimit = 20;
        $maxLimit = 50;

        # Get query parameters
        $sortBy = $request->query('sortBy', 'default');
        $sortDirection = $request->query('sort', 'desc');
        $page = $request->query('page', 1);
        $limit = $request->query('limit', $defaultLimit) > $maxLimit ? $defaultLimit : $request->query('limit', $defaultLimit);

        # Sort mapping for the query
        $sortMapping = [
            'price' => 'price',
            'year' => 'year',
            'default' => 'advertisements.created_at'
        ];

        # Query builder for estates
        $advertisementsQuery = Advertisement::with('vehicleBrand', 'vehicleModel', 'vehicleModelType', 'vehicleCategory')

            ->when($request->vehicleBrand, function ($query, $brand) {
                return $query->whereIn('advertisements.vehicle_brand_id', $brand);
            })
            ->when($request->vehicleCategory, function ($query, $category) {
                return $query->whereIn('advertisements.vehicle_category_id', $category);
            })
            ->when($request->vehicleModel, function ($query, $vehicleModel) {
                return $query->whereIn('advertisements.vehicle_model_id', $vehicleModel);
            })
            ->when($request->vehicleModelType, function ($query, $vehicleModelType) {
                return $query->whereIn('advertisements.vehicle_model_type_id', $vehicleModelType);
            })
            ->when($request->location, function ($query, $location) {
                return $query->whereIn('advertisements.location_id', $location);
            })
            ->orderBy($sortMapping[$sortBy], $sortDirection);

        # Apply limit and offset
        $total = $advertisementsQuery->count();
        $offset = ($page - 1) * $limit;

        # Get estates
        $advertisements = $advertisementsQuery->offset($offset)->limit($limit)->get();

        # Create a resource collection with pagination data
        $advertisementsCollection = new AdvertisementCollection($advertisements);
        $advertisementsCollection->setPaginationData($page, $total, $limit);

        return $advertisementsCollection;

    }

    /**
     * Store a newly created resource in storage.
     */

     //Creating controller for creating advertisement
    public function store(StoreAdvertisementRequest $request)
    {
        $user = auth()->user();

        if (!$user->canDoAdvertisements()) return response()->json(['message' => 'Достигнали сте лимита за добяне на обяви за месец!'], 403);

        DB::beginTransaction();

        try {
            $getBrand = VehicleBrand::findOrFail($request->vehicle_brand_id);
            $getModel = VehicleModel::findOrFail($request->vehicle_model_id);

            $generateName = $getBrand->name .' '. $getModel->name;

            $advertisement = Advertisement::create([
                'name' => $generateName,
                'description' => $request->description,
                'color' => $request->color,
                'year' => $request->year,
                'mileage' => $request->mileage,
                'horse_power' => $request->horse_power,
                'engine_capacity' => $request->engine_capacity,
                'price' => $request->price,
                'user_id' => Auth::user()->id,
                'location_id' => $request->location_id,
                'vehicle_brand_id' => $request->vehicle_brand_id,
                'vehicle_model_id' => $request->vehicle_model_id,
                'vehicle_model_type_id' => $request->vehicle_model_type_id ?? null,
                'vehicle_category_id' => $request->vehicle_category_id,
                'fuel_id' => $request->fuel_id,
                'transmission_id' => $request->transmission_id,
            ]);

            if ($request->hasFile('images') === true) {

                $folderName = 'images_advertisement_' . $advertisement->id;


                foreach ($request->file('images') as $image) {

                    $fileName = $image->getClientOriginalName();
                    $imagePath = $image->storeAs($folderName, $fileName, 'public');

                    Image::create([
                        'title' => $fileName,
                        'description' => $request->input('description'),
                        'user_id' => auth()->id(),
                        'advertisement_id' => $advertisement->id,
                        'path' => $imagePath,
                    ]);
                }
            }

            DB::commit();

            return new AdvertisementResource($advertisement);

        } catch (\Exception $e) {

            DB::rollback();

            return response()->json(['message' => 'An error occurred while generating the analysis.', $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Advertisement $advertisement)
    {
        $advertisement->load('comments', 'images');
        return AdvertisementResource::make($advertisement);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAdvertisementRequest $request, Advertisement $advertisement)
    {
        $this->authorize('update', $advertisement);

        DB::beginTransaction();

        try {

            $updateData = [];
            if ($request->filled('vehicle_brand_id') && $request->filled('vehicle_model_id')) {
                $getBrand = VehicleBrand::findOrFail($request->vehicle_brand_id);
                $getModel = VehicleModel::findOrFail($request->vehicle_model_id);
                $updateData['name'] = $getBrand->name . ' ' . $getModel->name;
            }
            $fields = ['description', 'color', 'year', 'mileage', 'horse_power', 'engine_capacity', 'price', 'location_id', 'vehicle_brand_id', 'vehicle_model_id', 'vehicle_model_type_id', 'vehicle_category_id', 'fuel_id', 'transmission_id'];

            foreach ($fields as $field) {
                if ($request->filled($field)) {
                    $updateData[$field] = $request->$field;
                }
            }

            if(!isset($request->vehicle_model_type_id)){
                $advertisement['vehicle_model_type_id'] = null;
            }

            $advertisement->update($updateData);

            DB::commit();

            return new AdvertisementResource($advertisement);

        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'An error occurred while updating the advertisement.', $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Advertisement $advertisement)
    {

        $this->authorize('delete', $advertisement);
        $advertisement->comments()->delete();
        $advertisement->images()->delete();
        $advertisement->delete();
        return response()->json(['message' => 'Вие изтрихте вашата обява!', 200]);
    }

    public function getUserAdvertisements(AdvertisementFilterRequest $request)
    {
        # Default and maximum number of items per page
        $defaultLimit = 20;
        $maxLimit = 50;

        # Get query parameters
        $sortBy = $request->query('sortBy', 'default');
        $sortDirection = $request->query('sort', 'desc');
        $page = $request->query('page', 1);
        $limit = $request->query('limit', $defaultLimit) > $maxLimit ? $defaultLimit : $request->query('limit', $defaultLimit);

        # Sort mapping for the query
        $sortMapping = [
            'price' => 'price',
            'year' => 'year',
            'default' => 'advertisements.created_at'
        ];

        # Query builder for estates
        $advertisementsQuery = Advertisement::with('vehicleBrand', 'vehicleModel', 'vehicleModelType', 'vehicleCategory')
            # Filter by query parameters
            ->when($request->vehicleBrand, function ($query, $brand) {
                return $query->whereIn('advertisements.vehicle_brand_id', $brand);
            })
            ->when($request->vehicleCategory, function ($query, $category) {
                return $query->whereIn('advertisements.vehicle_category_id', $category);
            })
            ->when($request->vehicleModel, function ($query, $vehicleModel) {
                return $query->whereIn('advertisements.vehicle_model_id', $vehicleModel);
            })
            ->when($request->vehicleModelType, function ($query, $vehicleModelType) {
                return $query->whereIn('advertisements.vehicle_model_type_id', $vehicleModelType);
            })
            ->when($request->location, function ($query, $location) {
                return $query->whereIn('advertisements.location_id', $location);
            })
            ->where('user_id', auth()->id())
            ->orderBy($sortMapping[$sortBy], $sortDirection);

        # Apply limit and offset
        $total = $advertisementsQuery->count();
        $offset = ($page - 1) * $limit;

        # Get estates
        $advertisements = $advertisementsQuery->offset($offset)->limit($limit)->get();

        # Create a resource collection with pagination data
        $advertisementsCollection = new AdvertisementCollection($advertisements);
        $advertisementsCollection->setPaginationData($page, $total, $limit);

        return $advertisementsCollection;
    }


    #Get all vehicle brands endpoint
    public function getVehicleBrands()
    {
        $brands = VehicleBrand::where('active', 1)->get();
        return VehicleBrandCollection::make($brands);
    }

    #Get all vehicle models endpoint by vehicle brand id
    public function getVehicleModels(string $brandId)
    {
        $vehicleModels = VehicleModel::where('vehicle_brand_id', $brandId)->get();
        return VehicleModelCollection::make($vehicleModels);
    }

    #Get all vehicle model types endpoint by passing vehicle model id
    public function getVehicleModelTypes(string $vehicleModelId)
    {
        $vehicleModelTypes = VehicleModelType::where('vehicle_model_id', $vehicleModelId)->get();
        return VehicleModelTypeCollection::make($vehicleModelTypes);
    }

    #Get all locations endpoint
    public function getLocations()
    {
        $locations = Location::all();
        return LocationCollection::make($locations);
    }
}
