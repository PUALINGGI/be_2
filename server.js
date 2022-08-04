const express = require("express");
const em = require("./src/events");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const ENV = require("dotenv").config();

app.use("/mahasiswa", require("./src/routes/mahasiswa-route"));
app.all("*", (req, res)=>{
    res.status(404).json({code:404, error:`404 url is not valid`});
});

app.listen(ENV.parsed.PORT, console.log("Server siap!"));
em.on("err", (msg)=>{
    process.exit(0);
});

