import mongoose, { Schema } from "mongoose";

const incomeSchema = new Schema({
    user: {type: Schema.ObjectId, ref: 'usuarios', required: true},
    person: {type: Schema.ObjectId, ref: 'personas', required: true},
    voucher_type: {type: String, maxlength: 20, required: true},
    voucher_serial: { type: String, maxlength: 7},
    voucher_num: {type: String, maxlength: 10, required: true},
    tax: {type: Number, required: true},
    total: {type: Number, required: true},
    details: [{
        _id: {
            type: String, 
            required: true
        },
        article: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
    state: {type: Number, default: 1},
    createdAt: {type: Date, default: Date.now}
});

const Income = mongoose.model('ingreso', incomeSchema);
export default Income;