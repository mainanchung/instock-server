const knex = require('knex')(require('../knexfile'))
const { v4: uuidv4 } = require('uuid');

exports.index = (req, res) => {
    knex('warehouses')
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) =>
            res.status(400).send(`Error retrieving Warehouses: ${err}`)
        )
}

exports.warehouseById = (req, res) => {
    knex('warehouses')
        .where('warehouses.id', '=', req.params.id)
        .join('inventories', 'inventories.warehouse_id', '=', 'warehouses.id')
        .select('*', 'warehouses.id as id', 'inventories.id as inventory_id',)
        .then((data) => {
            if (!data.length) {
                knex('warehouses').where('warehouses.id', '=', req.params.id)
                    .then((data) => {
                        console.log(data)
                        res.status(200).json(data)
                    })
            } else {
                res.status(200).json(data);
            }

        })
        .catch((err) =>
            res.status(400).send(`Error retrieving warehouses: ${err}`)
        )
}

exports.warehouseUpdate = (req, res) => {
    knex("warehouses")
        .where({ id: req.params.id })
        .update(req.body)
        .then((data) => {
            res.json(data);
        })
        .catch((error) =>{
            res.status(400).send(`Invalid field input: ${error}`)
        })
}

exports.addWarehouse = (req, res) => {
    let id = uuidv4();
    const {warehouse_name, address, city, country, contact_name, contact_position, contact_phone, contact_email} = req.body;
    if (!warehouse_name || !address || !city || !country || !contact_name || !contact_position || !contact_phone || !contact_email) return res.json("Error, all fields must be complete");
    knex("warehouses") // table to work with
        .insert({...req.body, id})
        .then((data) => {
            res.status(201).json(data); // 201 created something
        })
        .catch((error) =>{
            res.status(400).send(`Invalid field input: ${error}`)
        })
}