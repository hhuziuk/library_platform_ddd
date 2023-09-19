import mongoose from 'mongoose';
import isISBN from 'validator/lib/isISBN';

const BookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 80,
        validate: {
            validator: (value) => {
                return value.length <= 80;
            },
            message: 'Name is too long',
        },
    },
    author: {
        type: String,
        required: true,
        maxlength: 80,
        validate: {
            validator: (value) => {
                return value.length <= 80;
            },
            message: "Author's name is too long",
        },
    },
    description: {
        type: String,
        required: true,
        maxlength: 100,
        validate: {
            validator: (value) => {
                return value.length <= 100;
            },
            message: 'Description is too long',
        },
    },
    file: String,
    ISBN: {
        type: String,
        required: true,
        validate: {
            validator: (value) => isISBN(value),
            message: 'Invalid ISBN',
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Type',
    },
    publisher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Publisher',
    },
    wishlistBooks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'WishlistBook',
        },
    ],
});

const Book = mongoose.model('Book', BookSchema);

export default Book;
