<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Direction extends Model
{
    protected $table = 'directions';

    protected $fillable = ['index', 'description', 'recipe_id'];
}
