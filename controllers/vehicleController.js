const deliveryVechileModel = require("../models/deliveryVehicles")
const coustomerModel = require("../models/coustomerModel")

const createDelivery = async (req, res) => {
    try {
        const { vehicleType, city } = req.body;
        if(city && typeof(city)!= "string"){
            return res.status(400).json({status: false, msg: "city must be a string value."})
        }
        if(vehicleType && typeof(vehicleType)!= "string"){
            return res.status(400).json({status: false, msg: "vehicle must be a string value."})
        }

        if (!["bike","truck"].includes(vehicleType)) {
            return res.status(400).send({ status: false, msg: "Invalid vehicle type" });
        }

        const existsCity = await coustomerModel.findOne({ city: city });
        if (!existsCity) {
            return res.status(400).json({ status: false, msg: "coustomer city does not exists!" })
        }
        const date = Date.now();
        const reg = "SYOOK" + date;

        const data = await deliveryVechileModel.create({ registrationNumber: reg, vehicleType: vehicleType, city: city })
        return res.status(201).json({ status: true, msg: "Successfully created" })
    }
    catch (err) {
        return res.status(500).json({ status: false, msg: err.message })
    }
}

const readDelivery = async (req, res) => {
    try {
        const data = await deliveryVechileModel.find()
        return res.status(200).json({ status: true, deliveryVechileM: data })
    }
    catch (err) {
        return res.status(500).json({ status: false, msg: err.message })
    }
}

const updateDelivery = async (req, res) => {
    try {
        const { vehicleType, city,  registrationNumber } = req.body;
        if(city && typeof(city)!= "string"){
            return res.status(400).json({status: false, msg: "city must be a string value."})
        }
        if(vehicleType && typeof(vehicleType)!= "string"){
            return res.status(400).json({status: false, msg: "vehicle must be a string value."})
        }

        if (!["bike","truck"].includes(vehicleType)) {
            return res.status(400).send({ status: false, msg: "Invalid vehicle type" });
        }
        if(!registrationNumber){
            return res.status(404).json({status: false, msg: "please provide reg. no for indentifying particular delevery data."})
        }
        const reg = await deliveryVechileModel.findOne({registrationNumber: registrationNumber})
        if(!reg){
            return res.status(400).json({status: false, msg: "invalid registration number."})
        }
        if (!city && vehicleType) {
            const data = await deliveryVechileModel.findOneAndUpdate({ registrationNumber: registrationNumber }, { $set: { vehicleType: vehicleType } })
            return res.status(200).json({
                status: true, msg: "Successfully updated"});
            }
       if (city && !vehicleType) {
                const existsCity = await coustomerModel.findOne({ city: city });

                if (!existsCity) {
                    return res.status(400).json({ status: false, msg: "coustomer city does not exists!" })
                }


                const data = await deliveryVechileModel.findOneAndUpdate({ registrationNumber: registrationNumber }, { $set: { city: city } })
                return res.status(201).json({ status: true, msg: "Successfully created" })
            }

        if(city && vehicleType){
            const existsCity = await coustomerModel.findOne({ city: city });

                if (!existsCity) {
                    return res.status(400).json({ status: false, msg: "coustomer city does not exists!" })
                }


                const data = await deliveryVechileModel.findOneAndUpdate({ registrationNumber: registrationNumber }, { $set: { city: city , vehicleType: vehicleType } })
                return res.status(201).json({ status: true, msg: "Successfully created" })
            
        }

        }
    catch (err) {
            return res.status(500).json({ status: false, msg: err.message })
        }
    }

    module.exports = {createDelivery, readDelivery, updateDelivery}
