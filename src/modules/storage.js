import { list } from "./projects-list";
import { Project } from "./project";
import { Task } from "./task";

// Check if storage is available and supported
function storageAvailable(type) {
    let localStorage;
    try {
        localStorage = window[type];
        const x = "__storage_test__";
        localStorage.setItem(x, x);
        localStorage.removeItem(x);
        return true;
    } catch (e) {
        return (
            e instanceof DOMException &&
            (e.name === "QuotaExceededError" ||
                e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
            localStorage &&
            localStorage.length !== 0
        );
    }
}

function saveProjects() {
    if (!storageAvailable("localStorage")) return;

    const allProjects = list.getAllProjects().map((project) => {
        return {
            id: project.id,
            name: project.name,
            tasks: project.getAllTasks().map((task) => ({
                id: task.id,
                title: task.title,
                desc: task.desc,
                dueDate: task.dueDate,
                prio: task.prio,
                isComplete: task.isComplete,
            })),
        };
    });
    console.log("Saving projects", allProjects)
    // JSON object of all objects
    localStorage.setItem("projects", JSON.stringify(allProjects));
}

function loadProjects() {
    if (!storageAvailable("localStorage")) {
        console.log("Storage unavailable");
        return;
    }

    // json object of all projects saved
    const stored = localStorage.getItem("projects");
    if (!stored) {
        console.log("Couldn't retrieve items from local storage")
        return;
    }

    // Array of all projects
    const projectDataArray = JSON.parse(stored);
    console.log("Array of projects", projectDataArray)
    // clear the list so there are no duplicate projects when loading
    list.clearAllProjects();
    console.log("Cleared 'list'")

    // Parse each project from plain objects back into class objects

    projectDataArray.forEach((projData) => {
        const project = new Project(projData.name);
        project.id = projData.id;
        // For each task in the project, add it back
        projData.tasks.forEach((taskData) => {
            const task = new Task(
                taskData.title,
                taskData.desc,
                taskData.dueDate,
                taskData.prio,
                project
            );
            task.id = taskData.id;
            task.isComplete = taskData.isComplete;
            project.addTask(task);
        });
        list.addProject(project);
    });

    
}

export { saveProjects, loadProjects };
