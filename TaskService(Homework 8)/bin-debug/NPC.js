var emojiImage = {
    npc_0: "jz1_png",
    npc_1: "tq1_png",
    ACCEPTABLEImage: "exclamation_png",
    DURINGImage: "question_png",
    CAN_SUBMITImage: "question_png",
};
var NPC = (function () {
    function NPC(npcId, npcName, taskService, NPCtalkpanel, mockkillmonsterpanel) {
        this.tileSize = 64;
        this.emojiX = 0;
        this.emojiY = 64;
        this.npcStageWidth = 64;
        this.npcStageHeight = 128;
        this.npcStage = new egret.DisplayObjectContainer();
        this.npcStageShape = new egret.Shape();
        this.emoji = new egret.Bitmap();
        this.npcId = npcId;
        this.npcName = npcName;
        this.taskService = taskService;
        this.taskService.Attach(this, "NPC");
        this.taskNoneState = new TaskNoneState(this);
        this.taskState = new TaskState(this);
        this.taskDuringStatus = new TaskDuringStatus(this);
        this.taskSubmitStatus = new TaskSubmitStatus(this);
        this.taskStateMachine = new StateMachine(this.taskNoneState);
        this.NPCtalkpanel = NPCtalkpanel;
    }
    var d = __define,c=NPC,p=c.prototype;
    p.getTask = function () {
        this.task = this.taskService.getTask(this.rule, this.npcId);
        this.checkNpcState();
    };
    p.setNpc_0 = function (npcX, npcY) {
        this.emoji.texture = RES.getRes(emojiImage.npc_0);
        this.emoji.x = this.emojiX;
        this.emoji.y = this.emojiY;
        this.emoji.width = this.tileSize;
        this.emoji.height = this.tileSize;
        this.npcStageX = npcX;
        this.npcStageY = npcY;
    };
    p.setNpc_1 = function (npcX, npcY) {
        this.emoji.texture = RES.getRes(emojiImage.npc_1);
        this.emoji.x = this.emojiX;
        this.emoji.y = this.emojiY;
        this.emoji.width = this.tileSize;
        this.emoji.height = this.tileSize;
        this.npcStageX = npcX;
        this.npcStageY = npcY;
    };
    p.drawNpc = function () {
        this.npcStageShape.graphics.drawRect(0, 0, this.npcStageWidth, this.npcStageHeight);
        this.npcStageShape.graphics.endFill();
        this.npcStage.x = this.npcStageX;
        this.npcStage.y = this.npcStageY;
        this.npcStage.width = this.npcStageWidth;
        this.npcStage.height = this.npcStageHeight;
        this.npcStage.addChild(this.npcStageShape);
        this.npcStage.addChild(this.emoji);
        this.emoji.touchEnabled = true;
        //this.npcStage.touchEnabled = true;
        this.emoji.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNpcClick, this);
    };
    p.checkNpcState = function () {
        switch (this.task.status) {
            case TaskStatus.UNACCEPTABLE:
            case TaskStatus.SUBMITTED:
                this.taskStateMachine.changeState(this.taskNoneState);
                break;
            case TaskStatus.ACCEPTABLE:
                if (this.task.fromNpcId == this.npcId) {
                    this.taskStateMachine.changeState(this.taskState);
                }
                else {
                    this.taskStateMachine.changeState(this.taskNoneState);
                }
                break;
            case TaskStatus.DURING:
                if (this.task.toNpcId == this.npcId) {
                    this.taskStateMachine.changeState(this.taskDuringStatus);
                }
                else {
                    this.taskStateMachine.changeState(this.taskNoneState);
                }
                break;
            case TaskStatus.CAN_SUBMIT:
                if (this.task.toNpcId == this.npcId) {
                    this.taskStateMachine.changeState(this.taskSubmitStatus);
                }
                else {
                    this.taskStateMachine.changeState(this.taskNoneState);
                }
                break;
        }
    };
    p.onNpcClick = function (e, task, npcid) {
        if (task === void 0) { task = this.task; }
        if (npcid === void 0) { npcid = this.npcId; }
        this.taskService.checkTaskStatus(task, npcid, this.NPCtalkpanel);
    };
    p.onChange = function (task) {
        this.task = task;
        this.checkNpcState();
    };
    p.rule = function (taskList, npcId) {
        for (var i = 0; i < taskList.length; i++) {
            if (taskList[i].fromNpcId == npcId || taskList[i].toNpcId == npcId) {
                return taskList[i];
            }
        }
    };
    return NPC;
}());
egret.registerClass(NPC,'NPC');
var StateMachine = (function () {
    function StateMachine(currentState) {
        this.currentState = currentState;
        this.currentState.onEnter();
        console.log("State Init");
    }
    var d = __define,c=StateMachine,p=c.prototype;
    p.changeState = function (nextState) {
        this.currentState.onExit();
        this.currentState = nextState;
        this.currentState.onEnter();
        console.log("State change");
    };
    p.getState = function () {
        return this.currentState;
    };
    return StateMachine;
}());
egret.registerClass(StateMachine,'StateMachine');
//# sourceMappingURL=NPC.js.map