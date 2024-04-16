let todos = [];

let todoDataList = document.getElementById("todo-data-list");
let todoDataSection = document.getElementById("todo-data");
let saveButton = document.getElementById("save-todo");
let todoInputBar = document.getElementById("todo-input-bar");

todoInputBar.addEventListener("keyup", function toggleSaveBtn() {
	let todoText = todoInputBar.value;
	if (todoText.length == 0) {
		if (saveButton.classList.contains("disabled")) return;
		saveButton.classList.add("disabled");
	}
	else if (saveButton.classList.contains("disabled"))
		saveButton.classList.remove("disabled");
})

saveButton.addEventListener("click", function getTextAndAddTodo() {
	let todoText = todoInputBar.value;
	if (todoText.length == 0) return;
	let todo = { text: todoText, status: 'In Progress', finishButtonText: 'Finished' };
	todos.push(todo);
	addTodo(todo, todos.length);
	todoInputBar.value = "";
	saveButton.classList.add("disabled");
});

function reRenderTodos() {
	todoDataList.innerHTML = '';
	todos.forEach((element, idx) => {
		addTodo(element, idx + 1);
	});
}

function removeTodo(event) {

	let deleteButtonPressed = event.target;
	let indexTobeRemoved = Number(deleteButtonPressed.getAttribute("todo-idx"));
	todos.splice(indexTobeRemoved, 1);
	reRenderTodos();
}

function finishTodo(event) {
	let finishedButtonPressed = event.target;
	let indexTobeFinised = Number(finishedButtonPressed.getAttribute("todo-idx"));

	//toggle
	if (todos[indexTobeFinised].status == "Finished") {
		todos[indexTobeFinised].status = "In Progress";
		todos[indexTobeFinised].finishButtonText = "Finished";
	} else {
		todos[indexTobeFinised].status = "Finished";
		todos[indexTobeFinised].finishButtonText = "Undo";
	}

	todos.sort((a, b) => {
		if (a.status == 'Finished') {
			return 1;
		}
		return -1;
	});

	reRenderTodos();
}


function addTodo(todo, todoCount) {
	let rowDiv = document.createElement("div");
	let todoItem = document.createElement("div");
	let todoNumber = document.createElement("div");
	let todoDetail = document.createElement("div");
	let todoStatus = document.createElement("div");
	let todoActions = document.createElement("div");
	let deleteButton = document.createElement("button");
	let finishedButton = document.createElement("button");
	let hr = document.createElement("HR");

	// Adding Classes
	rowDiv.classList.add("row");
	todoItem.classList.add("todo-item", "d-flex", "flex-row", "justify-content-between", "align-items-center");
	todoNumber.classList.add("todo-no");
	todoDetail.classList.add("todo-detail", "text-muted");
	todoStatus.classList.add("todo-status", "text-muted");
	todoActions.classList.add("todo-actions", "d-flex", "justify-content-start", "gap-2");
	deleteButton.classList.add("btn", "btn-danger", "delete-todo");
	finishedButton.classList.add("btn", "btn-success", "finished-todo");

	finishedButton.setAttribute("todo-idx", todoCount - 1);
	deleteButton.setAttribute("todo-idx", todoCount - 1);
	deleteButton.onclick = removeTodo;
	finishedButton.onclick = finishTodo;

	todoNumber.textContent = `${todoCount}.`;
	todoDetail.textContent = todo.text; // sets the todo text sent from the input element
	todoStatus.textContent = todo.status;
	deleteButton.textContent = "Delete";
	finishedButton.textContent = todo.finishButtonText;

	todoActions.appendChild(deleteButton);
	todoActions.appendChild(finishedButton);

	todoItem.appendChild(todoNumber);
	todoItem.appendChild(todoDetail);
	todoItem.appendChild(todoStatus);
	todoItem.appendChild(todoActions);

	rowDiv.appendChild(todoItem);
	rowDiv.appendChild(hr);

	todoDataList.appendChild(rowDiv);

}