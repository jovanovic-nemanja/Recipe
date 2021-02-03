<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RecipeIngredient extends Model
{
    protected $table = 'recipe_ingredients';

    protected $fillable = ['ingredient_id', 'quantity', 'measurement_type', 'recipe_id'];
}
