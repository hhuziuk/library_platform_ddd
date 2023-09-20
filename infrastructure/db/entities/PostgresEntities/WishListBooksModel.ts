import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany} from "typeorm";
import {Wishlist} from "./WishListModel";
import {Book} from "./BookModel";

@Entity('WishlistBook')
export class WishlistBook {
    @PrimaryGeneratedColumn()
    public id: number;


    @ManyToOne(() => Wishlist, basket => basket.wishlistBooks)
    wishlist: Wishlist;

    @ManyToOne(() => Book, book => book.wishlistBooks)
    book: Book;
}