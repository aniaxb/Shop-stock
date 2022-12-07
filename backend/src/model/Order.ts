import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from "typeorm"
import {Product} from "./product";
import {Status} from "./status";
import {Category} from "./category";

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: Status;

    @ManyToMany(() => Product, {
        cascade: true,
    })
    @JoinTable()
    products: Product[];

    constructor(status: Status) {
        this.status = status;
    }

    public addProduct(product: Product): void {
        this.products.push(product)
    }

    public removeProduct(product: Product): void {
        this.products.forEach( (item, index) => {
            if(item === product) this.products.splice(index,1);
        });
    }
}
