//grab dom elements and store in JS variables
var form = document.querySelector("form");
var ul = document.querySelector("ul");
var button = document.querySelector("button");
var input = document.getElementById("item");
var container = document.querySelector(".itemContainer");
var tasksKey = "tasks";
window.onload = function (event) {
    var toDoTaskFromLs = JSON.parse(localStorage.getItem(tasksKey));
    toDoTaskFromLs.map(function (item) {
        updateTodoTasksListForUser(item);
    });
};
var saveTaskToLocalStorage = function (_a) {
    var taskName = _a.taskName;
    var existingTasks = JSON.parse(localStorage.getItem(tasksKey));
    var newTasksList = [];
    if (existingTasks) {
        newTasksList = existingTasks;
    }
    newTasksList.push(taskName);
    localStorage.setItem(tasksKey, JSON.stringify(newTasksList));
};
var deleteTaskForUser = function (li) {
    ul.removeChild(li);
};
var removeFromLocalStorage = function (t) {
    var itemFromLS = JSON.parse(localStorage.getItem(tasksKey));
    var matchedIndex = itemFromLS.indexOf(t);
    itemFromLS.splice(matchedIndex, 1);
    localStorage.setItem(tasksKey, JSON.stringify(itemFromLS));
};
var updateTodoTasksListForUser = function (x) {
    var list = document.createElement("li");
    var spanWithValue = document.createElement("span");
    var spanWithBtn = document.createElement("button");
    spanWithValue.innerText = x;
    spanWithBtn.innerText = "X";
    // add checkbox to the list on click
    spanWithBtn.addEventListener("click", function () {
        removeFromLocalStorage(x);
        list.classList.toggle("checked");
        setTimeout(function () {
            deleteTaskForUser(list);
        }, 1000);
    });
    list.appendChild(spanWithValue);
    list.appendChild(spanWithBtn);
    ul.appendChild(list);
};
var addTaskToToDoList = function () {
    var task = input.value;
    if (task == "") {
        alert("Enter the name of task");
    }
    else {
        saveTaskToLocalStorage({ taskName: task });
        updateTodoTasksListForUser(task);
        input.value = "";
    }
};
