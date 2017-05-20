var express = require('express');
var router = express.Router();
var dataCtrl = require('../controllers/user.controller');

router.post('/data',dataCtrl.create);
router.post('/list',dataCtrl.list);
router.get('/',dataCtrl.getAll);
router.delete('/:id',dataCtrl.remove);
router.post('/removes',dataCtrl.removes);
router.put('/:id',dataCtrl.update);


module.exports = router;
