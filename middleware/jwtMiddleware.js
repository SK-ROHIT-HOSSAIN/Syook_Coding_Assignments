const adminModel = require("../models/adminModel")
const jwt = require("jsonwebtoken")


const isValid = function(value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}

// creating middleware for verifying emailId and passeord while login 
const verifyEmailPass = async function (req, res, next) {
    try {
        let data = req.body
        let { email, password } = data;
        if(!email){
            return res.status(400).json({status: false, msg: "email is required"})
        }
       

        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: "Please enter Email" });
        }

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            return res.status(400).send({ status: false, message: "Email should be a valid email" })
        }
        
        if(!password){
            return res.status(400).json({status: false, msg: "password is required"})
        }
        if (!(password.length >= 8 && password.length <= 15)) {
            return res.status(400).send({ status: false, message: "invalid password" });
        }


        let admin = await adminModel.findOne({ email: email, password: password })
        if (!admin) {
            return res.status(401).send({ status: false, message: "email or password is incorrect" })
        }
        let adminId = admin._id
        req.adminId = adminId
        next()
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }

}

//creating middleware for verifying header Token 
const verifytoken = async function (req, res, next) {
    try {
        let token = req.header("x-api-key")
        if (!token) {
            return res.status(401).send({ status: false, message: "required token is missing (first login)" })
        }
        let decoded = jwt.verify(token, "Syook_node_assignment")
        if (!decoded) {
            return res.status(403).send({ status: false, message: "invalid token" })
        }
        req.adminId = decoded.adminId
        next()
    }
    catch (err) {
        if (err.message.includes("signature") || err.message.includes("token") || err.message.includes("malformed")) {
            return res.status(403).send({ status: false, message: "You are not Authenticated" })
        }
        return res.status(500).send({ status: false, message: err.message })
    }
}



//exporting 
module.exports.verifyEmailPass = verifyEmailPass
module.exports.verifytoken = verifytoken

