const express = require('express');
const fs = require('fs');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

router.route("/")
    .get(inventoryController.index)
    .post(inventoryController.addInventory);

router.route("/edit")
    .get(inventoryController.getCategories);

router.route("/:id")
    .get(inventoryController.getInventoryById)
    .patch(inventoryController.inventoryItemUpdate)
    .delete(inventoryController.deleteInventoryById);



module.exports = router;