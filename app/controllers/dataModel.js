function Project(json) {
 
    var self = this;

    /* JSON format:
    "kind": "tasks#taskList",
    "id": "MDIxODQ2OTM2MTQ0OTM3MDQ4MTU6MDow",
    "title": "My Tasks",
    "selfLink": "https://www.googleapis.com/tasks/v1/users/@me/lists/MDIxODQ2OTM2MTQ0OTM3MDQ4MTU6MDow"
    */

    // -----------------------------------------------------------------------
    // CONSTRUCTOR
    // -----------------------------------------------------------------------
        this.id = json.id;
        this.title = json.title;
        this.selfLink = json.selfLink;

        this.tasks = [];
        this.taskMap = {};
        this.taskTree = {};        

        this.isLoaded = false;
        this.isSelected = false;
        this.isExpanded = true;


    // -----------------------------------------------------------------------
    // Public Methods
    // -----------------------------------------------------------------------

        this.addTasks = function(tasks) {
            for (var i = 0; i < tasks.length; i++) {
                var task = new Task(tasks[i]);
                self.tasks.push(task);
                self.taskMap[task.id] = task;
            }

            // var sortedData = cats = $(data).sort(sortItemsByTitle); 

            self.taskTree.id = 'none';
            self.taskTree.title = 'root';
            self.taskTree.children = [];
            attachChildrenToParent(self.taskTree, self.taskMap, 0);
        }


    // -----------------------------------------------------------------------
    // Private members
    // -----------------------------------------------------------------------

        function attachChildrenToParent(node, fullList, level) {
            // var children = {};
            var children = [];
            var childrenAttached = false;

            for (itemId in fullList) {
                var item = fullList[itemId];

                if (item.parentId == node.id) {
                    console.log( '  "' + item.title + '" attached to "' + node.title + '"');
                    // children[itemId] = item;
                    children.push(item);
                    item.level = level;
                    attachChildrenToParent(item, fullList, level+1);
                    childrenAttached = true;
                }
            }

            if (childrenAttached) {
                node.children = children;
                node.hasSubtasks = true;
            }

        }

    // // Sorting
    // function sortItemsByTitle(a,b) {  
    //     return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;  
    // } // ---------------------------------------------------------------------

 
}

function Task(json) {
 
  var self = this;

  /* JSON Sample:
    "kind": "tasks#task",
    "id": "MDIxODQ2OTM2MTQ0OTM3MDQ4MTU6MTgzMTEyMTM2OjMwNTg1NjEwNQ",
    "title": "task 2.3 level 1 description",
    "updated": "2011-10-22T21:34:21.000Z",
    "selfLink": "https://www.googleapis.com/tasks/v1/lists/MDIxODQ2OTM2MTQ0OTM3MDQ4MTU6MTgzMTEyMTM2OjA/tasks/MDIxODQ2OTM2MTQ0OTM3MDQ4MTU6MTgzMTEyMTM2OjMwNTg1NjEwNQ",
    "parent": "MDIxODQ2OTM2MTQ0OTM3MDQ4MTU6MTgzMTEyMTM2OjIyOTkwNDQzNw",
    "position": "00000000001879048191",
    "notes": "Task description\nSecond line",
    "status": "needsAction"  
    "due": "2011-10-25T00:00:00.000Z"
  */

  this.id = json.id;
  this.title = json.title;
  this.updated = json.updated;
  this.selfLink = json.selfLink;
  this.parentId = "none";
  if (json.parent != undefined && json.parent != "") {
    this.parentId = json.parent;
  }
  this.notes = json.notes;
  this.status = json.status;
  this.due = json.due;
  this.dueCustom = {};
  this.dueString = '';

  if (this.due == undefined) {
    // TODO: move to a config?
    this.dueString = "no date";
  } else {
    // self.dueCustom = moment(this.due);
    // self.dueString = self.dueCustom.format("DD MMM YYYY");
  }
  
  this.isExpanded = true;
  this.isInTree = false;
  this.hasSubtasks = false;
  this.level = 0;
}