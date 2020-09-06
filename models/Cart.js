const mongoose = require("mongoose");
var AutoIncrement = require("mongoose-sequence")(mongoose);
mongoose.plugin(schema => { schema.options.usePushEach = true });


const CartSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    items: [{
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
        date: {
            type: String
        },
    }],
    total: {
        type: Number,
        default: 0
    },
});


CartSchema.plugin(AutoIncrement, {
    id: "id_cart",
    inc_field: "id"
});
module.exports = mongoose.model('carts', CartSchema);