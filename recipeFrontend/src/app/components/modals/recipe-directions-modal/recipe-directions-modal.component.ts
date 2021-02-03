import { Component, OnInit } from '@angular/core';
import {Recipe} from '../../../models/recipe';
import {BsModalRef} from 'ngx-bootstrap';

@Component({
  selector: 'app-recipe-directions-modal',
  templateUrl: './recipe-directions-modal.component.html',
  styleUrls: ['./recipe-directions-modal.component.css']
})
export class RecipeDirectionsModalComponent {
  public recipe: Recipe;

  constructor(public bsModalRef: BsModalRef) { }
}
