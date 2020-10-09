const router = require('express').Router();
const homepageController = require('../controllers/HomepageController');
const tasksController = require('../controllers/TasksController');

router.get('/', homepageController.index);
router.post('/tasks', tasksController.store);
router.post('/tasksUpdate', tasksController.markDone);
router.post('/tasksDelete', tasksController.delete);

module.exports = router;
