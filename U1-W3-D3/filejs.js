console.log(document)

const form = document.querySelector("form")
const listOfTasks = document.getElementById("list-of-tasks")
const taskInput = document.getElementById("add-input")

form.onsubmit = function (e) {
  e.preventDefault()

  const task = document.createElement("li")
  const deleteTaskBtn = document.createElement("button")

  task.classList.add("task")
  task.innerText = taskInput.value

  deleteTaskBtn.type = "button"
  deleteTaskBtn.innerText = "🗑️"
  deleteTaskBtn.className = "delete-task-button"

  task.appendChild(deleteTaskBtn)
  listOfTasks.appendChild(task)

  task.onclick = function () {
    task.classList.toggle("completed-task")
  }

  deleteTaskBtn.onclick = function (e) {
    e.stopPropagation()
    task.remove()
  }

  taskInput.value = ""
}
