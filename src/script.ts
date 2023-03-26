//grab dom elements and store in JS variables
const form = <HTMLFormElement>document.querySelector("form");
const ul = <HTMLUListElement>document.querySelector("ul");
const button = <HTMLButtonElement>document.querySelector("button");
const input = <HTMLInputElement>document.getElementById("item");
const container = document.querySelector(".itemContainer");

interface saveTaskToLS {
  taskName: string;
}

const tasksKey: string = "tasks";

window.onload = (event: Event) => {
  const toDoTaskFromLs: Array<string> = JSON.parse(
    localStorage.getItem(tasksKey)
  );
  toDoTaskFromLs.map((item: string) => {
    updateTodoTasksListForUser(item);
  });
};

const saveTaskToLocalStorage = ({ taskName }: saveTaskToLS) => {
  const existingTasks = JSON.parse(localStorage.getItem(tasksKey));
  let newTasksList: Array<string> = [];
  if (existingTasks) {
    newTasksList = existingTasks;
  }
  newTasksList.push(taskName);
  localStorage.setItem(tasksKey, JSON.stringify(newTasksList));
};

const deleteTaskForUser = (li) => {
  ul.removeChild(li);
};

const removeFromLocalStorage = (t) => {
  const itemFromLS = JSON.parse(localStorage.getItem(tasksKey));
  const matchedIndex = itemFromLS.indexOf(t);
  itemFromLS.splice(matchedIndex, 1);
  localStorage.setItem(tasksKey, JSON.stringify(itemFromLS));
};

const updateTodoTasksListForUser = (x: string) => {
  const list: HTMLLIElement = document.createElement("li");
  const spanWithValue: HTMLSpanElement = document.createElement("span");
  const spanWithBtn: HTMLButtonElement = document.createElement("button");

  spanWithValue.innerText = x;
  spanWithBtn.innerText = "X";

  // add checkbox to the list on click
  spanWithBtn.addEventListener("click", () => {
    removeFromLocalStorage(x);
    list.classList.toggle("checked");
    setTimeout(() => {
      deleteTaskForUser(list);
    }, 1000);
  });

  list.appendChild(spanWithValue);
  list.appendChild(spanWithBtn);
  ul.appendChild(list);
};

const addTaskToToDoList = () => {
  const task = input.value;
  if (task == "") {
    alert("Enter the name of task");
  } else {
    saveTaskToLocalStorage({ taskName: task });
    updateTodoTasksListForUser(task);
    input.value = "";
  }
};
