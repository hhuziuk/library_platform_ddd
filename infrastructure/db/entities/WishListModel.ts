import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany} from "typeorm";
import {User} from "./UserModel";
import {WishlistBook} from "./WishListBooksModel";

@Entity('Wishlist')
export class Wishlist {
    @PrimaryGeneratedColumn()
    public id: number;

    @OneToMany(() => WishlistBook, wishlistBook => wishlistBook.wishlist)
    wishlistBooks: WishlistBook[];

    @OneToOne(() => User, user => user.wishlist)
    user: User;
}