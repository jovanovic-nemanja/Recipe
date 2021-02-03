import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Recipe} from '../models/recipe';
import {PagedResult} from '../models/paged-result';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private url: string = environment.apiUrl + 'recipe/';

  constructor(private http: HttpClient) {
  }

  public add(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.url, recipe);
  }

  public getAll(pageIndex: number = 1, showPublic: boolean): Observable<PagedResult<Recipe[]>> {
    const params = new HttpParams().set('pageIndex', pageIndex.toString()).set('isPublic', String(showPublic));
    return this.http.get<PagedResult<Recipe[]>>(this.url, {params});
  }

  public get(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.url}${id}`);
  }

  public update(recipe: Recipe): Observable<Recipe> {
    return this.http.put<Recipe>(this.url, recipe);
  }

  public delete(recipeId: number): Observable<void> {
    return this.http.delete<void>(`${this.url}${recipeId}`);
  }
}
