import { Project } from "./project";

class ProjectsList {
    #projectsList;

    constructor() {
        this.#projectsList = [];
    }

    addProject(projectToAdd) {
        // Checks if an object with that name already exists.
        if (!this.getProjectByName(projectToAdd.name)) {
            this.#projectsList.push(projectToAdd);
        } else {
            console.log(`Project '${projectToAdd.name}' already exists`);
        }
    }

    removeProject(project) {
        const projectID = project.id;
        for (let i = 0; i < this.#projectsList.length; i++) {
            if (this.#projectsList[i].id === projectID) {
                this.#projectsList.splice(i, 1);
            }
        }
    }

    // Returns a project object with the corresponding name
    getProjectByName(projectName) {
        return this.#projectsList.find(
            (project) => project.name === projectName
        );
    }

    getAllProjects() {
        return this.#projectsList;
    }

    clearAllProjects() {
        this.#projectsList.length = 0;
    }
}

// Export the singleton instance of ProjectsList
// Ensures that only one ProjectsList can be created.
const list = new ProjectsList();

// Add a default project to the list
const defaultProject = new Project("Default");
list.addProject(defaultProject);

export { list };
