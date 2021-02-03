import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Ingredient} from '../models/ingredient';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private url: string = environment.apiUrl + 'ingredient/';

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.url);
  }
}
