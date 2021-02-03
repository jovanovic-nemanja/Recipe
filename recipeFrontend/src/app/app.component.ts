import {Component} from '@angular/core';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'recipelyFrontend';

  constructor(private authService: AuthService) {
    this.authService.checkLoggedInOrRedirect();
  }

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
