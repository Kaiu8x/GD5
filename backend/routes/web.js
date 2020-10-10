const router = require('express').Router();
const homepageController = require('../controllers/HomepageController');
const tasksController = require('../controllers/TasksController');
const cors = require('cors');

router.get('/', homepageController.index);
router.get('/allTasks', cors(), tasksController.displayAllTasks);
router.post('/deleteTask', cors(),tasksController.deleteTaskReact);
router.post('/createTask', cors(),tasksController.storeReact);
router.post('/doneTask', cors(),tasksController.markDoneReact);

router.post('/tasks', tasksController.store);
router.post('/tasksUpdate', tasksController.markDone);
router.post('/tasksDelete', tasksController.delete);

module.exports = router;