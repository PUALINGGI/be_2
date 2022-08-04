module.exports.newUUID = (instance)=>{
    const uuid = new instance.Types.ObjectId();
    return uuid.toString();
}

module.exports.mhsBody = (req)=>{
    const nama = req.body.nama&&{ nama:req.body.nama };
    const npm = req.body.npm&&{ npm:req.body.npm };
    return { ...nama, ...npm };
}

module.exports.detailMhsBody = (req)=>{
    const semester = req.body.semester&&{ semester:req.body.semester };
    const fakultas = req.body.fakultas&&{ fakultas:req.body.fakultas };
    const jurusan = req.body.jurusan&&{ jurusan:req.body.jurusan };
    const alamat = req.body.alamat&&{ alamat:req.body.alamat }
    const social = req.body.social&&{ social: { ...JSON.parse(req.body.social) }  };
    const avatar = req.file&&{ avatar: { buff:req.file.buffer, mimetype:req.file.mimetype } };
    return { ...semester, ...fakultas, ...jurusan, ...alamat, ...social, ...avatar }
}