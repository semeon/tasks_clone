// Application Settings
// -------------------------------------------
  appModule.factory('AppSettings', function(){
    var settings = {};

    // System Settings
    // ----------------------------------------------------------------
      settings.sys = {};
      settings.sys.logging = true;
      settings.sys.rootAddress = 'http://localhost/angularTasks/';


    // Auth settings
    // ----------------------------------------------------------------
      settings.auth = {};

      // http://code.google.com/apis/accounts/docs/OAuth2.html
      settings.auth.requestUriBase = 'https://accounts.google.com/o/oauth2/auth';

      // Logout uri
      settings.auth.logoutUri = 'https://accounts.google.com/Logout?continue=';
      
      // client_id (required) 
      // This is how Google identifies your application
      // Google will give you a client_id when you register your app with Google.
      settings.auth.clientId = '345458471597.apps.googleusercontent.com';

      // redirect_uri (required)
      // The URL on your site that will handle OAuth responses after the user takes an action on the dialog. 
      // You'll need to register the redirect_uri you'd like to use in advance. 
      // See the Registering your app with Google section for details on how to register.
      //
      //    https://code.google.com/apis/console
      //
      var location = window.location.href;
      if( location.indexOf('#') != -1 ) {
        location = location.substr(0, location.indexOf('#'));
      }
      settings.auth.redirectUri = location;


      // scope (required)
      // URL identifying the Google service to be accessed. 
      // See the documentation for the API you'd like to use for what scope to specify. 
      // To specify more than one scope, list each one separated with a space.
      settings.auth.scope = 'https://www.googleapis.com/auth/tasks';

      // response_type (required) 
      // Either code or token. Use code for the server-side flow. For the client-side flow, use token.
      settings.auth.responseType = 'token';

      // state (optional) 
      // A string used to maintain state between the request and redirect. 
      // This value will be appended to your redirect_uri after the user takes an action on the OAuth dialog.
      settings.auth.state = '';


      // access token 
      settings.auth.accessToken = false;
      var fakeUrl = window.location.href.replace('#/', '?');
      var urlAccToken = $.url(fakeUrl).param('access_token');   

      if (urlAccToken != undefined && urlAccToken != '') {
        settings.auth.accessToken = urlAccToken;
      }

    return settings;
  });


// Application State
// -------------------------------------------
  appModule.factory('AppState', function(){
    var state = {};


    // AUTH
    // ------------------------------------------
    state.loggedIn = false;

    return state;
  });


// Google Tasks API
// -------------------------------------------
  appModule.factory('gTasksApi', ['$http', 'AppSettings', function($http, AppSettings) {

    var api = {};


    api.projectsRequestUri = 'https://www.googleapis.com/tasks/v1/users/@me/lists?callback=JSON_CALLBACK';

    api.tasksRequestUri = function(projectId) {
      var uri = 'https://www.googleapis.com/tasks/v1/lists/' + projectId + '/tasks?callback=JSON_CALLBACK';
      return uri;
    };


    var params = {access_token: AppSettings.auth.accessToken};

    api.requestProjects = function(callback) {
        $http.jsonp(api.projectsRequestUri, {params: params}).
        success( function(data) {
                  callback(data);
                });
    }

    api.requestTasks = function(project, callback) {
        $http.jsonp(api.tasksRequestUri(project.id), {params: params}).
        success( function(data) {
                  callback(data, project);
                });
    }


    return api;
  }]);


