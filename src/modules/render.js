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
    const projectsListDiv = document.querySelector(".projects-list");
    const defaultProjectButton = document.querySelector(".default-project");
    const projectNameHeading = document.querySelector(".active-project-name")
    const defaultProject = list.getAllProjects()[0];
    let activeProject = defaultProject;

    // Default project
    defaultProjectButton.addEventListener("click", () => {
        activeProject = defaultProject;
        projectNameHeading.textContent = "Default"
        console.log("Current active project", activeProject);

        // Clear the DOM
        tasksContainer.innerHTML = "";
        if (defaultProject.getAllTasks())

        // Append each task in the project to the DOM as cards
        defaultProject.getAllTasks().forEach(task => {
            const taskCard = createTaskCard(task);
            tasksContainer.appendChild(taskCard);
        });
    });

    // Render and add new project
    newProjectButton.addEventListener("click", () => {
        const { dialog, form, projectName } = addProjectDialog();

        contentDiv.appendChild(dialog);

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const project = new Project(projectName.value);
            list.addProject(project);
            console.log("List of all projects", list.getAllProjects());

            // Create the button
            const newProjectButton = document.createElement("button");
            newProjectButton.classList.add("projects-button");
            newProjectButton.setAttribute("data-id", project.id);
            newProjectButton.textContent = projectName.value;

            // Append to the dom
            projectsListDiv.appendChild(newProjectButton);

            form.reset();
            dialog.close();
            dialog.remove();

            // Set as current active project
            newProjectButton.addEventListener("click", () => {
                activeProject = project;
                projectNameHeading.textContent = activeProject.name
                console.log("Current active project", activeProject);

                // Clear the DOM
                tasksContainer.innerHTML = "";

                // Add all tasks in projec to DOM
                activeProject.getAllTasks().forEach(task => {
                    const taskCard = createTaskCard(task);
                    tasksContainer.appendChild(taskCard)
                })


            });
        });
    });

    // Render and add new task
    newTaskButton.addEventListener("click", () => {
        const { dialog, form, inputs } = addTaskDialog();

        contentDiv.appendChild(dialog);

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            // Create a new task using inputs
            const name = inputs.taskName.value;
            const desc = inputs.descTextarea.value;
            const due = inputs.dueInput.value;
            const prio = inputs.prioritySelect.value;
            const task = new Task(name, desc, due, prio, activeProject);

            // Add the task to the current project
            activeProject.addTask(task);

            const taskCard = createTaskCard(task);
            tasksContainer.appendChild(taskCard);

            console.log(task)

            form.reset();
            dialog.close();
            dialog.remove();
        });
    });
}
