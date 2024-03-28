<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('advertisements', function (Blueprint $table) {
            $table->id();

            $table->string('name');
            $table->decimal('price', 10, 2);
            $table->string('color');
            $table->integer('year');
            $table->integer('mileage');
            $table->integer('horse_power');
            $table->integer('engine_capacity');
            $table->text('description');

            # Foreign keys
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('location_id');
            $table->unsignedBigInteger('vehicle_brand_id');
            $table->unsignedBigInteger('vehicle_model_id');
            $table->unsignedBigInteger('vehicle_model_type_id')->nullable();
            $table->unsignedBigInteger('vehicle_category_id');
            $table->unsignedBigInteger('fuel_id');
            $table->unsignedBigInteger('transmission_id');

            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('location_id')->references('id')->on('locations');
            $table->foreign('vehicle_brand_id')->references('id')->on('vehicle_brands');
            $table->foreign('vehicle_model_id')->references('id')->on('vehicle_models');
            $table->foreign('vehicle_model_type_id')->references('id')->on('vehicle_model_types');
            $table->foreign('fuel_id')->references('id')->on('fuels');
            $table->foreign('vehicle_category_id')->references('id')->on('vehicle_categories');
            $table->foreign('transmission_id')->references('id')->on('transmissions');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('advertisements');
    }
};
