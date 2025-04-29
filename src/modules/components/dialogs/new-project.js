export default function addProjectDialog() {
    const dialog = document.createElement("dialog");
    dialog.classList.add("dialog");
    dialog.setAttribute("open", "");

    const form = document.createElement("form");
    form.classList.add("form");
    form.setAttribute("method", "dialog");

    const taskGroup = document.createElement("div");
    taskGroup.classList.add("form-group");

    const projectLabel = document.createElement("label");
    projectLabel.setAttribute("for", "project-name");
    projectLabel.textContent = "Project Name:";
    taskGroup.appendChild(projectLabel);

    const projectName = document.createElement("input");
    projectName.setAttribute("type", "text");
    projectName.setAttribute("name", "project");
    projectName.setAttribute("id", "project-name");
    projectName.setAttribute("required", "");
    projectName.setAttribute("maxlength", "20");
    taskGroup.appendChild(projectName);

    form.appendChild(taskGroup);

    const buttonGroup = document.createElement("div");
    buttonGroup.classList.add("button-group");

    // Create Cancel Button
    const cancelButton = document.createElement("button");
    cancelButton.classList.add("form-button");
    cancelButton.textContent = "Cancel";
    buttonGroup.appendChild(cancelButton);

    // Cancel button event
    cancelButton.addEventListener("click", (e) => {
        e.preventDefault();

        form.reset();
        dialog.close();
        dialog.remove();
    });

    // Create Submit Button
    const submitButton = document.createElement("button");
    submitButton.classList.add("form-button");
    submitButton.setAttribute("type", "submit");
    submitButton.textContent = "Submit";
    buttonGroup.appendChild(submitButton);

    // Append button group to form
    form.appendChild(buttonGroup);

    // Append form to dialog
    dialog.appendChild(form);

    return {
        dialog,
        form,
        projectName,
    };
}
