import {model, Schema} from 'mongoose';
import Boolean = module
import * as module from "module";
import isEmail from 'validator/lib/isISBN';

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        minLength: [2, 'username is too short'],
        maxLength: [20, 'username is too long'],
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        validate: {
            validator: (value) => isEmail(value),
            message: 'Invalid email',
        },

    },
    role: {
        type: String,
        required: true,
        default: 'User'
    },
    password: {
        type: String,
        required: true,
        minLength: [8, 'password is too short'],
        maxLength: [30, 'password is too long'],
    },
    isActivated: {
        type: Boolean,
        default: false,
    },
    activationLink: {
        type: String
    },
    wishlist: {
        type: Schema.Types.ObjectId,
        ref: 'Wishlist',
    },
});

const User = model('User', UserSchema);
export default User;