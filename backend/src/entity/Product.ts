import {Entity, PrimaryGeneratedColumn, Column, ManyToMany} from "typeorm"
import {Category} from "./Category";
import {JoinTable} from 'typeorm';

@Entity()
export class Product {

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

    @ManyToMany((type) => Category, {
        cascade: true,
    })
    @JoinTable({
        name: "product_category",
        joinColumn: { name: "productId", referencedColumnName: "id" },
        inverseJoinColumn: { name: "categoryId" }
    })
    categories: Category[];

    constructor(name: string, imgUrl: string, price: number, role: string) {
        this.name = name;
        this.imgUrl = imgUrl;
        this.price = price;
        this.role = role;
    }
}
