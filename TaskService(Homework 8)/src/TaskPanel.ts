class TaskPanel implements Observer {
	panel: egret.DisplayObjectContainer;
	stage: egret.DisplayObjectContainer;

	private taskService: TaskService;
	private currentTaskId: string;
	private currentTaskStatus: number;

	private bgColor_Task = 0xd6ecf0;              //Task Panel
	private rectTaskPanel: egret.Shape;
	private panelX = 20;
	private panelY = 350;
	private panelWidth = 250;
	private panelHeight = 200;

	private taskNameTextField: egret.TextField;
	private taskNameTextFieldText = "Task Panel";
	private taskNameTextFieldX = 46;
	private taskNameTextFieldY = 25;
	private taskNameTextFieldWidth = 200;
	private taskNameTextFieldHeight = 30;
	private taskNameTextFieldColor = 0x000000;

	private taskStateText: egret.TextField;       //状态
	private taskStateTextField = "";
	private taskStateTextX = 30;
	private taskStateTextY = 80;
	private taskStateTextWidth = 230;
	private taskStateTextColor = 0xFF0000;

	private button: egret.DisplayObjectContainer;
	private rectButton: egret.Shape;
	private buttonColor = 0xe3f9fd;         
	private buttonX = 50;
	private buttonY = 130;
	private buttonWidth = 150;
	private buttonHeight = 45;

	private buttonTextField: egret.TextField;
	private buttonText = "No Task";
	private buttonTextX = this.buttonX + 5;
	private buttonTextY = this.buttonY + 10;
	private buttonTextWidth = 180;
	private buttonTextColor = 0x808080;     //grey


	public constructor(stage: egret.DisplayObjectContainer, taskService: TaskService) {
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

	private setText() {
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


	}

	private drawTaskPanel() {
		this.rectTaskPanel.graphics.beginFill(this.bgColor_Task, 1);
		this.rectTaskPanel.graphics.drawRect(0, 0, this.panelWidth, this.panelHeight);
		this.rectTaskPanel.graphics.endFill();
	}
	
	private setButtonText() {
		this.buttonTextField.fontFamily = "KaiTi";
		this.buttonTextField.text = this.buttonText;
		this.buttonTextField.x = this.buttonTextX;
		this.buttonTextField.y = this.buttonTextY;
		this.buttonTextField.width = this.buttonTextWidth;
		this.buttonTextField.bold = false;
		this.buttonTextField.textColor = this.buttonTextColor;
	}

	private drawButton() {
		this.rectButton.graphics.beginFill(this.buttonColor, 1);
		this.rectButton.graphics.drawRect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
		this.rectButton.graphics.endFill();
		this.setButtonText();
		this.button.addChild(this.rectButton);
		this.button.addChild(this.buttonTextField);
	}

	public drawPanel() {
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

	}
	private onButtonClick(e: egret.TouchEvent) {
		switch (this.currentTaskStatus) {
			case TaskStatus.ACCEPTABLE:
				break;

			case TaskStatus.DURING:
				break;


			case TaskStatus.CAN_SUBMIT:
				break;

			default:

		}

	}


	public onChange(task: Task) {
		this.currentTaskId = task.id;
		this.changeTaskText(task.name, task.desc);
		this.changeButton(task.status);
		this.currentTaskStatus = task.status;
	}

	private changeTaskText(name: string, desc: string) {
		this.taskNameTextField.text = name;
		this.taskStateText.text = desc;
	}

	private changeButton(taskStatus: number) {
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
				this.taskNameTextField.text= "Task Panel";
				this.taskStateText.text= "NULL";
				this.buttonTextField.text = "No Task";
				break;

			default:
				this.buttonTextField.text = "None";
				break;

		}

	}




}
