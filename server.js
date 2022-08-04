const express = require("express");
const em = require("./src/events");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/mahasiswa", require("./src/routes/mahasiswa-route"));
app.all("*", (req, res)=>{
    res.status(404).json({code:404, error:`404 url is not valid`});
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("Server siap!"));

em.on("err", (msg)=>{
    console.log(msg);
    process.exit(0);
});

