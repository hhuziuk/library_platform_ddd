import {User} from "../infrastructure/db/entities/UserModel";

require('dotenv').config()
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import path from "path";
import {Book} from "../infrastructure/db/entities/BookModel";
import {Publisher} from "../infrastructure/db/entities/PublisherModel";
import {Type} from "../infrastructure/db/entities/TypeModel";
import {Token} from "../infrastructure/db/entities/TokenModel";
import {WishlistBook} from "../infrastructure/db/entities/WishListBooksModel";
import {Wishlist} from "../infrastructure/db/entities/WishListModel";
// @ts-ignore
// @ts-ignore
export const PostgresDataSource = new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT || '', 10),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: false,
    logging: false,
    name: 'default',
    entities: [
        User, Book, Publisher, Type, Token, WishlistBook, Wishlist
    ]
})