<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class CompactRecipeListResource extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $recipes = collect($this->collection)->map(function ($item) {
            return new CompactRecipeResource($item);
        });
        return ['data' => $recipes];
    }
}
