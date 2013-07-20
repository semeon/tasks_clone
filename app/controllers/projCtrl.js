function ProjCtrl($scope, AppSettings, gTasksApi, $log, $http) {

    console.log('');
    console.log('Controller started: ' + 'ProjCtrl');

    $scope.loadTasks = function(project) {
        console.log('** AJAX REQUEST **');
        console.log('- starting projects load');
        console.log('- request uri: ' + $scope.api.projectsRequestUri);

        // Response processor
        // -----------------------------------------------
            var processTaskList = function (data, project) {
                console.log('** AJAX RESPONSE **');
                console.log('- Task list request answered, project: ' + project.title);
                console.log(data);

                if (data.items) {      
                    project.addTasks(data.items);

                } else if (data.error) {
                    // dataLoadErrorOccured = true;
                    // pageController.processDataLoadError(data.error);
                } else {
                    // dataLoadErrorOccured = true;
                    // pageController.processDataLoadError();
                }

                console.log('===================');
                console.log(project);
                console.log('===================');
            }

        // Request
        // -----------------------------------------------
            $scope.api.requestTasks(project, processTaskList);
    }


    $scope.projectClick = function (project) {
        console.log('- project clicked: ' + project.title);
        project.isSelected = !project.isSelected;

        if (project.isSelected) {
            $scope.loadTasks(project);
        }
    }



}
