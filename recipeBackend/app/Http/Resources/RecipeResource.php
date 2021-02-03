<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RecipeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return ['id' => $this->id,
                'name' => $this->name,
                'difficultyType' => $this->difficulty_type,
                'rating' => $this->rating,
                'minutes' => $this->minutes,
                'categoryType' => $this->category_type,
                'isPublic' => $this->is_public,
                'directions' => $this->directions,
                'recipeIngredients' => $this->recipeIngredients];
    }
}
