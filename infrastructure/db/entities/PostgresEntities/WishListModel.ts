import { Entity, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import {WishlistBook} from "./WishListBooksModel";
import {User} from "./UserModel";


@Entity('Wishlist')
export class Wishlist {
    @PrimaryGeneratedColumn()
    public id: number;

    @OneToMany(() => WishlistBook, wishlistBook => wishlistBook.wishlist)
    wishlistBooks: WishlistBook[];

    @OneToOne(() => User, user => user.wishlist)
    @JoinColumn()
    user: User;
}
