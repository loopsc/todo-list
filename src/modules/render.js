import addTaskDialog from "./components/dialogs/new-task";
import addProjectDialog from "./components/dialogs/new-project";
import createTaskCard from "./components/task-card";
import { Project } from "./project";
import { list } from "./projects-list";
import { Task } from "./task";

export default function render() {
    const newTaskButton = document.querySelector(".new-task-button");
    const contentDiv = document.querySelector(".content");
    const tasksContainer = document.querySelector(".tasks-container");
    const newProjectButton = document.querySelector(".new-project-button");
    const projectsListDiv = document.querySelector(".projects-list")

    newProjectButton.addEventListener("click", () => {
        const { dialog, form, projectName } = addProjectDialog();

        contentDiv.appendChild(dialog);

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const project = new Project(projectName.value);
            list.addProject(project);
            console.log(list.getAllProjects());

            const newProjectButton = document.createElement("button")
            newProjectButton.classList.add("projects-button")
            newProjectButton.textContent = projectName.value

            projectsListDiv.appendChild(newProjectButton)
        });
    });

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
