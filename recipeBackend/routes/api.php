<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('auth')->group(function () {
    Route::post('login', 'UserController@login');
    Route::post('register', 'UserController@register');
    Route::post('refreshToken', 'UserController@refresh');
});

Route::apiResource('recipes', 'RecipeController')->middleware('auth:api');