class Project {
    #id;
    #tasksList;

    constructor(name) {
        this.name = name;
        this.#tasksList = [];
        this.#id = crypto.randomUUID();
    }

    get id() {
        return this.#id;
    }

    getAllTasks() {
        return this.#tasksList;
    }

    addTask(task) {
        this.#tasksList.push(task);
    }

    removeTask(task) {
        this.#tasksList = this.#tasksList.filter((t) => t.id !== task.id);
    }
}

export { Project };
