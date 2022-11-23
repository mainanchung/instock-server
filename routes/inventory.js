const express = require('express');
const fs = require('fs');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

router.route("/")
    .get(inventoryController.index)
    .post(inventoryController.addInventory);


module.exports = router;