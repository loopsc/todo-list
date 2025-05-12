

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

export {handleFormClose}