class Observer{
    onChange(task:Task){  
    }
}

class TaskCondition {
    onAccept(task: Task) {

    }
    onSubmit(task: Task) {

    }
}

class Task {
    id: string;
    name: string;
    desc: string;
    status: TaskStatus;
    fromNpcId: string;
    toNpcId: string;
    
    private checkTaskStatus(){
        
    }
    public constructor(id, name, desc, status, fromNpcId, toNpcId) {
        this.id=id;
        this.name=name;
        this.desc=desc;
        this.status=status;
        this.fromNpcId=fromNpcId;
        this.toNpcId=toNpcId;
    }
}

enum TaskStatus {
    UNACCEPTABLE,
    ACCEPTABLE,
    DURING,
    CAN_SUBMIT,
    SUBMITTED,
}
