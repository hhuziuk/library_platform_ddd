import mongoose, {model, Schema} from 'mongoose';

const WishlistSchema = new Schema({
    wishlistBooks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'WishlistBook',
        },
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

const Wishlist = model('Wishlist', WishlistSchema);
export default Wishlist;
