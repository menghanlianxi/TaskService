var emojiImage = {
    npc_0: "jz1_png",
    npc_1: "tq1_png",
    ACCEPTABLEImage: "notice_png",
    DURINGImage: "notice_png",
    CAN_SUBMITImage: "notice_png",
};

class NPC implements Observer {

    public npcStage: egret.DisplayObjectContainer;

    taskService: TaskService;
    task: Task;

    npcId: string;
    npcName: string;

    emoji: egret.Bitmap;
    tileSize: number = 64;
    emojiX: number = 0;
    emojiY: number = 64;

    npcStageShape: egret.Shape;
    npcStageX: number;
    npcStageY: number;
    npcStageWidth = 64;
    npcStageHeight = 128;

    taskNoneState: State;
    taskState: State;
    taskSubmitStatus: State;
    taskDuringStatus: State;
    taskStateMachine: StateMachine;
    NPCtalkpanel:DialoguePanel;
    mockkillmosterbutton:MonsterKilledPanel;

    public constructor(npcId: string, npcName: string, taskService,NPCtalkpanel:DialoguePanel,mockkillmonsterpanel:MonsterKilledPanel) {
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
        this.NPCtalkpanel=NPCtalkpanel;
    }

    getTask() {
        this.task = this.taskService.getTask(this.rule, this.npcId);
        this.checkNpcState();
    }
    

    setNpc_0(npcX: number, npcY: number) {
        this.emoji.texture = RES.getRes(emojiImage.npc_0);
        this.emoji.x = this.emojiX;
        this.emoji.y = this.emojiY;
        this.emoji.width = this.tileSize;
        this.emoji.height = this.tileSize;
        this.npcStageX = npcX;
        this.npcStageY = npcY;
    }
    setNpc_1(npcX: number, npcY: number) {
        this.emoji.texture = RES.getRes(emojiImage.npc_1);
        this.emoji.x = this.emojiX;
        this.emoji.y = this.emojiY;
        this.emoji.width = this.tileSize;
        this.emoji.height = this.tileSize;
        this.npcStageX = npcX;
        this.npcStageY = npcY;
    }

    drawNpc() {
        this.npcStageShape.graphics.drawRect(0, 0, this.npcStageWidth, this.npcStageHeight);
        this.npcStageShape.graphics.endFill();

        this.npcStage.x = this.npcStageX;
        this.npcStage.y = this.npcStageY;
        this.npcStage.width = this.npcStageWidth;
        this.npcStage.height = this.npcStageHeight;

        this.npcStage.addChild(this.npcStageShape);
        this.npcStage.addChild(this.emoji);
        this.emoji.touchEnabled = true;
        this.emoji.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNpcClick, this);
    }

    checkNpcState() {
        switch (this.task.status) {
            case TaskStatus.UNACCEPTABLE:
            case TaskStatus.SUBMITTED:
                this.taskStateMachine.changeState(this.taskNoneState);
                break;

            case TaskStatus.ACCEPTABLE:
                if (this.task.fromNpcId == this.npcId) {
                    this.taskStateMachine.changeState(this.taskState);
                } else {
                    this.taskStateMachine.changeState(this.taskNoneState);
                }
                break;
            case TaskStatus.DURING:
                if (this.task.toNpcId == this.npcId) {
                    this.taskStateMachine.changeState(this.taskDuringStatus);
                } else {
                    this.taskStateMachine.changeState(this.taskNoneState);
                }
                break;


            case TaskStatus.CAN_SUBMIT:
                if (this.task.toNpcId == this.npcId) {
                    this.taskStateMachine.changeState(this.taskSubmitStatus);
                } else {
                    this.taskStateMachine.changeState(this.taskNoneState);
                }
                break;
        }

    }

    onNpcClick(e: egret.TouchEvent, task: Task = this.task, npcid: string = this.npcId) {
        this.taskService.checkTaskStatus(task, npcid,this.NPCtalkpanel);
    }

    onChange(task: Task) {
        this.task = task;
        this.checkNpcState();
    }

    rule(taskList: Task[], npcId: string): Task {
        for (var i = 0; i < taskList.length; i++) {
            if (taskList[i].fromNpcId == npcId || taskList[i].toNpcId == npcId) {
                return taskList[i];

            }
        }
    }

}

interface State {
    onEnter: Function;
    
    onExit: Function

}

class StateMachine {

    private currentState: State;

    public constructor(currentState: State) {
        this.currentState = currentState;
        this.currentState.onEnter();
        console.log("State Init");
    }

    public changeState(nextState: State): void {
        this.currentState.onExit();
        this.currentState = nextState;
        this.currentState.onEnter();
        console.log("State change");

    }

    public getState(): State {
        return this.currentState;

    }

}

