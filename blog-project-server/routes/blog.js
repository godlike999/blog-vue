var express = require('express');
var router = express.Router();
var dataCtrl = require('../controllers/blog.controller');

router.post('/data',dataCtrl.create);
router.post('/list',dataCtrl.list);
router.post('/removes',dataCtrl.removes);
router.put('/data/:id',dataCtrl.update)
router.get('/',dataCtrl.getAll);
router.delete('/:id',dataCtrl.remove);
router.post('/uploads',dataCtrl.uploads);



module.exports = router;
