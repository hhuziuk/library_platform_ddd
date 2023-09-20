import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import {Wishlist} from "./WishListModel";
import {Book} from "./BookModel";


@Entity('WishlistBook')
export class WishlistBook {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => Wishlist, wishlist => wishlist.wishlistBooks)
    wishlist: Wishlist;

    @ManyToOne(() => Book, book => book.wishlistBooks)
    book: Book;
}
