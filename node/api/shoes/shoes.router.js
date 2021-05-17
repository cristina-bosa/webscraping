const controller = require('./shoes.controller');
var router = require('express').Router();

router.get('/', controller.getAll);
router.get('/shoe/:id', controller.getById);
router.get('/:brand', controller.getByBrand);
router.post('/shoe', controller.create);
router.patch('/shoe/:id', controller.modifyProductById);
router.patch('/:id', controller.modifyFavById);

module.exports = router;