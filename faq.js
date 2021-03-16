/**
 * Loading the data of all signed up users from the local storage and saves them in the users array when the page is loaded.
 *
 */
 async function loadAllUsers() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
}

/**
 * Loading the currently logged in user.
 */
function loadCurrentUser() {
    let currentUserAsString = localStorage.getItem("currentUser");

    if (currentUserAsString) {
        currentUser = JSON.parse(currentUserAsString);
    }
}