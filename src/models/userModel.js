import mongoose from "mongoose";
import { createHash } from "../utils/cryptoUtil.js";
import mongoosePaginate from "mongoose-paginate-v2";


const userCollection = 'users';

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        minLength: 3,
        required: true
    },
    last_name: {
        type: String,
        minLength: 3,
        required: true
    },
    email: {
        type: String,
        minLength: 5,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        min: 18,
        required: true
    },
    password: {
        type: String,
        minLength: 5,
        required: true
    },

    
    role: {
        type: String,
        required: true,
        enum: ['admin', 'premium', 'user'],
        default: 'user'
    },

    cart: {
        type: [
            {
                cart: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'carts',
                },
            }
        ],
        default: []
}
});

userSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        this.password = createHash(this.password);
    }
    next();
});

userSchema.plugin(mongoosePaginate);
const userModel = mongoose.model(userCollection, userSchema);

export default userModel;
