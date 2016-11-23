var Observer = (function () {
    function Observer() {
    }
    var d = __define,c=Observer,p=c.prototype;
    p.onChange = function (task) {
    };
    return Observer;
}());
egret.registerClass(Observer,'Observer');
var TaskCondition = (function () {
    function TaskCondition() {
    }
    var d = __define,c=TaskCondition,p=c.prototype;
    p.onAccept = function (task) {
    };
    p.onSubmit = function (task) {
    };
    return TaskCondition;
}());
egret.registerClass(TaskCondition,'TaskCondition');
var Task = (function () {
    function Task(id, name, desc, status, fromNpcId, toNpcId) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.status = status;
        this.fromNpcId = fromNpcId;
        this.toNpcId = toNpcId;
    }
    var d = __define,c=Task,p=c.prototype;
    p.checkTaskStatus = function () {
    };
    return Task;
}());
egret.registerClass(Task,'Task');
var TaskStatus;
(function (TaskStatus) {
    TaskStatus[TaskStatus["UNACCEPTABLE"] = 0] = "UNACCEPTABLE";
    TaskStatus[TaskStatus["ACCEPTABLE"] = 1] = "ACCEPTABLE";
    TaskStatus[TaskStatus["DURING"] = 2] = "DURING";
    TaskStatus[TaskStatus["CAN_SUBMIT"] = 3] = "CAN_SUBMIT";
    TaskStatus[TaskStatus["SUBMITTED"] = 4] = "SUBMITTED";
})(TaskStatus || (TaskStatus = {}));
//# sourceMappingURL=Task.js.map