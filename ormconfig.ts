import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions";
import path from "path";
import {User} from "./infrastructure/db/entities/PostgresEntities/UserModel";
import {Book} from "./infrastructure/db/entities/PostgresEntities/BookModel";
import {Publisher} from "./infrastructure/db/entities/PostgresEntities/PublisherModel";
import {Type} from "./infrastructure/db/entities/PostgresEntities/TypeModel";
import {Token} from "./infrastructure/db/entities/PostgresEntities/TokenModel";
import {WishlistBook} from "./infrastructure/db/entities/PostgresEntities/WishListBooksModel";
import {Wishlist} from "./infrastructure/db/entities/PostgresEntities/WishListModel";

const config: PostgresConnectionOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: false,
    logging: false,
    entities: [
        User, Book, Publisher, Type, Token, WishlistBook, Wishlist
    ]
}

export default config;