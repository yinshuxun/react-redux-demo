const express = require("express");
const path = require("path");

const app = express(),
    port = 3000;

app.use(function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
})

app.listen(port, function (error) {
    if (error) {
        console.log(error)
    } else {
        console.log("is success!!!port:" + port)
    }
});