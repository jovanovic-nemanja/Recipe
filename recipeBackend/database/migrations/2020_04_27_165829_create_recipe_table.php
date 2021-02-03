<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRecipeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('recipes', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('name');
            $table->enum('difficulty_type', ['EASY', 'MEDIUM', 'HARD']);
            $table->integer('rating');
            $table->integer('minutes');
            $table->enum('category_type', ['BREAKFAST', 'DINNER', 'SNACKS', 'DRINKS', 'DESSERTS']);
            $table->boolean('is_public');
            $table->foreignId('user_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('recipes');
    }
}
