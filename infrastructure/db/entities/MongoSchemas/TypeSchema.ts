import {model, Schema} from 'mongoose';

const TypeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 1,
        maxlength: 50,
        validate: {
            validator: (value) => {
                return value.length <= 50;
            },
            message: 'Name is too long',
        },
    },
    books: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Book',
        },
    ],
    publishers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Publisher',
        },
    ],
});

const Type = model('Type', TypeSchema);

export default Type;
