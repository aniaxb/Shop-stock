import {Entity, PrimaryGeneratedColumn, Column, ManyToMany} from "typeorm"
import {Category} from "./Category";

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    imgUrl: string;

    @Column()
    price: number;

    @Column()
    role: string;

}
