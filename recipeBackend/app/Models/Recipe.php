<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    protected $table = 'recipes';

    protected $fillable = ['name', 'difficulty_type', 'rating', 'minutes', 'category_type', 'is_public', 'user_id'];

    public function new($name, $difficultyType, $rating, $minutes, $categoryType, $isPublic, $userId, $timestamp) {
        $this->name = $name;
        $this->difficulty_type = $difficultyType;
        $this->rating = $rating;
        $this->minutes = $minutes;
        $this->category_type = $categoryType;
        $this->is_public = $isPublic;
        $this->user_id = $userId;
        $this->updated_at = $timestamp;
        $this->created_at = $timestamp;
    }
}
