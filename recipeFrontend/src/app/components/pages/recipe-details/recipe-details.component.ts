import { Component, OnInit } from '@angular/core';
import {RecipeService} from '../../../services/recipe.service';
import {Recipe} from '../../../models/recipe';
import {ActivatedRoute} from '@angular/router';
import {DifficultyType} from '../../../models/difficulty-type.enum';
import {CategoryType} from '../../../models/category-type.enum';
import {MeasurementType} from '../../../models/measurement-type.enum';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {RecipeDirectionsModalComponent} from '../../modals/recipe-directions-modal/recipe-directions-modal.component';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  public recipe: Recipe;
  public recipeId: number;
  public isLoading = true;
  public DifficultyType = DifficultyType;
  public CategoryType = CategoryType;
  public MeasurementType = MeasurementType;
  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private modalService: BsModalService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.recipeId = this.route.snapshot.params.id;
    this.recipeService.get(this.recipeId).subscribe((recipe: Recipe) => {
      this.recipe = recipe;
      this.isLoading = false;
    });
  }

  public openDirectionsModal(): void {
    const initialState = {
      recipe: this.recipe
    };
    this.modalService.show(RecipeDirectionsModalComponent, {initialState, class: 'modal-lg modal-dialog-centered'});
  }

}
