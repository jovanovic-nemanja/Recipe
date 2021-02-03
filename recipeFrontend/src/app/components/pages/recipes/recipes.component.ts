import { Component, OnInit } from '@angular/core';
import {RecipeService} from '../../../services/recipe.service';
import {Recipe} from '../../../models/recipe';
import {CategoryType} from '../../../models/category-type.enum';
import {DifficultyType} from '../../../models/difficulty-type.enum';
import {PagedResult} from '../../../models/paged-result';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  public isLoading = true;
  public currentPage = 1;
  public totalItems: number;
  public itemsPerPage = 16;
  public recipes: Recipe[];
  public CategoryType = CategoryType;
  public DifficultyType = DifficultyType;
  public showPublic: boolean;
  constructor(private recipeService: RecipeService, private outlet: RouterOutlet) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.showPublic = this.outlet.activatedRouteData.allRecipes;
    this.loadRecipes();
    console.log(this.outlet.activatedRouteData);
  }

  public changePage(event: any): void {
    this.currentPage = event.page;
    this.isLoading = true;
    this.loadRecipes();
  }

  private loadRecipes() {
    this.recipeService.getAll(this.currentPage, this.showPublic).subscribe((pagedResult: PagedResult<Recipe[]>) => {
      this.recipes = pagedResult.result;
      this.totalItems = pagedResult.total;
      this.isLoading = false;
    });
  }
}
