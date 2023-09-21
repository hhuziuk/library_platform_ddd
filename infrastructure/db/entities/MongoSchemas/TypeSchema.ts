import {model, Schema} from 'mongoose';
import {maxLength, minLength} from "class-validator";

const TypeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        validate: [
            {
                validator: value => minLength(value, 1),
                message: 'name is too short',
            },
            {
                validator: value => maxLength(value, 50),
                message: 'name is too long',
            },
        ],
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
