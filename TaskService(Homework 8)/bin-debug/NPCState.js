var TaskNoneState = (function () {
    function TaskNoneState(npc) {
        this.npc = npc;
    }
    var d = __define,c=TaskNoneState,p=c.prototype;
    p.onEnter = function () {
        console.log("Enter Task None State");
    };
    p.onExit = function () {
        console.log("Exit Task None State");
    };
    return TaskNoneState;
}());
egret.registerClass(TaskNoneState,'TaskNoneState',["State"]);
var TaskState = (function () {
    function TaskState(npc) {
        this.taskSighX = 15;
        this.taskSighY = 20;
        this.taskSighWidth = 30;
        this.taskSighHeight = 30;
        this.npc = npc;
        this.taskSign = new egret.Bitmap();
    }
    var d = __define,c=TaskState,p=c.prototype;
    p.onEnter = function () {
        this.drawTaskSign();
        this.npc.npcStage.addChild(this.taskSign);
    };
    p.onExit = function () {
        this.npc.npcStage.removeChild(this.taskSign);
    };
    p.drawTaskSign = function () {
        this.taskSign.x = this.taskSighX;
        this.taskSign.y = this.taskSighY;
        this.taskSign.width = this.taskSighWidth;
        this.taskSign.height = this.taskSighHeight;
        this.taskSign.texture = RES.getRes(emojiImage.ACCEPTABLEImage);
    };
    return TaskState;
}());
egret.registerClass(TaskState,'TaskState',["State"]);
var TaskDuringStatus = (function () {
    function TaskDuringStatus(npc) {
        this.taskSighX = 15;
        this.taskSighY = 20;
        this.taskSighWidth = 30;
        this.taskSighHeight = 30;
        this.npc = npc;
        this.taskSign = new egret.Bitmap();
    }
    var d = __define,c=TaskDuringStatus,p=c.prototype;
    p.onEnter = function () {
        this.drawTaskSign();
        this.npc.npcStage.addChild(this.taskSign);
    };
    p.onExit = function () {
        this.npc.npcStage.removeChild(this.taskSign);
    };
    p.drawTaskSign = function () {
        this.taskSign.x = this.taskSighX;
        this.taskSign.y = this.taskSighY;
        this.taskSign.width = this.taskSighWidth;
        this.taskSign.height = this.taskSighHeight;
        this.taskSign.texture = RES.getRes(emojiImage.DURINGImage);
    };
    return TaskDuringStatus;
}());
egret.registerClass(TaskDuringStatus,'TaskDuringStatus',["State"]);
var TaskSubmitStatus = (function () {
    function TaskSubmitStatus(npc) {
        this.taskSighX = 15;
        this.taskSighY = 20;
        this.taskSighWidth = 30;
        this.taskSighHeight = 30;
        this.npc = npc;
        this.taskSign = new egret.Bitmap();
    }
    var d = __define,c=TaskSubmitStatus,p=c.prototype;
    p.onEnter = function () {
        this.drawTaskSign();
        this.npc.npcStage.addChild(this.taskSign);
        console.log("Enter Task Submit State");
    };
    p.onExit = function () {
        this.npc.npcStage.removeChild(this.taskSign);
        console.log("Exit Task Submit State");
    };
    p.drawTaskSign = function () {
        this.taskSign.x = this.taskSighX;
        this.taskSign.y = this.taskSighY;
        this.taskSign.width = this.taskSighWidth;
        this.taskSign.height = this.taskSighHeight;
        this.taskSign.texture = RES.getRes(emojiImage.CAN_SUBMITImage);
    };
    return TaskSubmitStatus;
}());
egret.registerClass(TaskSubmitStatus,'TaskSubmitStatus',["State"]);
//# sourceMappingURL=NPCState.js.map