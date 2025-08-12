import addTaskDialog from "./components/dialogs/new-task";
import addProjectDialog from "./components/dialogs/new-project";
import createTaskCard from "./components/task-card";
import { Project } from "./project";
import { list } from "./projects-list";
import { loadProjects, saveProjects } from "./storage";
import editProjectDialog from "./components/dialogs/edit-project";

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

    projectButton.style.backgroundColor = project.colour || "#85b7bb";

    return projectButton;
}

export default function render() {
    const newTaskButton = document.querySelector(".new-task-button");
    const tasksContainer = document.querySelector(".tasks-container");
    const newProjectButton = document.querySelector(".new-project-button");
    const projectsListDiv = document.querySelector(".projects-list");
    const projectNameHeading = document.querySelector(".active-project-name");
    const editProjectButton = document.querySelector(".edit-project-button");
    const editColoursButton = document.querySelector(".edit-colours-button");
    const colourPicker = document.getElementById("colourPicker");
    const banner = document.querySelector(".content-header-bar");

    /**
     * Set and display the current active project on the DOM
     * @param {Button} button Button to add event listener to
     * @param {Project} project Clicked project
     */
    function makeProjectActive(project) {
        list.activeProject = project;
        const colour = project.colour;

        banner.style.backgroundColor = colour;

        const activeBtn = projectsListDiv.querySelector(
            `[data-id="${list.activeProject.id}"]`
        );
        if (activeBtn) {
            activeBtn.style.backgroundColor = colour;
        }

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
    makeProjectActive(list.activeProject);
    renderTasks(projectNameHeading, tasksContainer);

    // Render and add new project
    newProjectButton.addEventListener("click", async () => {
        try {
            const project = await addProjectDialog();

            const projectButton = createProjectButton(project);
            projectsListDiv.appendChild(projectButton);

            makeProjectActive(project);

            projectButton.addEventListener("click", () => {
                makeProjectActive(project);
            });
        } catch (err) {
            console.log(err);
        }
    });

    // Render and add new task
    newTaskButton.addEventListener("click", async () => {
        try {
            const task = await addTaskDialog();
            const taskCard = createTaskCard(task);
            tasksContainer.appendChild(taskCard);
        } catch (err) {
            console.log(err);
        }
    });

    editProjectButton.addEventListener("click", async () => {
        try {
            const deleted = await editProjectDialog(list.activeProject); // dialog returns true if deleted

            if (deleted) {
                // If project was deleted, reset active project and re-render
                list.activeProject = list.defaultProject;
            }

            makeProjectActive(list.activeProject);
            renderProjectButtons(projectsListDiv);
            renderTasks(projectNameHeading, tasksContainer);
        } catch (err) {
            console.log(err);
        }
    });

    editColoursButton.addEventListener("click", () => colourPicker.click());

    colourPicker.addEventListener("input", (e) => {
        const colour = e.target.value;
        list.activeProject.colour = colour;

        saveProjects();

        banner.style.backgroundColor = colour;

        const activeBtn = projectsListDiv.querySelector(
            `[data-id="${list.activeProject.id}"]`
        );

        if (activeBtn) {
            activeBtn.style.backgroundColor = colour;
        }
    });
}
