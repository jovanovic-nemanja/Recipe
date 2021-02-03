// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {AuthConfig} from 'angular-oauth2-oidc';

const authCodeFlowConfig: AuthConfig = {
  issuer: 'http://localhost:5000',
  redirectUri: 'http://localhost:4200',
  silentRefreshRedirectUri: '/assets/silent-refresh.html',
  clientId: 'recipelyClient',
  responseType: 'code',
  scope: 'openid profile offline_access recipelyApi',
  showDebugInformation: true
};

export const environment = {
  production: false,
  authConfig: authCodeFlowConfig,
  apiUrl: 'http://localhost:5001/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
