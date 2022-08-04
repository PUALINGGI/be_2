const { Schema } = require("mongoose");

const detail = new Schema({
    _id: { type:Schema.Types.ObjectId },
    semester: { type:Number, default:0 },
    fakultas: { type:String, default:"" },
    jurusan: { type:String, default:"" },
    alamat: { type:String, default:"" },
    social:{ type:Schema.Types.Map, default:null },
    avatar:{
        buff:{ type:Schema.Types.Buffer, default:null },
        mimetype: { type:String, default:"" }
    }
});

module.exports = detail;