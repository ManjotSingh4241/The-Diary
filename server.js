var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
const path = require("path");
var app = express();
var Initialize = require("./diary-service");

function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
    console.log("Application Started");
}

app.use(express.static('public'));

app.get("/app", function(req,res){
    res.status(404).send('Page Not  Found');
});

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get("/about", function(req, res){
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

app.get("/content/upload", function(req, res){
    res.sendFile(path.join(__dirname, 'views', 'upload.html'));
});

app.get("/content", (req, res) => {
    Initialize.displayAllContent().then((data) => {
        res.json(data);
    }).catch((err) => {
        res.status(500).json("No results returned");
    });
});

app.get("/contentAllowed", (req, res) => {
    Initialize.permittedContent().then((data) => {
        res.json(data);
    }).catch((err) => {
        res.status(500).json("No results returned");
    });
});

app.use(express.urlencoded({ extended: true }));

app.post('/content/upload', (req, res) => {
    Initialize.upload(req.body).then(() => {
        res.redirect("/contentAllowed");
    })
});

Initialize.initialize()
    .then(() => {
        console.log("Data read successfully");
        app.listen(HTTP_PORT, onHttpStart);
    })
    .catch((err) => {
        console.error("Error:", err);
    });
