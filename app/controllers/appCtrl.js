function AppCtrl($scope, AppSettings, AppState, $cookies, $location, $log) {
    console.log('');
    console.log('Controller started: ' + 'AppCtrl');

  // Constructor
  // ---------------------------

    $scope.sys = AppSettings.sys;
    $scope.auth = AppSettings.auth;
    $scope.state = AppState;

    console.log('- accessToken: ' + $scope.auth.accessToken);

    // Logged In
    // -----------------------------------
      if ($scope.auth.accessToken) {

        // $cookies.myCookie = '11111';
        $scope.state.loggedIn = true;

        console.log('- logged in:' + $scope.state.loggedIn);

        if ($location.path()!='/main') {
          console.log('- redirecting to /main');
          $location.path('/main'); 

        } else {
          console.log('- /main');
        }


    // Not Logged In
    // -----------------------------------
      } else {
        console.log('- not logged in');

        if ($location.path()!='/welcome') {
          console.log('- redirecting to /welcome');
          $location.path('/welcome'); 
        }
      }


  // Methods
  // ---------------------------
  $scope.logout = function () {
    // TODO
    window.location.href = $scope.auth.redirectUri;
  }

  $scope.getAppRootUrl = function () {
    var result = '';
    var url = $location.absUrl();
    var ind = url.indexOf('#');

    // console.log('- url: ' + url);
    // console.log('- ind: ' + ind);

    if(ind > 0) result = url.slice(0, ind);
    // console.log('- result: ' + result);

    return result;
  }


}