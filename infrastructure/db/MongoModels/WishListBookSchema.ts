import {model, Schema} from 'mongoose';

const WishlistBookSchema = new Schema({
    wishlist: {
        type: Schema.Types.ObjectId,
        ref: 'Wishlist',
        required: true,
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    },
});

const WishlistBook = model('WishlistBook', WishlistBookSchema);

export default WishlistBook;
