import {Injectable} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {environment} from '../../environments/environment';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private oAuthService: OAuthService) {
    this.oAuthService.configure(environment.authConfig);
  }

  public checkLoggedInOrRedirect(): void {
    this.oAuthService
      .loadDiscoveryDocumentAndTryLogin()
      .then(() => {
        if (this.oAuthService.hasValidAccessToken()) {
          this.oAuthService.setupAutomaticSilentRefresh();
        } else {
          this.oAuthService.initCodeFlow();
        }
      });
  }

  public getName(): string {
    const token = this.oAuthService.getAccessToken();
    const jwtHelper = new JwtHelperService();
    return jwtHelper.decodeToken(token).name;
  }

  public isLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }

  public logout(): void {
    this.oAuthService.logOut(true);
  }
}
