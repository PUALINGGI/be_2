const db = require("../models");
const { newUUID, mhsBody, detailMhsBody } = require("../helpers/pre-response");

module.exports.getAllMhs = (req, res)=>{
    db.mahasiswa.root.find().select("-_id -__v").populate({
        path:"detail", select:"-_id -__v"
    }).exec((err, docs)=>{
        if(err) return res.status(500).json({ code:500, error:err.message??err })
        res.status(200).json({ code:200, data:docs });
    });
}

module.exports.getMhs = (req, res)=>{
    db.mahasiswa.root.findOne().where({ npm:req.params.npm }).select("-_id -__v")
    .populate({ path:"detail", select:"-_id -__v" }).exec((err, doc)=>{
        if(err) return res.status(500).json({code:500, error:err.message??err});
        res.status(200).json({ code:200, data:doc??"" });
    })
}

module.exports.postMhs = (req, res)=>{
    const bodyMhs = mhsBody(req);
    const bodyDetail = detailMhsBody(req);
    db.mahasiswa.root.create({ ...bodyMhs, detail:newUUID(db.parent) }, (err, doc)=>{
        if(err) return res.status(500).json({code:500, error:err.message??err});
        db.mahasiswa.detail.create({ _id:doc.detail, ...bodyDetail }, (err, doc)=>{
            if(err) return res.status(500).json({code:500, error:err.message??err});
            res.status(201).json({code:201, success:`Mahasiswa with NPM ${req.body.npm} has been created!`})
        })
    })
}

module.exports.deleteMhs = (req, res)=>{
    db.mahasiswa.root.findOneAndDelete().where({npm:req.params.npm}).exec((err, doc)=>{
        if(err) return res.status(500).json({code:500, error:err.message??err});
        db.mahasiswa.detail.findOneAndDelete().where({_id:doc.detail}).exec((err, doc)=>{
            if(err) return res.status(500).json({code:500, error:err.message??err});
            res.status(200).json({code:200, success:`Mahasiswa with NPM ${req.params.npm} has been deleted!`});
        })
    })
}

module.exports.updateMhs = (req, res)=>{
    const bodyMhs = mhsBody(req);
    const bodyDetail = detailMhsBody(req);
    db.mahasiswa.root.findOneAndUpdate().where({npm:req.params.npm}).set({...bodyMhs})
    .exec((err, doc)=>{
        if(err) return res.status(500).json({code:500, error:err.message??err});
        db.mahasiswa.detail.findOneAndUpdate().where({_id:doc.detail}).set({...bodyDetail})
        .exec((err, doc)=>{
            if(err) return res.status(500).json({code:500, error:err.message??err});
            res.status(201).json({code:201, success:`Mahasiswa with NPM ${req.params.npm} has been updated!`});
        })
    })
}
