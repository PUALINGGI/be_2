const { Schema } = require("mongoose");

const mahasiswa = new Schema({
    nama: { type:String, required:true },
    npm: { type:String, required:true },
    detail: { type:Schema.Types.ObjectId, ref:"detail_mahasiswa" }
});

module.exports = mahasiswa;