const express = require('express');
const fs = require('fs');
const router = express.Router();
const warehouseController = require('../controllers/warehouseController');

router.route('/').get(warehouseController.index);

router.route('/:id')
    .get(warehouseController.warehouseById)
    .patch(warehouseController.warehouseUpdate);

module.exports = router;