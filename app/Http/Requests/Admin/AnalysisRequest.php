<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AnalysisRequest extends FormRequest
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
            'user' => 'nullable|integer',
            'search' => 'nullable|string',
            'estateId' => 'nullable|integer',
            'sortBy' => Rule::in(['user', 'score', 'id', 'name', 'email']),
            'sort' => Rule::in(['asc', 'desc'])
        ];
    }
}
