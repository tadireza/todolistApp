const textInput = document.getElementById("test-text");
const dateInput = document.getElementById("date-time");
const addButton = document.getElementById("add-button");
const editButton = document.getElementById("edit-button");
const alertMessage = document.getElementById("alert-message");
const toDoBody = document.querySelector("tbody");
let deleteButton = document.getElementById("delete-button");
const filterButtons= document.querySelectorAll(".filter-button");

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

const displayToDoList = (data) => {
    const todos = data ? data : todoList;
    toDoBody.innerHTML=" "
    if (!todos.length) {
        toDoBody.innerHTML = "<tr><td colspan='4'>Any task not found!</td></tr>";
        return;
    }
    todos.forEach ((todo) => {
         toDoBody.innerHTML += `
       <tr>
       <td>${todo.text}</td>
       <td>${todo.date ? todo.date : "No date"}</td>
       <td>${todo.completed ? "Completed" : "Pending"}</td>
       <td>
          <button onclick='editHandler("${todo.id}")'>Edit</button>
          <button onclick='changeStatus("${todo.id}")'>${todo.completed? "Undo" : "Do"}</button>
          <button onclick='deleteHandler("${todo.id}")'>Delete</button>
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

const deleteHandler = (id) => {
    const newToDo = todoList.filter ((todo) => todo.id !== id)
    todoList = newToDo;
    saveToLocalStorage();
    displayToDoList();
    showAlert("A task deleted successfully" , "success")
    
}

const changeStatus = (id) => {
    const todo = todoList.find((todo) => todo.id === id ) 
    todo.completed = !todo.completed;
    saveToLocalStorage();
    displayToDoList();
    showAlert("Status changed successfully!", "success")       
    }

const editHandler = (id) => {
    const todo = todoList.find ((todo) => todo.id === id);
    textInput.value = todo.text;
    dateInput.value = todo.date;
    addButton.style.display = "none";
    editButton.style.display = "inline-block";
    editButton.dataset.id = id;
    showAlert("You are editing a task", "editing")
}

const applyEditHandler = (event) => {
    const id = event.target.dataset.id;
    const todo = todoList.find ((todo) => todo.id === id );
    todo.text = textInput.value;
    todo.date = dateInput.value;
    textInput.value = "";
    dateInput.value = "";
    addButton.style.display = "inline-block";
    editButton.style.display = "none";
    saveToLocalStorage();
    displayToDoList();
    showAlert("A task edited successfully", "success")
}

// const allButtonHandler = (todo) => {
//     const allStatus = todoList.filter ((todo) => todo.text !== "");
//     saveToLocalStorage()
//     displayToDoList()
//     showAlert("You show all tasks", "success")

// }

const filterHandler = (event) => {

    let filteredTodos = null;
    const filter = event.target.dataset.filter;
    switch (filter) {
        case "pending":
            filteredTodos = todoList.filter ((todo) => todo.completed === false );
            break;

        case "completed" :
            filteredTodos = todoList.filter ((todo) => todo.completed === true);  
            break;
    
        default:
            filteredTodos = todoList;
            break;      
    }
 displayToDoList(filteredTodos)    
}


// window.addEventListener("load", displayToDoList)
editButton.addEventListener("click", applyEditHandler)
deleteButton.addEventListener("click", deleteButtonHandler)
addButton.addEventListener("click", addHandler);
// allButton.addEventListener("click", allButtonHandler);
filterButtons.forEach((button) => {
    button.addEventListener("click", filterHandler)
});

