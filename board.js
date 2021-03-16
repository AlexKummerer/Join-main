let todo = [];
let progress = [];
let testing = [];
let done = [];

/**
 * Loading Tasks from AddTask out of the Backend to show it then with showBoard()
 */

async function initBoard() {
    await loadAllTasks();
    updateHTML();
}

function updateHTML() {
    clearSubTasks();
    clearMatrixFields();
    for (let i = 0; i < allTasks.length; i++) {
        sortTodo(i);
        sortProgress(i);
        sortTesting(i);
        sortDone(i);
    }
}

function clearSubTasks() {
    todo = [];
    progress = [];
    testing = [];
    done = [];
}

function clearMatrixFields() {
    document.getElementById("toDo").innerHTML = "";
    document.getElementById("progress").innerHTML = "";
    document.getElementById("testing").innerHTML = "";
    document.getElementById("done").innerHTML = "";
}

function sortTodo(i) {
    if (allTasks[i].section == "toDo") {
        todo.push(allTasks[i]);
        let subTasks = todo;
        document.getElementById("toDo").innerHTML = "";
        insertTasks(subTasks);
        console.log(subTasks);
    }
}

function sortProgress(i) {
    if (allTasks[i].section == "progress") {
        progress.push(allTasks[i]);
        let subTasks = progress;
        document.getElementById("progress").innerHTML = "";
        insertTasks(subTasks);
    }
}

function sortTesting(i) {
    if (allTasks[i].section == "testing") {
        testing.push(allTasks[i]);
        let subTasks = testing;
        document.getElementById("testing").innerHTML = "";
        insertTasks(subTasks);
    }
}

function sortDone(i) {
    if (allTasks[i].section == "done") {
        done.push(allTasks[i]);
        let subTasks = done;
        document.getElementById("done").innerHTML = "";
        insertTasks(subTasks);
    }
}

function insertTasks(subTasks) {
    for (i = 0; i < subTasks.length; i++) {
        let task = subTasks[i];
        document.getElementById(task.section).innerHTML += generateTask(task);
        coloredCategory(task["category"], i);
    }
}

function generateTask(task) {
    return `
    <div class="pin"  id="drag" draggable="true" ondragstart="drag(${task["id"]})">
            <div class="first-row-pin">
                <p class="p-header">${task["title"]}</p>
                <img src="img/X.svg" class="X-pin" onclick="openDeleteWindow(${task["id"]})">  
            </div>
            
            <div class="second-row-pin">
                <p class="p-pin1">${task["date"]}</p>
                <p class="p-pin2">${task["urgency"]}</p>
                <div class="picrow-pin">
                    <img src="${task["author"]}" class="user-pic-pin">
                    <p class="p-category" id="category${i}">${task["category"]}</p>
                </div>
            </div>
            <div class="pin-color" id="pin-color"></div>
        </div> 
        `;
}

/**
 * asking if you really want to delete the task
 */
function openDeleteWindow(taskId) {
    document.getElementById("deleteWindow").classList.remove("d-none");
    document.getElementById("deleteWindow").classList.add("deleteWindow");
    document.getElementById("main-section").classList.add("d-none");
    document.getElementById("deleteWindow").innerHTML = `

    <h1 class = "deleteh1"> Möchtest du diesen Pin wirklich löschen ? </h1> 
    <div class = "deleteBtnRow" >
        <img id = "deleteTask"  src = "img/loginCheck.svg"onclick = "deleteTask(${taskId})"
    class = "deleteBtn" >
        <img src = "img/X.svg"onclick = "closeDeleteWindow()"
    class = "deleteBtn">
        </div> 
    `;
}

/**
 * closing the delete Window
 */
function closeDeleteWindow() {
    document.getElementById("main-section").classList.remove("d-none");
    document.getElementById("main-section").classList.add("main-section");
    document.getElementById("deleteWindow").classList.add("d-none");
}

/**
 * deleting the current task
 */
function deleteTask(taskId) {
    allTasks = allTasks.filter((t) => t["id"] != taskId);
    backend.setItem("allTasks", JSON.stringify(allTasks));
    closeDeleteWindow();
    updateHTML();
}

/**
 * Loading the data of all signed up users from the local storage and saves them in the users array when the page is loaded.
 *
 */
async function loadAllUsers() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem("users")) || [];
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

/**
 * Open current User Window
 * @param { numer } userIndex - Index Number of current User
 */

function loadCurrentUserWindow(userIndex) {
    document.getElementById("user-pic").src = `
    ${users[userIndex]["image"]}
    `;
}

/**
 * Drag and Drop Function
 */

/**
 * This method allows to drop an element over an area
 * @param {DataTransfer} ev
 */

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev) {
    ev.target.classList.forEach((cssClass) => {
        if (cssClass === "drop-area") {
            performDropTask(ev);
        }
    });
}

function moveTo(section) {
    let currentTask = allTasks.find((t) => t["id"] == draggingTask); // Finds current task
    currentTask.section = section;
    allTasks.push(currentTask);
    backend.setItem("allTasks", JSON.stringify(allTasks));
    updateHTML();
}

/**
 * This method performs drop of the dropdown
 * and switches the task to its new place & calls the update function
 * @param {DataTransfer} ev
 */
function performDropTask(ev) {
    ev.preventDefault();
    let id = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(id));
}

/**
 * This method saves the id of the element that is being dragged
 * @param {DataTransfer} ev
 */
function drag(id) {
    draggingTask = id;
    // ev.dataTransfer.setData("text", ev.target.id);
}

/**
 * saving functions in local Storage for drag and drop
 */

function LocalSaveUsers() {
    //setArray('users', users);
    backend.setItem("currentUser", JSON.stringify(currentUser));
}

function LocalSaveTasks() {
    //setArray('alltasks', alltasks);
    backend.setItem("allTasks", JSON.stringify(allTasks));
}

function SetLocal() {
    LocalSaveUsers();
    LocalSaveTasks();
}