<?php

namespace App\Traits;

trait Activatable {

    /**
     * Scope a query to only include active entries.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where($query->getModel()->getTable() . '.active', 1);
    }

    /**
     * Check if the model is active
     *
     * @return boolean
     */
    public function isActive()
    {
        return $this->active == 1;
    }

    /**
     * Toggle the active status of the model
     *
     * @return void
     */
    public function toggleActive()
    {
        $this->active = $this->active === 1 ? 0 : 1;
        $this->save();
    }
}
