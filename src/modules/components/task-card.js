import { Task } from "../task";

/**
 * 
 * @param {Task} task - A Task object
 * @returns a rendered card onto the DOM
 */
export default function createTaskCard(task) {
    const card = document.createElement("div");
    card.classList.add("task-div");

    const title = document.createElement("p");
    title.classList.add("task-title");
    title.textContent = `Title: ${task.title}`;

    const desc = document.createElement("p");
    desc.classList.add("task-desc");
    desc.textContent = task.desc;

    const due = document.createElement("p");
    due.classList.add("task-due-date");
    due.textContent = `Due: ${task.dueDate}`;

    const prio = document.createElement("p");
    prio.classList.add("task-priority");
    prio.textContent = `Priority: ${task.prio}`;

    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(due);
    card.appendChild(prio);

    return card;
}
