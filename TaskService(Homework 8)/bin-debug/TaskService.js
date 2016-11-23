var TaskService = (function () {
    function TaskService() {
        this.observerList = new Array();
        this.taskList = new Array();
        this.addTask("001");
        this.addTask("002");
    }
    var d = __define,c=TaskService,p=c.prototype;
    p.onChange = function () {
    };
    p.Attach = function (observer, type) {
        this.observerList.push(new ObserverType(observer, type));
    };
    p.Notify = function (task) {
        this.observerList.forEach(function (element) {
            element.observer.onChange(task);
        });
    };
    p.canAccepted = function (id) {
        var task;
        task = taskSearch(this.taskList, id);
        switch (id) {
            case "002":
                task.status = 1;
                this.Notify(task);
                break;
        }
    };
    p.canFinished = function (id) {
        var task;
        task = taskSearch(this.taskList, id);
        switch (id) {
            case "002":
                task.status = 3;
                this.Notify(task);
                break;
        }
    };
    p.finished = function (id) {
        var task;
        task = taskSearch(this.taskList, id);
        switch (id) {
            case "001":
                task.status = 4;
                this.Notify(task);
                this.canAccepted("002");
                break;
            case "002":
                task.status = 4;
                this.Notify(task);
                break;
            default:
                return ErrorCode.TASK_ERROR_UNFIND;
        }
    };
    p.accepted = function (id) {
        var task;
        task = taskSearch(this.taskList, id);
        switch (id) {
            case "001":
                task.status = TaskStatus.DURING;
                this.Notify(task);
                break;
            case "002":
                task.status = TaskStatus.DURING;
                this.Notify(task);
                break;
            default:
        }
    };
    p.during = function (id) {
        var task;
        task = taskSearch(this.taskList, id);
        switch (id) {
            case "001":
                this.Notify(task);
            case "002":
                this.Notify(task);
            default:
        }
    };
    p.addTask = function (id) {
        var task;
        task = taskSearch(this.taskList, id);
        switch (id) {
            case "001":
                var task = new Task("001", "Task 1", "Find NPC2", 0, "npc_0", "npc_1");
                task.status = 1;
                this.taskList.push(task);
                this.Notify(task);
                break;
            case "002":
                var task = new Task("002", "Task 2", "Kill 10 monster", 0, "npc_1", "npc_1");
                this.taskList.push(task);
                this.Notify(task);
                break;
        }
    };
    p.getTask = function (rule, Id) {
        return rule(this.taskList, Id);
    };
    p.checkTaskStatus = function (task, npcId, DialoguePanel) {
        switch (task.status) {
            case TaskStatus.ACCEPTABLE:
                switch (task.id) {
                    case "001":
                        if (task.fromNpcId == npcId) {
                            DialoguePanel.diaonOpen(task);
                            this.Notify(task);
                        }
                        break;
                    case "002":
                        if (task.fromNpcId == npcId) {
                            DialoguePanel.diaonOpen(task);
                            this.Notify(task);
                        }
                        break;
                }
                break;
            case TaskStatus.CAN_SUBMIT:
                switch (task.id) {
                    case "001":
                        if (task.toNpcId == npcId) {
                            this.Notify(task);
                        }
                    case "002":
                        if (task.toNpcId == npcId) {
                            DialoguePanel.diaonOpen(task);
                            this.Notify(task);
                        }
                        break;
                }
                break;
            case TaskStatus.DURING:
                switch (task.id) {
                    case "001":
                        if (task.toNpcId == npcId) {
                            task.status = TaskStatus.CAN_SUBMIT;
                            DialoguePanel.diaonOpen(task);
                            this.Notify(task);
                        }
                        break;
                    case "002":
                        if (task.toNpcId == npcId) {
                            this.Notify(task);
                        }
                        break;
                }
                break;
            case TaskStatus.SUBMITTED:
                switch (task.id) {
                    case "001":
                        this.Notify(task);
                        break;
                    case "002":
                        this.Notify(task);
                        break;
                }
                break;
            case TaskStatus.UNACCEPTABLE:
                switch (task.id) {
                    case "001":
                        this.Notify(task);
                        break;
                    case "002":
                        this.Notify(task);
                        break;
                }
                break;
        }
    };
    return TaskService;
}());
egret.registerClass(TaskService,'TaskService');
function taskSearch(taskList, id) {
    for (var i = 0; i <= taskList.length - 1; i++) {
        if (taskList[i].id == id) {
            return taskList[i];
        }
        else {
        }
    }
}
var ObserverType = (function () {
    function ObserverType(observer, type) {
        this.observer = observer;
        this.type = type;
    }
    var d = __define,c=ObserverType,p=c.prototype;
    return ObserverType;
}());
egret.registerClass(ObserverType,'ObserverType');
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["TASK_ERROR_NULL"] = 0] = "TASK_ERROR_NULL";
    ErrorCode[ErrorCode["TASK_ERROR_UNFIND"] = 1] = "TASK_ERROR_UNFIND";
})(ErrorCode || (ErrorCode = {}));
//# sourceMappingURL=TaskService.js.map