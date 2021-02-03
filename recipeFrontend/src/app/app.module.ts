import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AuthConfig, OAuthModule} from 'angular-oauth2-oidc';
import {HttpClientModule} from '@angular/common/http';
import {MenuComponent} from './components/shared/menu/menu.component';
import {RouterModule} from '@angular/router';
import {RecipesComponent} from './components/pages/recipes/recipes.component';
import {appRoutes} from './app.routing';
import {SearchComponent} from './components/shared/search/search.component';
import {LoaderComponent} from './components/shared/loader/loader.component';
import {DataTablesModule} from 'angular-datatables';
import {EditRecipeComponent} from './components/pages/edit-recipe/edit-recipe.component';
import {
  CarouselModule,
  ModalModule,
  PaginationModule,
  RatingModule,
  SortableModule,
  TimepickerModule,
  TypeaheadModule
} from 'ngx-bootstrap';
import {FormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {environment} from '../environments/environment';
import {RecipeDetailsComponent} from './components/pages/recipe-details/recipe-details.component';
import {RecipeDirectionsModalComponent} from './components/modals/recipe-directions-modal/recipe-directions-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RecipesComponent,
    SearchComponent,
    LoaderComponent,
    EditRecipeComponent,
    RecipeDetailsComponent,
    RecipeDirectionsModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DataTablesModule,
    NgSelectModule,
    RatingModule.forRoot(),
    TimepickerModule.forRoot(),
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: [environment.apiUrl],
        sendAccessToken: true
      }
    }),
    RouterModule.forRoot(appRoutes),
    TypeaheadModule.forRoot(),
    PaginationModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule,
    SortableModule.forRoot(),
    ModalModule.forRoot(),
    CarouselModule.forRoot()
  ],
  providers: [{provide: AuthConfig, useValue: sessionStorage}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
