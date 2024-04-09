<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
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
            'admin' => 'nullable|boolean',
            'active' => 'nullable|boolean',
            'search' => 'nullable|string',
            'sortBy' => Rule::in(['admin', 'active', 'advertisementsCount', 'name', 'email']),
            'sort' => Rule::in(['asc', 'desc'])
        ];
    }
}
