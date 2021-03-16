setURL('http://marina-schwab.developerakademie.com/smallest_backend_ever'); // Connection to the server
let allTasks = [];
let currentUserFromLocalStorage = {};
/**
 * Function for responsive Menu for all pages! (Never delete!!!!!!)
 */
let show = false;

/**
 * userinformations
 */
 let users = [
    {
        'name': 'Marina',
        'password': 'Marina123!',
        'image': 'img/marina.jpg',
        'e-mail': 'marina@join.de',
    },
    {
        'name': 'Yvonne',
        'password': 'Yvonne123!',
        'image': 'img/yvonne.jpg',
        'e-mail': 'yvonne@join.de',
    },
    {
        'name': 'Steffi',
        'password': 'Steffi123!',
        'image': 'img/steffi.jfif',
        'e-mail': 'steffi@join.de',
    },
    {
        'name': 'Junus',
        'password': 'Junus123!',
        'image': 'img/junus.jfif',
        'e-mail': 'junus@join.de',
    }
];

function showMenu() {


    if (show == false) {

        document.getElementById('res-menu').classList.add('show-mobilemenu');

        show = !show

    }
    else {
        document.getElementById('res-menu').classList.remove('show-mobilemenu');
        show = !show
    }
}

async function loadAllTasks() {
    await downloadFromServer(); // 1. Function downloadFromServer() -> mini_backend.js / 2. Waiting for server response in order to let the function continue
    //let allTasksAsString = await backend.getItem('allTasks');
    allTasks = jsonFromServer['allTasks'] ? JSON.parse(jsonFromServer['allTasks']) : [];
    console.log(allTasks);
    //allTasks = allTasksAsString?  JSON.parse(allTasksAsString) : [];
    //console.log(allTasks);
    //await pushBoard();
}

/**
 * Defining backgroundcolor of Category
 */
 function coloredCategory(category, index) {
    if(category == 'Marketing'){
        document.getElementById(`category${index}`).style.backgroundColor = "rgb(181,228,240)";
    };

    if(category == 'Product'){
        document.getElementById(`category${index}`).style.backgroundColor = "rgb(255,251,168)";
    };

    if(category == 'Sale'){
        document.getElementById(`category${index}`).style.backgroundColor = "rgb(179,244,185)";
    };

    if(category == 'Controlling'){
        document.getElementById(`category${index}`).style.backgroundColor = "rgb(192,192,192)";
    };
}

/**
 * Defining backgroundcolor of Category in backlog-div
 */

function coloredBacklogdiv(category, index) {
    if(category == 'Marketing'){
        document.getElementById(`category${index}`).style.borderInlineStart = "solid 5px rgb(181,228,240)";
    };

    if(category == 'Product'){
        document.getElementById(`category${index}`).style.borderInlineStart = "solid 5px rgb(255,251,168)";
    };

    if(category == 'Sale'){
        document.getElementById(`category${index}`).style.borderInlineStart = "solid 5px rgb(179,244,185)";
    };

    if(category == 'Controlling'){
        document.getElementById(`category${index}`).style.borderInlineStart = "solid 5px rgb(192,192,192)";
    };
}


function checkCurrentUser() {
    if (localStorage.getItem('currentUser')) { // Check if user exists
        currentUserFromLocalStorage = JSON.parse(localStorage.getItem('currentUser'));
        document.getElementById('user-pic').src = currentUserFromLocalStorage.image;
    }
}

function logout() {
    localStorage.removeItem('currentUser');
}

//window.onload = init;

function initOverallApp() {
    checkCurrentUser();
    includeHTML();
}

function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                    if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }
    }
}
