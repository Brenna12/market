// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,

  authentication: {
      authUrl: 'http://passport.test/dialog/authorize',
      client_id: 'g4',
      redirect_uri: 'http://localhost:4200/auth',
      scope: 'offline_access',
      response_type: 'token'
  },
  resources: {
    userApiUrl: 'http://passport.test/api/userinfo',
    scenarioUrl: 'http://localhost:3000/scenarios/',
    allScenarios: 'http://localhost:3000/scenarios/all',
    uploadEndpoint: 'http://localhost:3000/upload',
    
  }

};
