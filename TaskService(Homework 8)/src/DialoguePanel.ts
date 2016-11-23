class DialoguePanel {
	panel:egret.DisplayObjectContainer;
	stage:egret.DisplayObjectContainer;

	private taskService:TaskService;
	private npc:NPC;
	private currentTaskId:string;
	private currentTaskStatus:number;

	//private bgColor_Dia = 0x00FFFF;     //green
	private rectTaskPanel:egret.Shape;
	private panelX = 300;
	private panelY = 300;
	private panelWidth = 250;
	private panelHeight = 200;     

	private diaNameTextField:egret.TextField;
	private diaNameText = "";
	private diaNameTextX = 45;
	private diaNameTextY = 40;
	private diaNameTextWidth = 230;
	private diaNameTexColor = 0xFFFFFF;


	private diaStateText:egret.TextField;
	private diaStateTextField = "";
	private diaStateTextX = 20;
	private diaStateTextY = 90;
	private diaStateTextWidth = 230;
	private diaStateTextColor = 0xFF0000;
	
	private button:egret.DisplayObjectContainer;
	private rectButton:egret.Shape;
	private buttonColor = 0xC0C0C0;
	private buttonX = 40;
	private buttonY = 140;
	private buttonWidth = 180;
	private buttonHeight = 45;

	private buttonTextField:egret.TextField;
	private buttonText = "OK";
	private buttonTextX = this.buttonX + 15;
	private buttonTextY = this.buttonY + 10;
	private buttonTextWidth = 180;
	private buttonTextColor = 0x000000;


	public constructor(stage:egret.DisplayObjectContainer,taskService:TaskService) {
		this.stage = stage;
		this.taskService = taskService;
		this.panel = new egret.DisplayObjectContainer();
		this.diaNameTextField = new egret.TextField();
		this.diaStateText = new egret.TextField();
		this.rectTaskPanel = new egret.Shape();
		this.button = new egret.DisplayObjectContainer();
		this.rectButton = new egret.Shape();
		this.buttonTextField = new egret.TextField();
		this.drawPanel();
	}

	private setText(){
		this.diaNameTextField.text = this.diaNameText;
		this.diaNameTextField.x = this.diaNameTextX;
		this.diaNameTextField.y = this.diaNameTextY;
		this.diaNameTextField.width = this.diaNameTextWidth;
		this.diaNameTextField.bold = true;
		this.diaNameTextField.textColor = this.diaNameTexColor;

		this.diaStateText.text = this.diaStateTextField;
		this.diaStateText.x = this.diaStateTextX;
		this.diaStateText.y = this.diaStateTextY;
		this.diaStateText.width = this.diaStateTextWidth;
		this.diaStateText.bold = false;
		this.diaStateText.textColor = this.diaStateTextColor;
	}

	private drawDiaPanel() {
		this.rectTaskPanel.graphics.beginFill(0x0000,0.6);
		this.rectTaskPanel.graphics.drawRect(0,0,this.panelWidth,this.panelHeight);
		this.rectTaskPanel.graphics.endFill();
	}

	private drawButtonPanel() {
		this.rectButton.graphics.beginFill(this.buttonColor,1);
		this.rectButton.graphics.drawRect(this.buttonX,this.buttonY,this.buttonWidth,this.buttonHeight);
		this.rectButton.graphics.endFill();
	}

	private setButtonText() {
		this.buttonTextField.text = this.buttonText;
		this.buttonTextField.x = this.buttonTextX;
		this.buttonTextField.y = this.buttonTextY;
		this.buttonTextField.width = this.buttonTextWidth;
		this.buttonTextField.bold = false;
		this.buttonTextField.textColor = this.buttonTextColor;
	}

	private drawButton() {
		this.drawButtonPanel();
		this.rectButton.graphics.beginFill(this.buttonColor,1);
		this.rectButton.graphics.drawRect(this.buttonX,this.buttonY,this.buttonWidth,this.buttonHeight);
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
		this.drawDiaPanel();
		this.setText();
		this.panel.addChild(this.rectTaskPanel);
		this.panel.addChild(this.diaNameTextField);
		this.panel.addChild(this.diaStateText);
		this.panel.addChild(this.button);
		this.button.touchEnabled = true;
		this.button.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onButtonClick,this);

	}

	private onButtonClick(e:egret.TouchEvent) {          //按钮点击
		switch(this.currentTaskStatus){
			case TaskStatus.ACCEPTABLE:
				this.taskService.accepted(this.currentTaskId);
				break;
			case TaskStatus.CAN_SUBMIT:
				this.taskService.finished(this.currentTaskId);
				break;
			default:
		}

		this.stage.removeChild(this.panel);

	} 


	public showPanel() {
		this.stage.addChild(this.panel);
	}

	public removePanel() {
		this.stage.removeChild(this.panel);
	}

	public diaonOpen(task:Task) {
		this.currentTaskId = task.id;
		this.changeTaskText(task.name,task.desc);
		this.changeButton(task.status);
		this.currentTaskStatus = task.status;
		this.showPanel();
	} 

	private changeTaskText(name:string,desc:string) {
		this.diaNameTextField.text = name;
		this.diaStateText.text = desc;
	}

	private changeButton(taskStatus:number) {
		switch(taskStatus){
			case TaskStatus.ACCEPTABLE:
				this.buttonTextField.text = "accept task";
				break;

			case TaskStatus.CAN_SUBMIT:
				this.buttonTextField.text = "submit task";
				break;

			default:
				this.buttonTextField.text = "";
				break;
		}

	}
}