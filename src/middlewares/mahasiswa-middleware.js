
const db = require("../models");

module.exports.mhsMidPost = (req, res, next)=>{
    let prePost = [req.body.nama??false, req.body.npm??false];
    if(prePost.includes(false))
        return res.status(400).json({ code:400, error:"Some Request Body Is Missing!" });
    db.mahasiswa.root.where({ npm:req.body.npm }).countDocuments((err, count)=>{
        if(err) return res.status(500).json({ code:500, error:`Internal Error: ${err}` });
        if(count>1) return res.status(409).json({ code:409, error:"Mahasiswa has been registerd!" });
        next();
    })
}

module.exports.mhsMidDeleteUpdate = (req, res, next)=>{
    db.mahasiswa.root.where({ npm:req.params.npm }).countDocuments((err, count)=>{
        if(err) return res.status(500).json({code:500, error:err.message??err});
        if(count<1) return res.status(400).json({code:400, error:`Mahasiswa with NPM ${req.params.npm} is not found in database!`})
        next();
    })
}