//Imports
const cors = require('cors');
var express = require("express");
var app = express();

app.use(cors());
app.options('*', cors());

app.get("/temperatura", (req, res, next) => {
    res.json({"temperatura" : 20});
});

app.get("/humedad", (req, res, next) => {
    res.json({"humedad" : 60});
});

app.get("/gas", (req, res, next) => {
    res.json({"gas" : 0});
});


app.listen(5000, function () {
	console.log("Servidor Iniciado en http://localhost:5000");
});


