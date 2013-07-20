var appModule = angular.module('appModule', ['ngCookies']);


appModule.config(['$routeProvider', function($routeProvider) {

  $routeProvider.
      when('/welcome', {templateUrl: 'app/views/welcome.html',   controller: AuthCtrl}).
      when('/main', {templateUrl: 'app/views/main.html',   controller: MainCtrl}).
      otherwise({controller: MainCtrl});
      // otherwise({redirectTo: '/welcome'});

}]);


appModule.directive("tree", function($compile) {
    return {
        restrict: "E",
        scope: {root: '='},
        templateUrl: 'app/views/_taskTree.html',
        compile: function(tElement, tAttr) {
            var contents = tElement.contents().remove();
            var compiledContents;
            return function(scope, iElement, iAttr) {
                if(!compiledContents) {
                    compiledContents = $compile(contents);
                }
                compiledContents(scope, function(clone, scope) {
                         iElement.append(clone); 
                });
            };
        }
    };
});

