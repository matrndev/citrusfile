const express = require("express")
const app = express()
const file = require("express-fileupload")
const id = require("shortid")

//// CONFIG ////

const port = 3000; // change to your preffered port
var url = "localhost:" + port; // change to url/ip adress of the server hosting this (the colon [:] is important!)

//// CONFIG ////


app.use(file());


app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => {
    res.render("index.ejs")
})

app.get("/upload", (req, res) => {
    res.render("upload.ejs")
})

app.post("/send", (req, res) => {
    try {
        const uploadedfile = req.files.file;
        const randnum = Math.round(Math.random())
        var result;
        if (randnum == 0) result = "orange"
        if (randnum == 1) result = "lemon"
        const filesuffix = req.files.file.name.split(".")
        const filepath = "/files/" + result + "-" + id.generate() + "." + filesuffix[1]
        uploadedfile.mv("./public" + filepath)
        res.render("done.ejs", {link: "http://" + url + filepath})
    } catch {
        res.render("error.ejs")
    }
    
})

app.listen(port, () => {
    console.log("CitrusFile running on http://" + url);
})