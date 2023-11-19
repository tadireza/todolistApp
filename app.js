const textInput = document.getElementById("test-text");
const dateInput = document.getElementById("date-time");
const addButton = document.getElementById("add-button");
const alertMessage = document.getElementById("alert-message");
const toDoBody = document.querySelector("tbody");
let deleteButton = document.getElementById("delete-button");

let todoList = JSON.parse(localStorage.getItem("todolist")) || [];


const showAlert = (message, type) => {
    alertMessage.innerHTML=""
    const alert = document.createElement("p");
    alert.innerText = message;
    alert.classList.add("alert");
    alert.classList.add(`alert-${type}`);
    alertMessage.append(alert);

    setTimeout(() => {
        alert.style.display = "none";
    },2000)
}

const generateId = () => {
    return id = (Math.round (Math.random() * Math.random() * Math.pow(10,16))).toString();

}

const saveToLocalStorage = () => {
    localStorage.setItem("todolist", JSON.stringify(todoList));
}

const displayToDoList = () => {
    toDoBody.innerHTML=""
    if (!todoList.length) {
        toDoBody.innerHTML = "<tr><td colspan='4'>Any task not found!</td></tr>";
        return;
    }
    todoList.forEach ((todo) => {
         toDoBody.innerHTML += `
       <tr>
       <td>${todo.text}</td>
       <td>${todo.date ? todo.date : "No date"}</td>
       <td>${todo.completed ? "Completed" : "Pending"}</td>
       <td>
          <button>Edit</button>
          <button>Do</button>
          <button onclick="deleteHandler'${todo.id}'">Delete</button>
       </td>
       </tr>
      `
    })

}


const addHandler = () => {
    const text = textInput.value;
    const taskDate = dateInput.value;
    saveToLocalStorage();
    const todo = {
        id: generateId(),
        text,
        date: taskDate,
        completed: false,
    }
    if (text) {
        todoList.push(todo);
        textInput.value="";
        dateInput.value="";
        console.log(todoList);
        displayToDoList()
        showAlert("Ok! A task added successfully!", "success")
    } else {
        showAlert("Error: Please enter a task!", "error")
    }
};

const deleteButtonHandler = () => {
    if (todoList.length){
        todoList = [];
        saveToLocalStorage();
        displayToDoList();
        showAlert("All todos deleted successfully", "success")
    } else {
        showAlert("There is no task to deleted!" , "error")
    }
  
   
}

// window.addEventListener("load", displayToDoList)
deleteButton.addEventListener("click", deleteButtonHandler)
addButton.addEventListener("click", addHandler);