const coustomerModel = require("../models/coustomerModel")

const createCoustomer = async (req,res) =>{
try{
    const name = req.body.name;
    const city = req.body.city;

    if(!name)
    return res.status(400).json({status: false, msg: "name field required"})
    if(name && typeof(name)!= "string"){
        return res.status(400).json({status: false, msg: "name must be a string value."})
    }

    if(!city)
    return res.status(400).json({status: false, msg: "city field required"})
    if(city && typeof(city)!= "string"){
        return res.status(400).json({status: false, msg: "city must be a string value."})
    }

    const data = await coustomerModel.create({name:name, city: city});
    return res.status(201).json({status: true, msg: "coustomer is successfully added"})
}
catch(err){
    return res.status(500).json({status: false, msg: err.message});
}
}

const readCoustomer = async (req,res) => {
    try{
        
      const coustomerRead = await coustomerModel.find();
      let count = 0;
      for(let i in coustomerRead){
        count++;
      }
      return res.status(200).json({status: true, totalcoustomer: count, coustomers: coustomerRead })

    }
    catch(err){
        return res.status(500).json({status: false, msg: err.message});
    }
}

const updateCoustomer = async (req,res ) => {
   try{
    const name = req.params.coustomerName;
    const city = req.body.city;
    const updateName = req.body.name;
    
   if(!city){
    const totalcoustomer = await coustomerModel.updateMany({name: name},{$set: {name : updateName}}, {new : true});
    return res.status(200).json({status: true,  msg: "updated successfully" });
    }
    if(!updateName){
    const totalcoustomer = await coustomerModel.updateMany({name: name},{$set: {city : city}}, {new : true});
    return res.status(200).json({status: true,  msg: "updated successfully" });
    }
    if(city && updateName){
        const totalcoustomer = await coustomerModel.updateMany({name: name},{$set: {name : updateName, city : city}}, {new : true});
    return res.status(200).json({status: true,  msg: "updated successfully" });
    }
    else{
        return res.status(400).json({status: false, msg: "Nothing to update!"})
    }
    
   }
   catch(err){
    return res.status(500).json({status: false, msg: err.message});
}
}

module.exports = {createCoustomer,readCoustomer ,updateCoustomer}