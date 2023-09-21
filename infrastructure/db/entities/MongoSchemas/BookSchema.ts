import {model, Schema} from 'mongoose';
import isISBN from 'validator/lib/isISBN';

const BookSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 80,
    },
    author: {
        type: String,
        required: true,
        maxlength: 80,
    },
    description: {
        type: String,
        required: true,
        maxlength: 100,
    },
    file: String,
    ISBN: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^(\d{10}|\d{13})$/.test(value);
            },
            message: 'Invalid ISBN format',
        },
    },
    typeId: {
        type: Number,
        required: true,
    },
    publisherId: {
        type: Number,
        required: true,
    },
    type: {
        type: Schema.Types.ObjectId,
        ref: 'Type',
    },
    publisher: {
        type: Schema.Types.ObjectId,
        ref: 'Publisher',
    },
    wishlistBooks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'WishlistBook',
        },
    ],
});

const Book = model('Book', BookSchema);

export default Book;
