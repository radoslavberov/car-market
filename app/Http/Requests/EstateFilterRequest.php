<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class EstateFilterRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'district[]' => 'nullable|integer',
            'estateType[]' => 'nullable|integer',
            'constructionType[]' => 'nullable|integer',
            'location[]' => 'nullable|integer',
            'provider[]' => 'nullable|integer',
            'sortBy' => Rule::in(['id', 'estateType', 'price', 'squareMeters', 'priceSquareMeters', 'location', 'district', 'year', 'constructionType', 'provider', 'createdAt', 'crawledAt']),
            'sort' => Rule::in(['asc', 'desc']),
            'isFavorite' => 'nullable|boolean'
        ];
    }

    public function messages()
    {
        return [
            'sortBy' => "The 'sortBy' parameter accepts only valid sorting fields",
            'sort' => "The 'sort' parameter accepts only 'asc' and 'desc' values",
        ];
    }
}
