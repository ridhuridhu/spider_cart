const mongoose = require('mongoose');
var AutoIncrement = require("mongoose-sequence")(mongoose);
mongoose.plugin(schema => { schema.options.usePushEach = true });

const orderSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: false
    },
    buyer: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
    order: [{
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        title: {
            type: String
        },
        price: {
            type: Number
        },
        quantity: {
            type: Number
        },

        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

    }],

});


orderSchema.plugin(AutoIncrement, {
    id: "id_order",
    inc_field: "id"
});
module.exports = mongoose.model('orders', orderSchema);