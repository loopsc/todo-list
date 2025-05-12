import addTaskDialog from "./components/dialogs/new-task";
import addProjectDialog from "./components/dialogs/new-project";
import createTaskCard from "./components/task-card";
import { Project } from "./project";
import { list } from "./projects-list";
import { Task } from "./task";
import { saveProjects, loadProjects } from "./storage";
import { format } from "date-fns";
import editProjectDialog from "./components/dialogs/edit-project";
import * as utils from "./utils";

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
 * @returns Button element representing project
 */
function createProjectButton(project) {
    const projectButton = document.createElement("button");
    projectButton.classList.add("projects-button");
    projectButton.setAttribute("data-id", project.id);
    projectButton.textContent = project.name;

    return projectButton;
}

export default function render() {
    const newTaskButton = document.querySelector(".new-task-button");
    const contentDiv = document.querySelector(".content");
    const tasksContainer = document.querySelector(".tasks-container");
    const newProjectButton = document.querySelector(".new-project-button");
    const projectsListDiv = document.querySelector(".projects-list");
    const projectNameHeading = document.querySelector(".active-project-name");
    const editProjectButton = document.querySelector(".edit-project-button");

    /**
     * Set and display the current active project on the DOM
     * @param {Button} button Button to add event listener to
     * @param {Project} project Clicked project
     */
    function makeProjectActive(project) {
        list.activeProject = project;

        renderTasks(projectNameHeading, tasksContainer);
    }

    /**
     * Renders the projects list buttons
     * @param {Div} projectsListDiv
     */
    function renderProjectButtons(projectsListDiv) {
        projectsListDiv.innerHTML = "";

        list.getAllProjects().forEach((project) => {
            const projectButton = createProjectButton(project);
            projectsListDiv.appendChild(projectButton);

            projectButton.addEventListener("click", () => {
                makeProjectActive(project);
            });
        });
    }

    // Initial loading of page
    // Load data from local storage
    loadProjects();
    renderProjectButtons(projectsListDiv);
    renderTasks(projectNameHeading, tasksContainer);

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

            saveProjects();
            makeProjectActive(project);

            projectButton.addEventListener("click", () => {
                makeProjectActive(project);
            });

            utils.handleFormClose(form, dialog);
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

            utils.handleFormClose(form, dialog);
        });
    });

    editProjectButton.addEventListener("click", () => {
        // prettier-ignore
        const { dialog, form, newNameInput, deleteButton } = editProjectDialog(list.activeProject);

        contentDiv.appendChild(dialog);

        form.addEventListener("submit", () => {
            list.activeProject.name = newNameInput.value;

            saveProjects();
            renderProjectButtons(projectsListDiv);
            renderTasks(projectNameHeading, tasksContainer);
        });

        deleteButton.addEventListener("click", () => {
            list.removeProject(list.activeProject);

            list.activeProject = defaultProject;

            saveProjects();

            renderProjectButtons(projectsListDiv);
            list.activeProject = defaultProject;
            renderTasks(projectNameHeading, tasksContainer);

            utils.handleFormClose(form, dialog);
        });
    });
}
