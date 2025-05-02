import { Task } from "../task";

/**
 *
 * @param {Task} task - A Task object
 * @returns a rendered card onto the DOM
 */
export default function createTaskCard(task) {
    const card = document.createElement("div");
    card.classList.add("task-div");

    const title = document.createElement("p");
    title.classList.add("task-title");
    title.textContent = `Title: ${task.title}`;

    const desc = document.createElement("p");
    desc.classList.add("task-desc");
    desc.textContent = task.desc;

    const due = document.createElement("p");
    due.classList.add("task-due-date");
    due.textContent = `Due: ${task.dueDate}`;

    const prio = document.createElement("p");
    prio.classList.add("task-priority");
    prio.textContent = `Priority: ${task.prio}`;

    // Input fields (initially hidden)
    const titleInput = document.createElement("input");
    titleInput.classList.add("task-inputs");
    titleInput.value = task.title;
    titleInput.style.display = "none";

    const descInput = document.createElement("textarea");
    descInput.classList.add("task-inputs");
    descInput.value = task.desc;
    descInput.style.display = "none";

    const dueInput = document.createElement("input");
    dueInput.classList.add("task-inputs");
    dueInput.type = "date";
    dueInput.value = task.dueDate;
    dueInput.style.display = "none";

    const prioInput = document.createElement("select");
    prioInput.classList.add("task-inputs");
    for (let i = 1; i <= 5; i++) {
        const opt = document.createElement("option");
        opt.value = i;
        opt.textContent = i;
        if (i == task.prio) opt.selected = true;
        prioInput.appendChild(opt);
    }
    prioInput.style.display = "none";

    // Buttons
    const buttonGroup = document.createElement("div");
    buttonGroup.classList.add("task-buttons");

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-btn");

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.classList.add("save-btn");
    saveButton.style.display = "none";

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.classList.add("cancel-btn");
    cancelButton.style.display = "none";

    const completeButton = document.createElement("button");
    completeButton.textContent = "Complete";
    completeButton.classList.add("complete-btn");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");

    buttonGroup.append(
        editButton,
        saveButton,
        cancelButton,
        completeButton,
        deleteButton
    );
    card.append(
        title,
        titleInput,
        desc,
        descInput,
        due,
        dueInput,
        prio,
        prioInput,
        buttonGroup
    );

    editButton.addEventListener("click", () => {
        card.classList.add("editing");

        // Hide the labels and show the inputs
        [title, desc, due, prio].forEach((el) => (el.style.display = "none"));
        [titleInput, descInput, dueInput, prioInput].forEach(
            (el) => (el.style.display = "block")
        );

        [editButton, completeButton, deleteButton].forEach(
            (el) => (el.style.display = "none")
        );
        [saveButton, cancelButton].forEach(
            (el) => (el.style.display = "inline")
        );
    });

    saveButton.addEventListener("click", () => {
        card.classList.remove("editing");

        task.title = titleInput.value;
        task.desc = descInput.value;
        task.dueDate = dueInput.value;
        task.prio = prioInput.value;

        title.textContent = `Title: ${task.title}`;
        desc.textContent = task.desc;
        due.textContent = `Due: ${task.dueDate}`;
        prio.textContent = `Priority: ${task.prio}`;

        // Hide the inputs and show labels
        [title, desc, due, prio].forEach((el) => (el.style.display = "block"));
        [titleInput, descInput, dueInput, prioInput].forEach(
            (el) => (el.style.display = "none")
        );

        [saveButton, cancelButton].forEach((el) => (el.style.display = "none"));
        [editButton, completeButton, deleteButton].forEach(
            (el) => (el.style.display = "inline")
        );
    });

    cancelButton.addEventListener("click", () => {
        card.classList.remove("editing");

        // Hide inputs and show labels
        [title, desc, due, prio].forEach((el) => (el.style.display = "block"));
        [titleInput, descInput, dueInput, prioInput].forEach(
            (el) => (el.style.display = "none")
        );

        [saveButton, cancelButton].forEach((el) => (el.style.display = "none"));
        [editButton, completeButton, deleteButton].forEach(
            (el) => (el.style.display = "inline")
        );
    });

    completeButton.addEventListener("click", () => {
        task.toggleComplete();

        if (task.isComplete) {
            card.classList.add("completed");
            editButton.disabled = true;
        } else {
            card.classList.remove("completed");
            editButton.disabled = false;
        }
    });

    deleteButton.addEventListener("click", () => {
        task.project.removeTask(task);

        card.remove()
    })

    return card;
}
