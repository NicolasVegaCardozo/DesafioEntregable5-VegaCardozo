import { Schema, model } from 'mongoose';

const cartItemSchema = new Schema({
    id_prod: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
});

const cartSchema = new Schema({
    products: [cartItemSchema],
});

const cartModel = model('Cart', cartSchema);
export default cartModel;

