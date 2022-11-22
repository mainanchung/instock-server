const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json())
app.use(express.static('public'));

const inventoryRoutes = require('./routes/inventory');
const wareHouseRoutes =  require('./routes/warehouse');

app.use('/inventory', inventoryRoutes);
app.use ('/warehouse', wareHouseRoutes);

app.get("/", (req, res) => {
    res.send("Testing"); 
})

app.listen(PORT, () => {
    console.log('Server stated on http://localhost:8080');
    console.log("Press CTRL + C to stop server"); 
})