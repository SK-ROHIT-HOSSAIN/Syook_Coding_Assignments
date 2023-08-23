const express = require("express");

const router = express.Router();

//importing model and controller files
const itemController = require("../controllers/itemController");
const coustomerController = require("../controllers/coustomerController");
const deliveryController = require("../controllers/vehicleController");
const orderController = require("../controllers/orderController");
const adminController = require("../controllers/adminController")
const jwtMiddleware = require("../middleware/jwtMiddleware");

//items

router.post("/createItem",jwtMiddleware.verifytoken,itemController.createItem)
router.get("/readItem",jwtMiddleware.verifytoken,itemController.readItem)
router.put("/updateItem/:itemName",jwtMiddleware.verifytoken,itemController.updateItem)

//coustomer
router.post("/createCoustomer",jwtMiddleware.verifytoken,coustomerController.createCoustomer)
router.get("/readCoustomer",jwtMiddleware.verifytoken,coustomerController.readCoustomer)
router.put("/updateCoustomer/:coustomerName",jwtMiddleware.verifytoken,coustomerController.updateCoustomer)


//delivery vehicles
router.post("/createDelivery",jwtMiddleware.verifytoken,deliveryController.createDelivery)
router.get("/readDelivery",jwtMiddleware.verifytoken,deliveryController.readDelivery)
router.put("/updateDelivery/:deliveryName",jwtMiddleware.verifytoken,deliveryController.updateDelivery)



//order

router.post("/orderCreate",jwtMiddleware.verifytoken, orderController.createOrder);
router.put("/orderUpdate",jwtMiddleware.verifytoken, orderController.updateOrder);

//admin

router.post("/admin",adminController.createAdmin);
//admin log in
router.post(
    "/login",
    jwtMiddleware.verifyEmailPass,
    adminController.adminLogin
);


module.exports = router;
