const mongoose = require("mongoose");
const ENV = require("dotenv").config();
const OPS = { keepAlive: true, keepAliveInitialDelay: 300000 };
const em = require("../events");

mongoose.connect(ENV.parsed.DB_CONN, OPS).catch((err)=>{
    em.emit("err", {
        code:500,
        error:"Connection error!"
    });
});

const db = {};
db.parent = mongoose;
db.connection = mongoose.connection;

db.mahasiswa = {};
db.mahasiswa.root = mongoose.connection.model("mahasiswa", require("../schemas/mahasiswa/mahasiswa-schema"), "mahasiswa");
db.mahasiswa.detail = mongoose.connection.model("detail_mahasiswa", require("../schemas/mahasiswa/mahasiswa-detail-schema"), "detail_mahasiswa");

module.exports = db;