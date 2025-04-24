import "./styles.css"
import { Task } from "./modules/task";
import { Projects } from "./modules/projects";
import { list } from "./modules/projects-list";
import render from "./modules/render";


// const myProject = new Projects("Today")
// const newTask = new Task('title', 'desc', "due", "prio", myProject);
// list.addProject(myProject)

// myProject.addTask(newTask)

document.addEventListener("DOMContentLoaded", () => {
    render();
})

// console.log('task', newTask)
// console.log('project',myProject)
// console.log('projectsList',list)