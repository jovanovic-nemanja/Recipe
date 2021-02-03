<?php

namespace App\Http\Controllers;

use App\Http\Resources\DirectionResource;
use App\Http\Resources\CompactRecipeResource;
use App\Http\Resources\CompactRecipeListResource;
use App\Http\Resources\IngredientResource;
use App\Http\Resources\RecipeResource;
use App\Http\Resources\RecipeIngredientResource;
use App\Models\Direction;
use App\Models\Ingredient;
use App\Models\Recipe;
use App\Models\RecipeIngredient;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class RecipeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();

        $recipes = Recipe::where('user_id', $user->id)
        ->orWhere('is_public', true)
        ->paginate(15);

        return new CompactRecipeListResource($recipes);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $this->validateRecipeInput($request);

        $isPublic = isset($input['isPublic']) ? $input['isPublic'] : false;
        $user = Auth::user();
        $currentTimestamp = Carbon::now();
        
        DB::beginTransaction();
        try {
            //save recipe
            $recipe = new Recipe;
            $recipe->new($input['name'], $input['difficultyType'], $input['rating'], $input['minutes'], $input['categoryType'], $isPublic, $user->id, $currentTimestamp);
            $recipe->save();

            // save directions
            $directions = $this->getDirectionsFromInput($input, $recipe, $currentTimestamp);
            DB::table('directions')->insert($directions->toArray());

            // save recipe ingredients & ingredients
            $recipeIngredientsToAdd = $this->getRecipeIngredientsFromInput($input, $user, $recipe, $currentTimestamp);
            DB::table('recipe_ingredients')->insert($recipeIngredientsToAdd->toArray());
            
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
        }
        return new CompactRecipeResource($recipe);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $recipe = Recipe::findOrFail($id);

        $directions = Direction::where('recipe_id', $id)->get();
        $recipe->directions = collect($directions)->map(function ($item) {
            return new DirectionResource($item);
        })->toArray();

        $recipeIngredients = RecipeIngredient::where('recipe_id', $id)->get();
        $recipe->recipeIngredients = collect($recipeIngredients)->map(function ($item) {
            $item['ingredient'] = new IngredientResource(Ingredient::where('id', $item['ingredient_id'])->first());
            return new RecipeIngredientResource($item);
        });

        return new RecipeResource($recipe);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $input = $this->validateRecipeInput($request);

        // update recipe
        $recipe = Recipe::findOrFail($id);
        $recipe->name = $input['name'];
        $recipe->difficulty_type = $input['difficultyType'];
        $recipe->rating = $input['rating'];
        $recipe->minutes = $input['minutes'];
        $recipe->category_type = $input['categoryType'];

        $currentTimestamp = Carbon::now();
        $user = Auth::user();

        DB::beginTransaction();
        try {
            $recipe->save();

            // update directions
            Direction::where('recipe_id', $recipe->id)->delete();
            RecipeIngredient::where('recipe_id', $recipe->id)->delete();

            // save directions
            $directions = $this->getDirectionsFromInput($input, $recipe, $currentTimestamp);
            DB::table('directions')->insert($directions->toArray());

            // save recipe ingredients & ingredients
            $recipeIngredients = $this->getRecipeIngredientsFromInput($input, $user, $recipe, $currentTimestamp);
            DB::table('recipe_ingredients')->insert($recipeIngredients->toArray());

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
        }

        return new CompactRecipeResource($recipe);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $recipe = Recipe::findOrFail($id);
        $recipe->delete();
        return response()->json(['message' => 'success'], 200);
    }

    private function getDirectionsFromInput($input, $recipe, $currentTimestamp) {
        $directions = collect($input['directions'])->map(function ($item) use ($recipe, $currentTimestamp) {
            return ['index' => $item['index'], 
                    'description' => $item['description'], 
                    'recipe_id' => $recipe->id,
                    'created_at' => $currentTimestamp,
                    'updated_at' => $currentTimestamp];
        });
        return $directions;
    }

    private function getRecipeIngredientsFromInput($input, $user, $recipe, $currentTimestamp) {
        return collect($input['recipeIngredients'])->map(function ($item) use ($user) {
            if (isset($item['ingredient']['id'])) {
                $item['ingredient_id'] = $item['ingredient']['id'];
            } else {
                $ingredient = Ingredient::firstOrCreate(['name' => $item['ingredient']['name'], 'user_id' => $user->id]);
                $item['ingredient_id'] = $ingredient->id;
            }
            return $item;
        })->map(function ($item) use ($currentTimestamp, $recipe) {
            return ['ingredient_id' => $item['ingredient_id'], 
                    'quantity' => $item['quantity'], 
                    'measurement_type' => $item['measurementType'], 
                    'created_at' => $currentTimestamp, 
                    'updated_at' => $currentTimestamp,
                    'recipe_id' => $recipe->id];
        });
    }

    private function validateRecipeInput($request) {
        return $request->validate([ 
            'name' => ['required'],
            'difficultyType' => ['required'],
            'rating' => ['required', 'numeric'],
            'minutes' => ['required', 'numeric'],
            'categoryType' => ['required'],
            'directions' => ['required', 'array'],
            'directions.*.description' => ['required'],
            'directions.*.index' => ['required', 'numeric'],
            'recipeIngredients' => ['required', 'array'],
            'recipeIngredients.*.quantity' => ['required', 'numeric'],
            'recipeIngredients.*.measurementType' => ['required'],
            'recipeIngredients.*.ingredient' => ['required'],
            'recipeIngredients.*.ingredient.name' => ['required_without_all:recipeIngredients.*.ingredient.id'],
            'recipeIngredients.*.ingredient.id' => ['required_without_all:recipeIngredients.*.ingredient.name', 'numeric'],
        ]);
    }
}