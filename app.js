'use strict';
const PORT = "8000";
var http = require("http");
var path = require("path");
var bodyParser = require("body-parser");
var express = require("express");
var morgan = require("morgan");
var app = express();
var fs = require("fs");

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {
    var indexPath = path.join(__dirname, 'index.html');
    res.sendFile(indexPath);
});

app.get("/getcontacts", function(req, res) {
    fs.readFile("./contactlist.json", (err, data) => {
        res.send(data);
    });
});

app.post("/addcontact", function(req, res) {
    var dataArr = [];
    fs.readFile("./contactlist.json", (err, data) => {
        dataArr = JSON.parse(data);
        console.log(dataArr);

        dataArr.push(req.body);
        fs.writeFile("./contactlist.json", JSON.stringify(dataArr), (err) => {
            console.log(err);
        });
        res.send("worked!");
    });
});


app.delete("/deletecontact/:index", (req, res) => {

    var dataArr = [];

    console.log(req.params.index);

    fs.readFile("./contactlist.json", (err, data) => {
        dataArr = JSON.parse(data);
        dataArr.splice(req.params.index, 1);

        fs.writeFile("./contactlist.json", JSON.stringify(dataArr), (err) => {
            console.log(err);
        });
        res.send(dataArr);
    });
});


app.put("/updatecontact/:index", (req, res) => {

    var dataArr = [];

    console.log(req.params.index);
    console.log(req.body);

    fs.readFile("./contactlist.json", (err, data) => {
        dataArr = JSON.parse(data);
        dataArr[req.params.index] = req.body;

        fs.writeFile("./contactlist.json", JSON.stringify(dataArr), (err) => {
            console.log(err);
            res.send("success!");
        });
    });
});


var server = http.createServer(app);

server.listen(PORT, function() {
    console.log(`Server listening on port ${PORT}`)
});