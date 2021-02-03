import {AuthConfig} from 'angular-oauth2-oidc';

const authCodeFlowConfig: AuthConfig = {
  issuer: 'https://auth.mathijsc.be',
  redirectUri: 'https://recipely.mathijsc.be',
  silentRefreshRedirectUri: '/assets/silent-refresh.html',
  clientId: 'recipelyClient',
  responseType: 'code',
  scope: 'openid profile offline_access recipelyApi',
  showDebugInformation: false,
  requireHttps: true
};

export const environment = {
  production: true,
  authConfig: authCodeFlowConfig,
  apiUrl: 'https://recipely-api.mathijsc.be/'
};
