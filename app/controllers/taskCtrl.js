function TaskCtrl($scope) {

	console.log('');
	console.log('Controller started: ' + 'TaskCtrl');

	$scope.chevronClick = function (task, $event) {
		console.log('* chevronClick: ' + task.title);
		task.isExpanded = !task.isExpanded;
		// $event.stopPropagation();
	}

	$scope.taskItemClick = function (task) {
		console.log('* taskItemClick: ' + task.title);
		task.isSelected = !task.isSelected;
	}


}
