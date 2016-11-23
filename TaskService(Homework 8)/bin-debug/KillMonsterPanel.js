var MonsterKilledPanel = (function () {
    function MonsterKilledPanel(stage, taskService) {
        this.mpColor = 0xd6ecf0;
        this.mpX = 20;
        this.mpY = 600;
        this.mpWidth = 250;
        this.mpHeight = 50;
        this.mpTextFieldText = " Kill a monster";
        this.mpTextFieldX = this.mpX + 8;
        this.mpTextFieldY = this.mpY + 5;
        this.mpTextFieldWidth = 230;
        this.mpTextFieldColor = 0x000000;
        this.monsterAmount = 0;
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
    var d = __define,c=MonsterKilledPanel,p=c.prototype;
    p.setButtonText = function () {
        this.mpTextField.fontFamily = "KaiTi";
        this.mpTextField.text = this.mpTextFieldText;
        this.mpTextField.x = this.mpTextFieldX;
        this.mpTextField.y = this.mpTextFieldY;
        this.mpTextField.width = this.mpTextFieldWidth;
        this.mpTextField.bold = false;
        this.mpTextField.textColor = this.mpTextFieldColor;
    };
    p.drawButton = function () {
        this.rectMP.graphics.beginFill(this.mpColor, 1);
        this.rectMP.graphics.drawRect(this.mpX, this.mpY, this.mpWidth, this.mpHeight);
        this.rectMP.graphics.endFill();
        this.setButtonText();
        this.monsterPanel.addChild(this.rectMP);
        this.monsterPanel.addChild(this.mpTextField);
    };
    p.drawPanel = function () {
        this.drawButton();
        this.panel.addChild(this.monsterPanel);
        this.monsterPanel.touchEnabled = true;
        this.monsterPanel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
    };
    p.onButtonClick = function (e) {
        switch (this.currentTaskState) {
            case TaskStatus.ACCEPTABLE:
                break;
            case TaskStatus.DURING:
                this.monsterAmount++;
                console.log(this.monsterAmount);
                if (this.monsterAmount == 10) {
                    this.taskService.canFinished(this.currentTaskId);
                }
                break;
            case TaskStatus.CAN_SUBMIT:
                this.monsterAmount = 0;
                break;
            default:
        }
    };
    p.onChange = function (task) {
        this.currentTaskId = task.id;
        this.currentTaskState = task.status;
    };
    return MonsterKilledPanel;
}());
egret.registerClass(MonsterKilledPanel,'MonsterKilledPanel');
//# sourceMappingURL=KillMonsterPanel.js.map