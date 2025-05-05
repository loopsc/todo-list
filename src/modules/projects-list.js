import { Project } from "./project";
import { Task } from "./task";

class ProjectsList {
    #projectsList;

    constructor() {
        this.#projectsList = [];
        
        // Create the default project and add it to the list
        const defaultProject = new Project("Default");
        this.#projectsList.push(defaultProject);
    }

    addProject(projectToAdd) {
        // Checks if an object with that name already exists
        if (!this.getProjectByName(projectToAdd.name)) {
            this.#projectsList.push(projectToAdd);
        } else {
            console.log(`Project '${projectToAdd.name}' already exists`);
        }
    }

    removeProject(project) {
        // Prevent removal of the default project
        if (project.id === defaultProject.id) {
            console.log("Cannot remove the default project.");
            return;
        }

        const projectID = project.id;
        for (let i = 0; i < this.#projectsList.length; i++) {
            if (this.#projectsList[i].id === projectID) {
                this.#projectsList.splice(i, 1);
                console.log(`Project '${project.name}' removed.`);
                return;
            }
        }
    }

    // Returns a project object with the corresponding name
    getProjectByName(projectName) {
        return this.#projectsList.find(
            (project) => project.name === projectName
        );
    }

    getProjectByID(id) {
        return this.#projectsList.find((project) => project.id === id);
    }

    getAllProjects() {
        return this.#projectsList;
    }

    clearAllProjects() {
        // This will only clear projects that are not the default
        this.#projectsList = this.#projectsList.filter(project => project.name !== "Default");
    }
}

// Export the singleton instance of ProjectsList
// Ensures that only one ProjectsList can be created.
const list = new ProjectsList();

export { list };
