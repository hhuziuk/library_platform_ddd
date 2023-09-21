
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { MaxLength, MinLength } from 'class-validator';
import {Book} from "./BookModel";
import {Type} from "./TypeModel";


@Entity('Publisher')
export class Publisher {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ nullable: false, unique: true })
    @MinLength(1, {
        message: 'name is too short',
    })
    @MaxLength(50, {
        message: 'name is too long',
    })
    public name: string;

    @OneToMany(() => Book, book => book.publisher)
    books: Book[];

    @ManyToMany(() => Type, type => type.publishers)
    @JoinTable()
    types: Type[];
}
