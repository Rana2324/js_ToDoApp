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
}

//checked section

function completedItem(event) {
  const li = event.target.parentElement.firstElementChild;
  li.classList.toggle("complete_style");
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
    console.log(task);
    const item = document.createElement("div");
    item.className = "item";
    item.innerHTML = `
  <li>${task}</li>
  <button class="edit"><i class="fas fa-pen"></i></button>
  <button class="completed"><i class="fas fa-check"></i></button>
  <button class="delete"><i class="fas fa-trash-can"></i></button>`;
    taskList.appendChild(item);
  });
}
