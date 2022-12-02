import {Entity, PrimaryGeneratedColumn, Column, ManyToMany} from "typeorm"
import {Product} from "./Product";

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToMany((type) => Product, (product) => product.categories)
    products: Product[];

    constructor(name: string) {
        this.name = name;
    }
}
