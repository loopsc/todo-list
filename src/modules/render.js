import addTaskDialog from "./components/dialogs/new-task";
import addProjectDialog from "./components/dialogs/new-project";
import createTaskCard from "./components/task-card";
import { Project } from "./project";
import { list } from "./projects-list";
import { Task } from "./task";
import { saveProjects, loadProjects } from "./storage";
import { format } from "date-fns";

function renderTasks(projectNameHeading, tasksContainer) {
    projectNameHeading.textContent = list.activeProject.name;
    console.log("Current active project", list.activeProject);

    // Clear the DOM
    tasksContainer.innerHTML = "";

    // Create taskcards and render
    list.activeProject.getAllTasks().forEach((task) => {
        const taskCard = createTaskCard(task);
        tasksContainer.appendChild(taskCard);
    });
}

/**
 *
 * @param {Project} project
 * @returns Button element representing parameter project
 */
function createProjectButton(project) {
    const projectButton = document.createElement("button");
    projectButton.classList.add("projects-button");
    projectButton.setAttribute("data-id", project.id);
    projectButton.textContent = project.name;

    return projectButton;
}

/**
 *
 * @param {FormData} form
 * @param {Dialog} dialog
 * Reset form. Close and remove dialog from DOM
 */
function handleFormClose(form, dialog) {
    form.reset();
    dialog.close();
    dialog.remove();
}

export default function render() {
    const newTaskButton = document.querySelector(".new-task-button");
    const contentDiv = document.querySelector(".content");
    const tasksContainer = document.querySelector(".tasks-container");
    const newProjectButton = document.querySelector(".new-project-button");
    const projectsListDiv = document.querySelector(".projects-list");
    const projectNameHeading = document.querySelector(".active-project-name");

    /**
     *
     * @param {Button} button Button to add event listener to
     * @param {Project} project Clicked project
     */
    function makeProjectActive(button, project) {
        button.addEventListener("click", () => {
            list.activeProject = project;

            renderTasks(projectNameHeading, tasksContainer);
        });
    }

    // Load data from local storage
    loadProjects();

    // Create variables after projects have been loaded from local storage
    const defaultProject = list.getAllProjects()[0];

    list.getAllProjects().forEach((project) => {
        // Create and append projects to list of projects
        const projectButton = createProjectButton(project);
        projectsListDiv.appendChild(projectButton);

        makeProjectActive(projectButton, project);
    });

    console.log("All projects after being loaded", list.getAllProjects());

    // Load the default on page load
    defaultProject.getAllTasks().forEach((task) => {
        const taskCard = createTaskCard(task);
        tasksContainer.appendChild(taskCard);
    });

    // Render and add new project
    newProjectButton.addEventListener("click", () => {
        const { dialog, form, projectName } = addProjectDialog();

        contentDiv.appendChild(dialog);

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            // Add project to list
            const project = new Project(projectName.value);
            list.addProject(project);
            console.log("List of all projects", list.getAllProjects());

            const projectButton = createProjectButton(project);
            // Append to the dom
            projectsListDiv.appendChild(projectButton);

            saveProjects()

            makeProjectActive(projectButton, project);

            handleFormClose(form, dialog);
        });
    });

    // Render and add new task
    newTaskButton.addEventListener("click", () => {
        const { dialog, form, inputs } = addTaskDialog();

        contentDiv.appendChild(dialog);

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            // Create a new task using inputs
            const name = inputs.taskInput.value;
            const desc = inputs.descTextarea.value;
            let due;
            if (inputs.dueInput.value === "") {
                due = format(new Date(), "yyyy-MM-dd");
            } else {
                due = inputs.dueInput.value;
            }
            const prio = inputs.prioritySelect.value;
            const task = new Task(name, desc, due, prio, list.activeProject);

            // Add the task to the current project
            list.activeProject.addTask(task);
            saveProjects();

            const taskCard = createTaskCard(task);
            tasksContainer.appendChild(taskCard);

            console.log(task);

            handleFormClose(form, dialog);
        });
    });
}
