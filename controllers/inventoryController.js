const knex = require("knex")(require("../knexfile"))
const { v4: uuidv4 } = require('uuid');

exports.index = (req, res) => {

    knex("inventories")
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) =>
        res.status(400).send(`Error retrieving Inventory: ${err}`)
    )
}

exports.addInventory = (req, res) => {
    const {warehouse_id, item_name, description, category, quantity, status} = req.body;
    let id = uuidv4();
    if(!warehouse_id||!item_name||!description||!category||!quantity||!status)
        return res.json("Error, all fields must be complete");
    knex("inventories")
        .insert({id, warehouse_id, item_name, description, category, quantity, status})
            .then((data) =>{
                res.json({
                    message: 'Created inventory successfully.'
                });
            }).catch((error) => {
                console.log(error)
            })
}