class Project {
    #id
    #tasksList

    constructor(name) {
        this.name = name;
        this.#tasksList = [];
        this.#id = crypto.randomUUID()
    }

    get id() {
        return this.#id;
    }

    getAllTasks() {
        return this.#tasksList
    }

    addTask(task) {
        this.#tasksList.push(task)
    }

    removeTask(task) {
        const taskID = task.id;
        for (let i = 0; i < this.#tasksList.length; i++) {
            if (this.#tasksList[i].id === taskID) {
                this.#tasksList.splice(i, 1);
            }
        }
    }
}

export { Project }
