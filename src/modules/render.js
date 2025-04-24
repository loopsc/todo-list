import addTaskDialog from "./components/dialogs/new-task";
import createTaskCard from "./components/task-card";
import { Projects } from "./projects";
import { list } from "./projects-list";
import { Task } from "./task";

export default function render() {
    const newTaskButton = document.querySelector(".new-task-button");
    const contentDiv = document.querySelector(".content");
    const tasksContainer = document.querySelector(".tasks-container");

    newTaskButton.addEventListener("click", () => {
        const { dialog, form, inputs } = addTaskDialog();

        contentDiv.appendChild(dialog);

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = inputs.taskName.value;
            const desc = inputs.descTextarea.value;
            const due = inputs.dueInput.value;
            const prio = inputs.prioritySelect.value;

            const task = new Task(name, desc, due, prio);
            const defaultProject = list.getAllProjects()[0];

            defaultProject.addTask(task);

            const taskCard = createTaskCard(task);
            tasksContainer.appendChild(taskCard);

            console.log(defaultProject.getTasks());
            form.reset();
            dialog.close();
            dialog.remove();
        });
    });
}
