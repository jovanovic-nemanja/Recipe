import {Routes} from '@angular/router';
import {RecipesComponent} from './components/pages/recipes/recipes.component';
import {EditRecipeComponent} from './components/pages/edit-recipe/edit-recipe.component';
import {RecipeDetailsComponent} from './components/pages/recipe-details/recipe-details.component';

export const appRoutes: Routes = [
  { path: '', component: RecipesComponent, data: { allRecipes: true }},
  { path: 'recipes', component: RecipesComponent, data: { allRecipes: true } },
  { path: 'my-recipes', component: RecipesComponent, data: { allRecipes: false } },
  { path: 'edit-recipe', component: EditRecipeComponent },
  { path: 'edit-recipe/:id', component: EditRecipeComponent },
  { path: 'recipe/:id', component: RecipeDetailsComponent}
];
