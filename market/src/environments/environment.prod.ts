export const environment = {
  production: true,
 

  authentication: {
    userApiUrl: 'https://passport.gen4.info/api/userinfo',
    authUrl: 'https://passport.gen4.info/dialog/authorize',
    client_id: 'g4',
    redirect_uri: 'https://market.gen4.info/auth',
    scope: 'offline_access',
    response_type: 'token'
  
},
resources: {
  userApiUrl: 'https://passport.gen4.info/api/userinfo',
  scenarioUrl: '/api/scenarios/',
  allScenarios: '/api/scenarios/all',
  uploadEndpoint: '/upload',
  
}
};
