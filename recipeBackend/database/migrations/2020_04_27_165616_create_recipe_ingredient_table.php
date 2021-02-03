<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRecipeIngredientTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('recipe_ingredients', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('ingredient_id');
            $table->double('quantity');
            $table->enum('measurement_type', ['MILLILITER', 'GRAM', 'TEASPOON', 'TABLESPOON', 'CUP', 'PIECE']);	
            $table->foreignId('recipe_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('recipe_ingredients');
    }
}
