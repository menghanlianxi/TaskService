class MonsterKilledPanel {
    panel: egret.DisplayObjectContainer;
    stage: egret.DisplayObjectContainer;

    private taskService: TaskService;
    private currentTaskId: string;
    private currentTaskState: number;
    
    private monsterPanel: egret.DisplayObjectContainer;
    private rectMP: egret.Shape;
    private mpColor = 0xd6ecf0;
    private mpX = 20;
    private mpY = 600;
    private mpWidth = 250;
    private mpHeight = 50;

    private mpTextField: egret.TextField;
    private mpTextFieldText = " Kill a monster";
    private mpTextFieldX = this.mpX + 8;
    private mpTextFieldY = this.mpY + 5;
    private mpTextFieldWidth = 230;
    private mpTextFieldColor = 0x000000;
    public monsterAmount = 0;

    public constructor(stage: egret.DisplayObjectContainer, taskService: TaskService) {
        this.stage = stage;
        this.taskService = taskService;
        this.taskService.Attach(this, "MonsterKilledPanel");
        this.panel = new egret.DisplayObjectContainer();
        this.monsterPanel = new egret.DisplayObjectContainer();
        this.rectMP = new egret.Shape();
        this.mpTextField = new egret.TextField();
        this.stage.addChild(this.panel);
        this.drawPanel();
    }

    private setButtonText() {
        this.mpTextField.fontFamily = "KaiTi";
        this.mpTextField.text = this.mpTextFieldText;
        this.mpTextField.x = this.mpTextFieldX;
        this.mpTextField.y = this.mpTextFieldY;
        this.mpTextField.width = this.mpTextFieldWidth;
        this.mpTextField.bold = false;
        this.mpTextField.textColor = this.mpTextFieldColor;

    }
    private drawButton() {
        this.rectMP.graphics.beginFill(this.mpColor, 1);
        this.rectMP.graphics.drawRect(this.mpX, this.mpY, this.mpWidth, this.mpHeight);
        this.rectMP.graphics.endFill();

        this.setButtonText();
        this.monsterPanel.addChild(this.rectMP);
        this.monsterPanel.addChild(this.mpTextField);
    }

    public drawPanel() {
        this.drawButton();
        this.panel.addChild(this.monsterPanel);

        this.monsterPanel.touchEnabled = true;
        this.monsterPanel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);

    }
    private onButtonClick(e: egret.TouchEvent) {
        switch (this.currentTaskState) {
            case TaskStatus.ACCEPTABLE:
                break;

            case TaskStatus.DURING:
                this.monsterAmount++;
                console.log(this.monsterAmount);
                if(this.monsterAmount==10){
                    this.taskService.canFinished(this.currentTaskId);
                }
                break;


            case TaskStatus.CAN_SUBMIT:
                this.monsterAmount = 0;
                break;

            default:

        }

    }
    public onChange(task: Task) {
        this.currentTaskId = task.id;
        this.currentTaskState = task.status;

    }
}