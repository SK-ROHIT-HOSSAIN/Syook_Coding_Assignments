const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    orderNumber: { type: String, unique: true },
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
    price:{ type : Number},
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    deliveryVehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryVehicle' },
    isDelivered: { type: Boolean, default: false },
});

module.exports = mongoose.model('Order', orderSchema);
