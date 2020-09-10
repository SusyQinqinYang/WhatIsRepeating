const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3055;

//middleware
app.use(bodyParser.json())

//frontend
app.use(express.static(__dirname + "/../client/dist"));

//API routes
let storage = [];
//get route
app.use("/get", (req, res) => {
    var resStr = storage.join(',');
    if (!storage.length) {
        res.status(404).send(`You haven't told me anything yet.`)
    } else {
        res.json(resStr);
    }
});

//post route
app.use("/post", (req, res) => {
    var text = req.body.text;
    storage.push(text);
    res.sendStatus(201);
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });