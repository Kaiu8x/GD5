const Task = require('../models/Task');

exports.store = (req, res) => {
  let task = {};
  task.description = req.body.description;
  Task.create(task).then((id) => {
    console.log('Task created with id: ', id);
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      Task.find(id).then((task) => res.json(task));
    } else {
      res.redirect('/');
    }
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

exports.delete = (req, res) => {
  Task.delete(req.body.id).then(() => {
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      res.json(req.body.id);
    } else {
      res.redirect('/');
    }
  });
}