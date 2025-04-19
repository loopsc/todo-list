class Projects {
    #id

    constructor(name, taskList) {
        this.name = name;
        this.taskList = taskList;
        this.#id = crypto.randomUUID()
    }

    get id() {
        return this.#id;
    }

    get name() {
        return this.name;
    }

    getTasks() {
        if (this.taskList.length === 0) {
            return "No tasks in this project."
        }
        else return this.taskList;
    }

    addTask(task) {
        this.taskList.push(task)
    }

    removeTask(task) {
        const taskID = task.id;
        for (let i = 0; i < this.taskList.length; i++) {
            if (this.taskList[i].id === taskID) {
                this.taskList.splice(i, 1);
            }
        }
    }
}

export { Projects }
