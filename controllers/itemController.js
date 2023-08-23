const itemModel = require("../models/itemModel")

const createItem = async (req,res) =>{
try{
    const name = req.body.name;
    const price = req.body.price;

    if(!name)
    return res.status(400).json({status: false, msg: "name field required"})
    if(name && typeof(name)!= "string"){
        return res.status(400).json({status: false, msg: "name must be a string value."})
    }

    if(!price)
    return res.status(400).json({status: false, msg: "price field required"})

    if(price && typeof(price)!= "number"){
        return res.status(400).json({status: false, msg: "price must be a number value."})
    }

    const data = await itemModel.create({name:name, price: price});
    return res.status(201).json({status: true, msg: "item is successfully added"})
}
catch(err){
    return res.status(500).json({status: false, msg: err.message});
}
}

const readItem = async (req,res) => {
    try{
        
      const itemRead = await itemModel.find();
      let count = 0;
      for(let i in itemRead){
        count++;
      }
      return res.status(200).json({status: true, totalItem: count, items: itemRead })

    }
    catch(err){
        return res.status(500).json({status: false, msg: err.message});
    }
}

const updateItem = async (req,res ) => {
   try{
    const name = req.params.itemName;
    const price = req.body.price;
    const updateName = req.body.name;
   if(!price){
    const totalcoustomer = await coustomerModel.updateMany({name: name},{$set: {name : updateName}}, {new : true});
    return res.status(200).json({status: true,  msg: "updated successfully" });
    }
    if(!updateName){
    const totalcoustomer = await coustomerModel.updateMany({name: name},{$set: {price : price}}, {new : true});
    return res.status(200).json({status: true,  msg: "updated successfully" });
    }
    if(price && updateName){
        const totalcoustomer = await coustomerModel.updateMany({name: name},{$set: {name : updateName, price : price}}, {new : true});
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

module.exports = {createItem,readItem ,updateItem}