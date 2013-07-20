function AuthCtrl($scope, AppSettings, $location, $log) {
  $scope.sys = AppSettings.sys;
  $scope.auth = AppSettings.auth;

  console.log('');
  console.log('Controller started: ' + 'AuthCtrl');

  console.log('- accessToken: ' + $scope.auth.accessToken);

  $scope.login = function() {
    console.log('- login started...');

    var requestUri = '';
    requestUri = requestUri + $scope.auth.requestUriBase + '?';
    requestUri = requestUri + 'client_id=' + $scope.auth.clientId + '&';
    requestUri = requestUri + 'redirect_uri=' + $scope.auth.redirectUri + '&';
    requestUri = requestUri + 'response_type=' + $scope.auth.responseType + '&';
    requestUri = requestUri + 'scope=' + $scope.auth.scope + '&';
    // requestUri = requestUri + '&state='' + authModel.state + '&';
    console.log('- requestUri: ' + requestUri);

    window.location.href = requestUri;
  }
}
