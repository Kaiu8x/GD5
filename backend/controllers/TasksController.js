const Task = require('../models/Task');

exports.store = (req, res) => {
    let task = {};
    task.description = req.body.description;
    Task.create(task).then((id) => {
        console.log('Task created with id: ', id);
        // if the request is expecting an ajax or json response
        if (req.xhr || req.headers.accept.indexOf('json') > -1) {
            Task.find(id).then((task) => res.json(task));
        } else {
            res.redirect('/');
        }

    });
}

exports.storeReact = (req, res) => {
    let task = {};
    task.description = req.body.description;
    Task.create(task).then((id) => {
        let tasks = Task.all().then((tasks) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(tasks));
        });
    });
}

exports.displayAllTasks = (req, res) => {
    let tasks = Task.all().then((tasks) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(tasks));
    });
}

exports.markDone = (req, res) => {
    Task.done(req.body.id).then((task) => {
        if (req.xhr || req.headers.accept.indexOf('json') > -1) {
            Task.find(task.id).then((task) => res.json(task));
        } else {
            res.redirect('/');
        }

    });
}

exports.markDoneReact = (req, res) => {
    Task.done(req.body.id).then((task) => {
        console.log(task.id)
        console.log('Task updated with id : ', task.id);
        let tasks = Task.all().then((tasks) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(tasks));
        });

    });
}

exports.delete = (req, res) => {
    Task.delete(req.body.id).then(() => {
      if (req.xhr || req.headers.accept.indexOf('json') > -1) {
        res.json(req.body.id);
      } else {
        res.redirect('/');
      }
    });
  }

exports.deleteTaskReact = (req, res) => {
    Task.delete(req.body.id).then(() => {
        let tasks = Task.all().then((tasks) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(tasks));
        });
    });
}