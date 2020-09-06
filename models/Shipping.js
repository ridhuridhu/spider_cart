const mongoose = require('mongoose');
var AutoIncrement = require("mongoose-sequence")(mongoose);
mongoose.plugin(schema => { schema.options.usePushEach = true });

const shippingSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: false
    },
    seller: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
    shipping: [{
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
        data: {
            type: String
        },
        buyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

    }],
});

shippingSchema.plugin(AutoIncrement, {
    id: "id_shipping",
    inc_field: "id"
});
module.exports = mongoose.model('shipping', shippingSchema);