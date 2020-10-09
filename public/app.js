function storeTask() {
  console.log('Stores the tasks');
  // Javascript
  let taskDescription = document.getElementById('task_description').value;
  console.log('taskDescription', taskDescription);

  let payload = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ description: taskDescription })
  };
  fetch('/tasks', payload)
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
      <input id="${task.id}" type="button" onclick="taskComplete(this)" value="Done" class="btn btn-primary">
      <input id="del-${task.id}" type="button" onclick="deleteTask(this)" value="Delete" class="btn btn-danger">
    </div>
  </div>
  `;
  let node = document.createRange().createContextualFragment(html);
  document.getElementById('task_list').prepend(node);
}

function deleteTask(item) {
  let body = {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({id: $(item).attr("id").split("-")[1]})
  };
  fetch('/tasksDelete', body)
      .then(response => {
          if (response.ok) {
              return response.json();
          } else {
              throw "Error en la llamada Ajax task delete";
          }
      })
      .then(task => {
        let finishedTask = $('#del-' + task).parent().parent()
        finishedTask.remove()
      })
      .catch(error => {
          console.log('Error: ', error);
      })
}

function taskComplete(item) {
  let body = {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({id: $(item).attr("id")})
  };
  fetch('/tasksUpdate', body)
      .then(response => {
          if (response.ok) {
              return response.json();
          } else {
              throw "Error en la llamada Ajax task complete";
          }
      })
      .then(task => {
          showingFinishedTask(task);
      })
      .catch(error => {
          console.log('Error: ', error);
      })
}

function showingFinishedTask(task) {
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