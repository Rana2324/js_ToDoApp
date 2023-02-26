//selecting the required element will
const newTaskInput = document.querySelector("#newTaskInput");
const addBtn = document.querySelector("#addNewBtn");
const taskList = document.querySelector("#task_list");

//add a click event to the

addBtn.addEventListener("click", (e) => {
  const taskName = newTaskInput.value;

  if (!taskName) {
    alert("Please enter Your task name");
  }

  newTaskInput.value = "";
  addNewInput(taskName);
});

//get a input value

function addNewInput(text) {
  const item = document.createElement("div");
  item.className = "item";
  item.innerHTML = `<li>${text}</li>
  <button class="edit"><i class="fas fa-pen"></i></button>
  <button class="completed"><i class="fas fa-check"></i></button>
  <button class="delete"><i class="fas fa-trash-can"></i></button>
  
  `;

  taskList.appendChild(item);
  const tasks = getData();

  let uniqueTask = text;
  for (let taskName of tasks) {
    if (taskName[0].trim() === text.trim()) {
      uniqueTask += " ";
    }
  }

  const newTaskArr = [uniqueTask, "active"];

  tasks.push(newTaskArr);
  setElement(tasks);
}

taskList.addEventListener("click", (event) => {
  if (event.target.className == "delete") {
    deleteItem(event);
  } else if (event.target.className == "completed") {
    completedItem(event);
  } else if (event.target.className == "edit") {
    editTaskName(event);
  }
});

//delete section

function deleteItem(event) {
  event.target.parentElement.remove();
  const taskName = event.target.parentElement.firstElementChild.innerText;
  deleteTaskName(taskName);
}

function deleteTaskName(taskName) {
  const tasks = getData();
  let index;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i][0] == taskName) {
      index = i;
    }
  }

  tasks.splice(index, 1);
  setElement(tasks);
}
//checked section

function completedItem(event) {
  const li = event.target.parentElement.firstElementChild;
  li.classList.toggle("complete_style");
  const tasks = getData();
  let index;
  tasks.forEach((task, i) => {
    if (task[0] == li.innerText) {
      index = i;
    }
  });

  const task = tasks[index];
  if (task[1] == "active") {
    task[1] = "completed";
  } else {
    task[1] = "active";
  }
  tasks.splice(index, 1, task);
  setElement(tasks);
}

//edit section

function editTaskName(event) {
  const li = event.target.parentElement.firstElementChild;
  const previousText = li.innerHTML;
  li.innerHTML = "";

  const input = document.createElement("input");
  input.type = "text";
  input.value = previousText;

  input.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
      const modifiedName = e.target.value;

      li.innerHTML = "";
      li.innerText = modifiedName;
      event.target.style.display = "inline";

      const tasks = getData();
      let index;
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i][0].trim() == previousText) {
          index = i;
        }
      }

      let previousTask = tasks[index];
      previousTask.splice(0, 1, modifiedName);

      tasks.splice(index, 1, previousTask);
      setElement(tasks);
    }
  });

  li.appendChild(input);
  event.target.style.display = "none";
}

//onload section

document.body.onload = (e) => {
  const tasks = getData();
  renderData(tasks);
};

//get data from localstorage

function getData() {
  let tasks;
  const data = localStorage.getItem("tasks");

  if (data) {
    tasks = JSON.parse(data);
  } else {
    tasks = [];
  }

  return tasks;
}

//Rendering data ui

function renderData(tasks) {
  // console.log(tasks);
  tasks.forEach((task) => {
    // console.log(task);
    const item = document.createElement("div");
    item.className = "item";

    let status = "";
    if (task[1] == "completed") {
      status = "complete_style";
    }

    item.innerHTML = `
  <li class=${status}>${task[0]}</li>
  <button class="edit"><i class="fas fa-pen"></i></button>
  <button class="completed"><i class="fas fa-check"></i></button>
  <button class="delete"><i class="fas fa-trash-can"></i></button>`;
    taskList.appendChild(item);
  });
}

//set element in localstorage

function setElement(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
