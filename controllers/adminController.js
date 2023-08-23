const adminModel = require("../models/adminModel")
const jwt = require("jsonwebtoken")

const isValid = function(value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}


//------------------------creating Admin-----------------------------------//
const createAdmin = async function (req, res) {
    try {
        let {email, password} = req.body;
        if(!email){
            return res.status(400).json({status: false, msg: "email is required"})
        }
       

        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: "Please enter Email" });
        }

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            return res.status(400).send({ status: false, message: "Email should be a valid email" })
        }
        const isemailAlreadyUsed = await adminModel.findOne({ email: email });

        if (isemailAlreadyUsed)
        return res.status(400).send({ status: false, message: `${email} email address is already registered` })

        if(!password){
            return res.status(400).json({status: false, msg: "password is required"})
        }
        if (!(password.length >= 8 && password.length <= 15)) {
            return res.status(400).send({ status: false, message: "invalid password" });
        }

        let admin = await adminModel.create({email:email, password : password})
        return res.status(201).send({ "status": true, "data": admin })
    } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
    }

}

//-------------------creating jwt token while login----------------------------//
const adminLogin = async function (req, res) {
    try {
        let id = req.adminId;
        let token = jwt.sign(
            {
                adminId: id,
            },
            "Syook_node_assignment"
        )
        res.setHeader("x-api-key", token)

        return res.status(200).send({
            "status": true,
            "message":"login successfully",
            "data": { "token": token }
        })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }

}

//exporting
module.exports.createAdmin = createAdmin
module.exports.adminLogin = adminLogin
