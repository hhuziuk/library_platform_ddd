import {model, Schema} from 'mongoose';
import isEmail from 'validator/lib/isEmail';

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        minlength: 1,
        maxlength: 50,
        validate: {
            validator: function (value) {
                return /^[a-zA-Z0-9_.-]+$/.test(value); // Add any custom validation if needed
            },
            message: 'username is too short',
        },
    },
    password: {
        type: String,
        minlength: 4,
        maxlength: 120,
    },
    email: {
        type: String,
        unique: true,
        validate: {
            validator: function (value) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value); // Basic email validation
            },
            message: 'Invalid email format',
        },
    },
    isActivated: {
        type: Boolean,
        default: false,
    },
    activationLink: {
        type: String,
    },
    role: {
        type: String,
        default: 'USER',
    },
    wishlist: {
        type: Schema.Types.ObjectId,
        ref: 'Wishlist',
    },
});

const User = model('User', UserSchema);
export default User