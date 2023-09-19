import mongoose, { Schema } from "mongoose";


const PublisherSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: [1, 'name is too short'],
        maxlength: [50, 'name is too long'],
    },
});

const Publisher = mongoose.model("Publisher", PublisherSchema);
export default Publisher;