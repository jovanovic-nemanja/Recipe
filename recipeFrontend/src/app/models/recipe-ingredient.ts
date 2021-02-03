import {Ingredient} from './ingredient';
import {MeasurementType} from './measurement-type.enum';

export class RecipeIngredient {
  public id: number;
  public ingredient: Ingredient;
  public quantity: number;
  public measurementType: MeasurementType;
}
