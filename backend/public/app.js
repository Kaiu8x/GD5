function storeTask() {
    console.log('Stores the tasks');

    let taskDescriptionJQ = $('#task_description').val()
    let taskDescription = document.getElementById('task_description').value;
    console.log('taskDescription', taskDescription);

    let body = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: taskDescription })
    };
    fetch('/tasks', body)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw "Error en la llamada Ajax";
            }
        })
        .then(task => {
            document.getElementById('task_description').value = '';
            addTask(task);
        })
        .catch(error => {
            console.log('Error: ', error);
        })

}

function addTask(task) {
    let html =
        `
    <div class="card my-3">
      <div class="card-body">
        <p class="card-text">${task.description}</p>
         <input id="${task.id}" type="button" onclick="taskCompleted(this)" value="Done" class="btn btn-primary">
         <input id="del-${task.id}" type="button" onclick="deleteTask(this)" value="Delete" class="btn btn-danger">
      </div>
    </div>
    `;
    let node = document.createRange().createContextualFragment(html);
    document.getElementById('tasksList').prepend(node);
}

function deleteTask(item) {
    let taskDescriptionJQ = $('#task_description').val()

    let body = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: $(item).attr("id").split("-")[1] })
    };
    fetch('/tasksDelete', body)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw "Error en la llamada Ajax";
            }
        })
        .then(task => {
            removeTask(task);
        })
        .catch(error => {
            console.log('Error: ', error);
        })
}

function taskCompleted(item) {
    let body = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: $(item).attr("id") })
    };
    fetch('/tasksUpdate', body)
        .then(response => {
            if (response.ok) {
                console.log(response)
                return response.json();
            } else {
                throw "Error en la llamada Ajax";
            }
        })
        .then(task => {
            showFinishedTask(task);
        })
        .catch(error => {
            console.log('Error: ', error);
        })
}

function showFinishedTask(task) {
    console.log(task)
    let finishedTask = $('#' + task.id).parent().parent()
    finishedTask.remove()
    let html =
        `
    <div class="card my-3 bg-light">
    <span class="text-secondary text-right p-1 bg-light">This task is done</span>
      <div class="card-body bg-light">
        <p class="card-text">${task.description}</p>
         <input id="del-${task.id}" type="button" onclick="deleteTask(this)" value="Delete" class="btn btn-danger">
        </div>
    </div>
    `;
    let node = document.createRange().createContextualFragment(html);
    document.getElementById('tasksList').append(node);
}

function removeTask(task) {
    console.log(task)
    let finishedTask = $('#del-' + task).parent().parent()
    finishedTask.remove()
}