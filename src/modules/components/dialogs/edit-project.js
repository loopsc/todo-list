import { list } from "../../projects-list";
import { saveProjects } from "../../storage";

export default function editProjectDialog(project) {
    const dialog = document.createElement("dialog");
    dialog.classList.add("dialog");
    dialog.setAttribute("open", "");

    const form = document.createElement("form");
    form.classList.add("form");
    form.setAttribute("method", "dialog");

    const inputsGroup = document.createElement("div");
    inputsGroup.classList.add("form-group");

    const newNameLabel = document.createElement("label");
    newNameLabel.setAttribute("for", "projectNameEdit");
    newNameLabel.textContent = "Project Name";

    const newNameInput = document.createElement("input");
    newNameInput.setAttribute("type", "text");
    newNameInput.setAttribute("id", "projectNameEdit");
    newNameInput.setAttribute("name", "projectNameEdit");
    newNameInput.setAttribute("required", "");
    newNameInput.setAttribute("placeholder", project.name);
    newNameInput.setAttribute("autocomplete", "off")

    inputsGroup.append(newNameLabel, newNameInput);

    const buttonsGroup = document.createElement("div");
    buttonsGroup.classList.add("button-group")

    const saveCancelButtonsGroup = document.createElement("div");
    saveCancelButtonsGroup.style.display = "flex";
    saveCancelButtonsGroup.style.gap = "2px";

    const submitButton = document.createElement("button");
    submitButton.setAttribute("type", "submit");
    submitButton.classList.add("form-button");
    submitButton.textContent = "Save";

    const cancelButton = document.createElement("button");
    cancelButton.setAttribute("type", "button");
    cancelButton.classList.add("form-button");
    cancelButton.textContent = "Cancel";

    cancelButton.addEventListener("click", (e) => {
        e.preventDefault();

        form.reset();
        dialog.close();
        dialog.remove();
    })

    saveCancelButtonsGroup.append(submitButton, cancelButton);

    const deleteButtonGroup = document.createElement("div");
    deleteButtonGroup.classList.add("delete-button-group");

    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("type", "button");
    deleteButton.classList.add("form-button");
    deleteButton.classList.add("delete");
    deleteButton.setAttribute("id", "deleteButton");
    deleteButton.textContent = "Delete Project";

    // deleteButton.addEventListener("click", () => {
    //     list.removeProject(project)
    //     console.log("Project deleted", project)

    //     saveProjects();

    //     form.reset();
    //     dialog.close();
    //     dialog.remove();
    // })

    deleteButtonGroup.appendChild(deleteButton);

    buttonsGroup.append(saveCancelButtonsGroup, deleteButtonGroup);

    form.append(inputsGroup, buttonsGroup)

    dialog.appendChild(form)

    return { dialog, form, newNameInput, deleteButton };
}
