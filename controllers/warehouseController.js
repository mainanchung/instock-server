const knex = require('knex')(require('../knexfile'))

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
    .select('*', 'warehouses.id as id', 'inventories.id as inventory_id', )
    .then((data) => {
        if (!data.length) {
            knex('warehouses').where('warehouses.id', '=', req.params.id)
            .then((data) => {
            
                console.log(data)
               res.json(data)
            })
        } else {
            res.status(200).json(data);
        }
        
    })
    .catch((err) => 
        res.status(400).send(`Error retrieving warehouses: ${err}`)
    )
}