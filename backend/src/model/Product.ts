import {Entity, PrimaryGeneratedColumn, Column, ManyToMany} from "typeorm"
import {Category} from "./category";
import {JoinTable} from 'typeorm';
import {Order} from "./order";

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    imgUrl: string;

    @Column({ type: "numeric" })
    price: number;

    @Column()
    date: string;

    @Column({ type: "numeric" })
    weight: number;

    @ManyToMany((type) => Category, {
        cascade: true,
    })
    @JoinTable({
        name: "product_category",
        joinColumn: { name: "productId", referencedColumnName: "id" },
        inverseJoinColumn: { name: "categoryId" }
    })
    categories: Category[];

    @ManyToMany((type) => Order, (order) => order.products)
    orders: Order[];

    constructor(name: string, imgUrl: string, price: number, date: string, weight: number) {
        this.name = name;
        this.imgUrl = imgUrl;
        this.price = price;
        this.date = date;
        this.weight = weight;
    }

    addCategory(category: Category): void {
        this.categories.push(category);
    }

    removeCategory(category: Category): void {
        this.categories.forEach( (item, index) => {
            if(item === category) this.categories.splice(index,1);
        });
    }
}
