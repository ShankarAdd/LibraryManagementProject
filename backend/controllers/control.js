const General = require('../model/model');

exports.getGen =(req,res,next) =>{
    General.findAll()
    .then(result =>{
        res.json(result);
    })
    .catch(err =>{
        console.log(err);
    })
}
exports.postGen = (req,res,next) =>{
    const {bookName , takenOn, returnOn, penalty} = req.body;
    General.create({
        bookName:bookName,
        takenOn:takenOn,
        returnOn:returnOn,
        penalty:penalty
    })
    .then(result =>{
        res.json(result);
    })
    .catch(err => console.log(err));
}