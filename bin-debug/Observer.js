var NPC = (function (_super) {
    __extends(NPC, _super);
    function NPC(id, ad, x, y, dp) {
        _super.call(this);
        this._body = new egret.Bitmap();
        this._emoji = new egret.Bitmap();
        this.dialoguePanel = dp;
        this._body.texture = RES.getRes(ad);
        this._emoji.texture = RES.getRes("notice_png");
        this.id = id;
        this.x = x;
        this.y = y;
        this._body.width = this._body.width / 3;
        this._body.height = this._body.height / 3;
        this._emoji.width = this._emoji.width / 5;
        this._emoji.height = this._emoji.height / 5;
        this._emoji.y = -100;
        this._emoji.alpha = 0;
        this.addChild(this._body);
        this.addChild(this._emoji);
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onNPCClick, this);
    }
    var d = __define,c=NPC,p=c.prototype;
    p.onChange = function (task) {
        if (task.status == TaskStatus.ACCEPTABLE && this.id == task.fromNpcId) {
            this._emoji.alpha = 1;
        }
        if (task.status == TaskStatus.CAN_SUBMIT && this.id == task.fromNpcId) {
            this._emoji.alpha = 0;
        }
        if (task.status == TaskStatus.CAN_SUBMIT && this.id == task.toNpcId) {
            this._emoji.texture = RES.getRes("notice_png");
            this._emoji.alpha = 1;
        }
        if (task.status == TaskStatus.SUBMITED && this.id == task.toNpcId) {
            this._emoji.alpha = 0;
        }
    };
    p.onNPCClick = function () {
        this.dialoguePanel.showDpanel();
        TaskService.getInstance().notify(TaskService.getInstance().taskList["000"]);
    };
    return NPC;
}(egret.DisplayObjectContainer));
egret.registerClass(NPC,'NPC',["Observer"]);
var TaskPanel = (function (_super) {
    __extends(TaskPanel, _super);
    function TaskPanel(x, y) {
        _super.call(this);
        this.x = x;
        this.y = y;
        this.body = new egret.Shape();
        this.textField = new egret.TextField();
        this.body.graphics.beginFill(0x000000, 0.4);
        this.body.graphics.endFill();
        this.textField.text = "   任务进程    ";
        this.textField.x = x;
        this.textField.x = y;
        this.textField2 = new egret.TextField();
        this.textField2.x = 0;
        this.textField2.y = 98;
        this.addChild(this.body);
        this.addChild(this.textField);
        this.addChild(this.textField2);
    }
    var d = __define,c=TaskPanel,p=c.prototype;
    p.onChange = function (task) {
        this.textField.text = task.desc;
        this.textField2.text = task.name + " :" + task.status.toString();
    };
    return TaskPanel;
}(egret.DisplayObjectContainer));
egret.registerClass(TaskPanel,'TaskPanel',["Observer"]);
var DialoguePanel = (function (_super) {
    __extends(DialoguePanel, _super);
    function DialoguePanel(talk) {
        _super.call(this);
        this.body = new egret.Shape();
        this.body.graphics.beginFill(0x000000, 0.5);
        this.body.graphics.drawRect(0, 0, 800, 172);
        this.body.graphics.endFill();
        this.body.y = 1000;
        this.textField = new egret.TextField();
        this.textField.text = talk;
        this.button = new Button("OK_png");
        this.textField.x = 160;
        this.textField.y = 1050;
        this.button.width = 40;
        this.button.height = 40;
        this.button.x = 500;
        this.button.y = 1000;
        this.button.touchEnabled = true;
        this.button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
    }
    var d = __define,c=DialoguePanel,p=c.prototype;
    p.showDpanel = function () {
        this.addChild(this.body);
        this.addChild(this.button);
        this.addChild(this.textField);
    };
    p.disshowDpanel = function () {
        this.removeChild(this.body);
        this.removeChild(this.button);
        this.removeChild(this.textField);
    };
    p.onButtonClick = function () {
        this.disshowDpanel();
        switch (TaskService.getInstance().taskList["000"].status) {
            case TaskStatus.ACCEPTABLE:
                TaskService.getInstance().accept("000");
                break;
            case TaskStatus.CAN_SUBMIT:
                TaskService.getInstance().finish("000");
                break;
            default:
                return;
        }
        TaskService.getInstance().notify(TaskService.getInstance().taskList["000"]);
    };
    return DialoguePanel;
}(egret.DisplayObjectContainer));
egret.registerClass(DialoguePanel,'DialoguePanel');
var Button = (function (_super) {
    __extends(Button, _super);
    function Button(ad) {
        _super.call(this);
        this.body = new egret.Bitmap();
        this.body.texture = RES.getRes(ad);
        this.addChild(this.body);
        this.touchEnabled = true;
    }
    var d = __define,c=Button,p=c.prototype;
    return Button;
}(egret.DisplayObjectContainer));
egret.registerClass(Button,'Button');
//# sourceMappingURL=Observer.js.map