var TaskPanel = (function () {
    function TaskPanel(stage, taskService) {
        this.bgColor_Task = 0xd6ecf0; //Task Panel
        this.panelX = 20;
        this.panelY = 350;
        this.panelWidth = 250;
        this.panelHeight = 200;
        this.taskNameTextFieldText = "Task Panel";
        this.taskNameTextFieldX = 46;
        this.taskNameTextFieldY = 25;
        this.taskNameTextFieldWidth = 200;
        this.taskNameTextFieldHeight = 30;
        this.taskNameTextFieldColor = 0x000000;
        this.taskStateTextField = "";
        this.taskStateTextX = 30;
        this.taskStateTextY = 80;
        this.taskStateTextWidth = 230;
        this.taskStateTextColor = 0xFF0000;
        this.buttonColor = 0xe3f9fd;
        this.buttonX = 50;
        this.buttonY = 130;
        this.buttonWidth = 150;
        this.buttonHeight = 45;
        this.buttonText = "No Task";
        this.buttonTextX = this.buttonX + 5;
        this.buttonTextY = this.buttonY + 10;
        this.buttonTextWidth = 180;
        this.buttonTextColor = 0x808080; //grey
        this.stage = stage;
        this.taskService = taskService;
        this.taskService.Attach(this, "TaskPanel");
        this.panel = new egret.DisplayObjectContainer();
        this.taskNameTextField = new egret.TextField();
        this.taskStateText = new egret.TextField();
        this.rectTaskPanel = new egret.Shape();
        this.button = new egret.DisplayObjectContainer();
        this.rectButton = new egret.Shape();
        this.buttonTextField = new egret.TextField();
        this.stage.addChild(this.panel);
        this.drawPanel();
    }
    var d = __define,c=TaskPanel,p=c.prototype;
    p.setText = function () {
        this.taskNameTextField.fontFamily = "KaiTi";
        this.taskNameTextField.text = this.taskNameTextFieldText;
        this.taskNameTextField.x = this.taskNameTextFieldX;
        this.taskNameTextField.y = this.taskNameTextFieldY;
        this.taskNameTextField.width = this.taskNameTextFieldWidth;
        this.taskNameTextField.bold = true;
        this.taskNameTextField.textColor = this.taskNameTextFieldColor;
        this.taskStateText.fontFamily = "KaiTi";
        this.taskStateText.text = this.taskStateTextField;
        this.taskStateText.x = this.taskStateTextX;
        this.taskStateText.y = this.taskStateTextY;
        this.taskStateText.width = this.taskStateTextWidth;
        this.taskStateText.bold = false;
        this.taskStateText.textColor = this.taskStateTextColor;
        this.taskStateText.textAlign = egret.HorizontalAlign.LEFT;
    };
    p.drawTaskPanel = function () {
        this.rectTaskPanel.graphics.beginFill(this.bgColor_Task, 1);
        this.rectTaskPanel.graphics.drawRect(0, 0, this.panelWidth, this.panelHeight);
        this.rectTaskPanel.graphics.endFill();
    };
    p.setButtonText = function () {
        this.buttonTextField.fontFamily = "KaiTi";
        this.buttonTextField.text = this.buttonText;
        this.buttonTextField.x = this.buttonTextX;
        this.buttonTextField.y = this.buttonTextY;
        this.buttonTextField.width = this.buttonTextWidth;
        this.buttonTextField.bold = false;
        this.buttonTextField.textColor = this.buttonTextColor;
    };
    p.drawButton = function () {
        this.rectButton.graphics.beginFill(this.buttonColor, 1);
        this.rectButton.graphics.drawRect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
        this.rectButton.graphics.endFill();
        this.setButtonText();
        this.button.addChild(this.rectButton);
        this.button.addChild(this.buttonTextField);
    };
    p.drawPanel = function () {
        this.panel.x = this.panelX;
        this.panel.y = this.panelY;
        this.panel.width = this.panelWidth;
        this.panel.height = this.panelHeight;
        this.drawButton();
        this.drawTaskPanel();
        this.setText();
        this.panel.addChild(this.rectTaskPanel);
        this.panel.addChild(this.taskNameTextField);
        this.panel.addChild(this.taskStateText);
        this.panel.addChild(this.button);
        this.button.touchEnabled = true;
        this.button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
    };
    p.onButtonClick = function (e) {
        switch (this.currentTaskStatus) {
            case TaskStatus.ACCEPTABLE:
                break;
            case TaskStatus.DURING:
                break;
            case TaskStatus.CAN_SUBMIT:
                break;
            default:
        }
    };
    p.onChange = function (task) {
        this.currentTaskId = task.id;
        this.changeTaskText(task.name, task.desc);
        this.changeButton(task.status);
        this.currentTaskStatus = task.status;
    };
    p.changeTaskText = function (name, desc) {
        this.taskNameTextField.text = name;
        this.taskStateText.text = desc;
    };
    p.changeButton = function (taskStatus) {
        switch (taskStatus) {
            case TaskStatus.ACCEPTABLE:
                this.buttonTextField.text = "acceptable";
                break;
            case TaskStatus.DURING:
                this.buttonTextField.text = "unfinished";
                break;
            case TaskStatus.CAN_SUBMIT:
                this.buttonTextField.text = "submit";
                break;
            case TaskStatus.SUBMITTED:
                this.taskNameTextField.text = "Task Panel";
                this.taskStateText.text = "NULL";
                this.buttonTextField.text = "No Task";
                break;
            default:
                this.buttonTextField.text = "None";
                break;
        }
    };
    return TaskPanel;
}());
egret.registerClass(TaskPanel,'TaskPanel');
//# sourceMappingURL=TaskPanel.js.map