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
    console.log(event.target);
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
