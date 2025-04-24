import { list } from "./projects-list";

class Task {
    #project;
    #id;
    #isComplete;

    constructor(title, desc, dueDate, prio, project=list.getAllProjects()[0]) {
        this.title = title;
        this.desc = desc;
        this.dueDate = dueDate;
        this.prio = prio;
        this.#project = project;
        this.#id = crypto.randomUUID()
        this.#isComplete = false
    }

    get project() {
        return this.#project;
    }

    get id() {
        return this.#id;
    }

    get isComplete() {
        return this.#isComplete;
    }

    toggleComplete() {
        this.#isComplete = !this.#isComplete
    }
}

export { Task };
