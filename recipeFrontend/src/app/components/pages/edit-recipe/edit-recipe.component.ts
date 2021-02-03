import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Recipe} from '../../../models/recipe';
import {Ingredient} from '../../../models/ingredient';
import {RecipeIngredient} from '../../../models/recipe-ingredient';
import {MeasurementType} from '../../../models/measurement-type.enum';
import {Direction} from '../../../models/direction';
import {CategoryType} from '../../../models/category-type.enum';
import {RecipeService} from '../../../services/recipe.service';
import {DifficultyType} from '../../../models/difficulty-type.enum';
import {ActivatedRoute, Router} from '@angular/router';
import {IngredientService} from '../../../services/ingredient.service';
import {SortableComponent} from 'ngx-bootstrap';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {
  @ViewChild(SortableComponent) sortableComponent: SortableComponent;
  public currentStep = 1;
  @Input()
  public isNew = true;
  public isLoading = true;
  public recipe: Recipe;
  public recipeId: number;

  public ingredientToAdd: RecipeIngredient;
  public directionToAdd: string;
  public durationToAdd: Date;

  public ingredients: Ingredient[] = [];
  public measurementTypes: SelectModel[] = [
    {name: 'Milliliter', value: MeasurementType.MILLILITER},
    {name: 'Gram', value: MeasurementType.GRAM},
    {name: 'Teaspoon', value: MeasurementType.TEASPOON},
    {name: 'Tablespoon', value: MeasurementType.TABLESPOON},
    {name: 'Cup', value: MeasurementType.CUP},
    {name: 'Piece', value: MeasurementType.PIECE}
  ];
  public categories: SelectModel[] = [
    {name: 'Breakfast', value: CategoryType.BREAKFAST},
    {name: 'Dinner', value: CategoryType.DINNER},
    {name: 'Snacks', value: CategoryType.SNACKS},
    {name: 'Drinks', value: CategoryType.DRINKS},
    {name: 'Desserts', value: CategoryType.DESSERTS}
  ];
  public difficulties: SelectModel[] = [
    {name: 'Easy', value: DifficultyType.EASY},
    {name: 'Medium', value: DifficultyType.MEDIUM},
    {name: 'Hard', value: DifficultyType.HARD}
  ];
  public validations = {
    name: false,
    category: false,
    difficulty: false,
    rating: false,
    duration: false,
    ingredients: false,
    directions: false
  };

  constructor(private recipeService: RecipeService,
              private ingredientService: IngredientService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadIngredients();
    this.resetIngredientToAdd();
    this.recipeId = this.route.snapshot.params.id;
    if (this.recipeId) {
      this.isNew = false;
      this.loadRecipe(this.recipeId);
    }
    if (this.isNew) {
      this.recipe = new Recipe();
      this.recipe.ingredients = [];
      this.recipe.directions = [];
      this.recipe.isPublic = false;
      this.isLoading = false;
    }
  }

  public loadIngredients(): void {
    this.ingredientService.getAll().subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    });
  }

  public loadRecipe(id: number): void {
    this.recipeService.get(id).subscribe((recipe: Recipe) => {
      const recipeDurationDate = new Date();
      recipeDurationDate.setHours(Math.trunc(recipe.duration / 60));
      recipeDurationDate.setMinutes(recipe.duration % 60);
      this.durationToAdd = recipeDurationDate;
      this.recipe = recipe;
      this.isLoading = false;
    });
  }

  public nextStep(): void {
    if (this.currentStep < 3) {
      if (this.currentStep === 1 && this.validateStepOne()) {
        return;
      } else if (this.currentStep === 2 && this.validateStepTwo()) {
        return;
      }
      this.currentStep++;
    }
  }

  public previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  public finishRecipe(): void {
    if (this.validateStepThree()) {
      return;
    }
    this.recipe.duration = this.durationToAdd.getMinutes() + (this.durationToAdd.getHours() * 60);
    this.setDirectionIndexes(this.recipe.directions);
    if (this.isNew) {
      this.recipeService.add(this.recipe).subscribe((recipe: Recipe) => this.router.navigate(['/recipe', recipe.id]));
    } else {
      this.recipeService.update(this.recipe).subscribe((recipe: Recipe) => this.router.navigate(['/recipe', recipe.id]));
    }
  }

  public deleteRecipe(): void {
    this.recipeService.delete(this.recipeId).subscribe(() => this.router.navigate(['/']));
  }

  public addIngredient(): void {
    if (!this.ingredientToAdd.ingredient || !this.ingredientToAdd.quantity || !this.ingredientToAdd.measurementType) {
      return;
    }
    const ingredient = new RecipeIngredient();
    ingredient.measurementType = this.ingredientToAdd.measurementType;
    ingredient.quantity = this.ingredientToAdd.quantity;
    ingredient.ingredient = this.ingredientToAdd.ingredient;
    this.recipe.ingredients.push(ingredient);
    this.validations.ingredients = false;
    this.resetIngredientToAdd();
  }

  private setDirectionIndexes(directions: Direction[]): void {
    directions.forEach((direction: Direction, index: number) => direction.index = (index + 1));
  }

  private resetIngredientToAdd(): void {
    this.ingredientToAdd = new RecipeIngredient();
    this.ingredientToAdd.ingredient = new Ingredient();
  }

  public deleteIngredient(name: string): void {
    this.recipe.ingredients = this.recipe.ingredients.filter(i => i.ingredient.name !== name);
  }

  public addDirectionStep(): void {
    if (!this.directionToAdd) {
      return;
    }
    const direction = new Direction();
    direction.description = this.directionToAdd;
    this.recipe.directions.push(direction);
    this.directionToAdd = '';
    this.validations.directions = false;
    this.sortableComponent.writeValue(this.recipe.directions);
  }

  public deleteDirection(description: string): void {
    this.recipe.directions = this.recipe.directions.filter(i => i.description !== description);
  }

  private validateStepOne(): boolean {
    this.validations.name = !this.recipe.name;
    this.validations.category = !this.recipe.category;
    this.validations.difficulty = !this.recipe.difficulty;
    this.validations.rating = !this.recipe.rating;
    this.validations.duration = !this.durationToAdd;
    const validations = this.validations;
    return validations.name
      || validations.category
      || validations.difficulty
      || validations.rating
      || validations.duration;
  }

  private validateStepTwo(): boolean {
    this.validations.ingredients = this.recipe.ingredients.length === 0;
    return this.validations.ingredients;
  }

  private validateStepThree(): boolean {
    this.validations.directions = this.recipe.directions.length === 0;
    return this.validations.directions;
  }
}

interface SelectModel {
  name: string;
  value: number;
}
