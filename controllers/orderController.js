const orderModel = require("../models/orderModel")
const itemModel = require("../models/itemModel")
const deliveryVechileModel = require("../models/deliveryVehicles")
const coustomerModel = require("../models/coustomerModel")

const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId

var p = 1;
const createOrder = async (req,res) => {
   try{
     const {itemId, customerId, deliveryVehicleId} = req.body
    if(!itemId || !customerId || !deliveryVehicleId) {
        return res.status(400).json({status: false, msg: "missing important field."});
    }
   
    if (itemId && !ObjectId.isValid(itemId)) {
        return res.status(400).send({status:false,message:"itemId is invalid"})
    }

    if (customerId && !ObjectId.isValid(customerId)) {
        return res.status(400).send({status:false,message:"customerId is invalid"})
    }

    if (deliveryVehicleId && !ObjectId.isValid(deliveryVehicleId)) {
        return res.status(400).send({status:false,message:"deliveryVehicleId is invalid"})
    }

    let s;
    if(p <= 9){
        s = `00${p}`;
    }
    if(p >= 10 && p <= 99){
        s = `0${p}`
    }
    if(p >= 100 && p <= 999){
        s = `${p}`
    }
    const orderNumber = s;
    p++;
    const price = await itemModel.findById({itemId}).select({price: 1})

    const city = await coustomerModel.findById({customerId}).select({city: 1})
    const  count   = await deliveryVechileModel.findById({deliveryVehicleId}). select({activeOrdersCount: 1})
    if(count == 0){
        return res.status(404).json({status: false, msg: "A delivery vehicle can have max 2 orders, if no truck is available can't place an order."})
    }

    const orderCreate = await orderModel.create({orderNumber: orderNumber, itemId:itemId, price: price, customerId:customerId,city: city, deliveryVehicleId: deliveryVehicleId,})
    return res.status(201).json({status: true, msg:"Order created successfullly", createdOrder: orderCreate})

}catch(err){
    return res.status(500).json({status: false, msg: err.message})
}
}

const updateOrder = async (req,res) => {
    const {isDelivered} = req.body
    if(!isDelivered){
        return res.status(400).json({status: false, msg: "missing isDelivered key"});
    }

    if(isDelivered == true){
        deliveryVechileModel.findByIdAndUpdate({deliveryVehicleId},{$set:  { $inc: { activeOrdersCount: -1 } }})
    }
    return res.status(200).json({status: true, msg: "delivered item successfully."});
}

module.exports = {createOrder,updateOrder }