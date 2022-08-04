const route = require("express").Router();
const { getAllMhs, getMhs, postMhs, deleteMhs, updateMhs } = require("../controllers/mahasiswa-controller");
const { mhsMidPost, mhsMidDeleteUpdate:mMDU } = require("../middlewares/mahasiswa-middleware");
const multer = require("multer")();

route.get("/", getAllMhs);
route.get("/:npm", getMhs);

route.post("/", multer.single("foto"), mhsMidPost, postMhs);

route.delete("/", (req, res)=>{
    res.status(404).json({code:404, error:`Invalid request: parameter npm is required!`});
})
route.delete("/:npm", mMDU, deleteMhs);

route.put("/", (req, res)=>{
    res.status(404).json({code:404, error:`Invalid request: parameter npm is required!`});
})
route.put("/:npm", mMDU, updateMhs);

module.exports = route;