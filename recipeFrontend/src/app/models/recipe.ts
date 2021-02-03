import {CategoryType} from './category-type.enum';
import {Direction} from './direction';
import {RecipeIngredient} from './recipe-ingredient';
import {DifficultyType} from './difficulty-type.enum';

export class Recipe {
  public id: number;
  public name: string;
  public category: CategoryType;
  public difficulty: DifficultyType;
  public rating: number;
  public duration: number;
  public ingredients: RecipeIngredient[];
  public directions: Direction[];
  public isPublic: boolean;
}
