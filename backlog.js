/**
 * Overlay function for details
 */

/**
 * show the Details
 */

function showDetails() {
    document.getElementById('openDetails').classList.remove('d-none-details');
}

/**
 * close details
 */

function closeDetails() {
    document.getElementById('openDetails').classList.add('d-none-details');
}

/**
 * loading the added tasks from Backend to Backlog
 */

async function initBacklog() {
    await loadAllTasks();
    showBacklog();
}

async function loadAllTasks() {
    await downloadFromServer();
    allTasks = jsonFromServer['allTasks'] ? JSON.parse(jsonFromServer['allTasks']) : [];
}


/**
 * Posting in backlog 
 */

function showBacklog() {
    document.getElementById('push-to-backlog').innerHTML = '';
    for (let i = 0; i < allTasks.length; i++) {
        const task = allTasks[i];
        if (!(task['plususer'] && task['author'])) {
            task['plususer'] = 'img/marina.jpg';
            task['author'] = 'img/marina.jpg';
        }
        document.getElementById('push-to-backlog').innerHTML += `
        <div class="backlog-div" id="category${i}"> 
        <div class="assigned-backlog">
            <div class="assigned-person">
                <div class="img-backlog"> 
                    <img src="${task['author']}">
                </div>
                <div class="name-backlog"> ${currentUserFromLocalStorage['name']} <br>
                E-Mail: ${currentUserFromLocalStorage['e-mail']}</div>
            </div> 
        </div>
        <div  class="category-backlog"> ${task['category']} </div>
        <div class="details-backlog"> 
            <p class="details-text"> ${task['description']}</p>
        </div>
        <div class="delete-backlog">
            <img src="img/delete_bin.svg" class="delete-pin-bl" onclick="openDeleteWindowBacklog(${
                task["id"]
              })"> 
        </div>
        </div>
        `;

        coloredBacklogdiv(task['category'], i);


    }
}

function openDeleteWindowBacklog(taskId) {
    document.getElementById('deleteWindow').classList.remove('d-none');
    document.getElementById('deleteWindow').classList.add('deleteWindow');
    document.getElementById('main-section').classList.add('d-none');
    document.getElementById("deleteWindow").innerHTML = `
    <h1 class="deleteh1">Möchtest du diesen Pin wirklich löschen?</h1>
    <div class="deleteBtnRow">
        <img id="deleteTask" src="img/loginCheck.svg" onclick="deleteTask(${taskId})" class="deleteBtn">
        <img src="img/X.svg" onclick="closeDeleteWindowBacklog()" class="deleteBtn">
    </div> 
    `;
}


/**
 * deleting the current task
 */
function deleteTask(taskId) {
    allTasks = allTasks.filter((t) => t["id"] != taskId);
    backend.setItem("allTasks", JSON.stringify(allTasks));
    closeDeleteWindowBacklog();
    showBacklog();
}

function closeDeleteWindowBacklog() {
    document.getElementById('main-section').classList.remove('d-none');
    document.getElementById('deleteWindow').classList.remove('deleteWindow');
    document.getElementById('deleteWindow').classList.add('d-none');
}