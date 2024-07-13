// first
const express = require('express');
const cors = require('cors');
const app = express();  

const contact = require('./routes/contact');
// last end
require('./connection/connection');
// 3rd
// app.get("/", (req, res) => {
//     res.send("Hello from server");
// })

// 4th
app.use(express.json());
app.use(cors());


app.use('/api/v1',contact);
// second
app.listen("1000",() => {
    console.log('Server started on port 1000')
});
