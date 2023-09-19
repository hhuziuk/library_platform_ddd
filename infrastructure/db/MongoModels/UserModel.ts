import mongoose, {Schema} from 'mongoose';
import Boolean = module
import * as module from "module";

const validateEmail = function(email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

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
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wishlist',
    },
});

const User = mongoose.model('User', UserSchema);
export = User;