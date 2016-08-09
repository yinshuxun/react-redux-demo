const express = require("express");
const path = require("path");
const child_process = require("child_process")

const app = express(),
    port = 3000;

// ceshi agi a app.use(express.static(path.join(__dirname,"/dist")))

app.use("/dist/app.js", function (req, res) {
    res.sendFile(path.join(__dirname, "/dist/app.js"));
})

app.use("/dist/vendors.js", function (req, res) {
    res.sendFile(path.join(__dirname, "/dist/vendors.js"));
})

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

//调用系统命令,打开浏览器
child_process.exec("start http://localhost:3000/#/")
