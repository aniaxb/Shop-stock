import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from "typeorm"
import {Product} from "./Product";

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: Status;

    @ManyToMany((type) => Product, {
        cascade: true,
    })
    @JoinTable({
        name: "order_product",
        joinColumn: { name: "orderId", referencedColumnName: "id" },
        inverseJoinColumn: { name: "productId" }
    })
    products: Product[];

    constructor(status: Status) {
        this.status = status;
    }

    addProduct(product: Product): void {
        this.products.push(product)
    }

    removeProduct(product: Product): void {
        this.products.forEach( (item, index) => {
            if(item === product) this.products.splice(index,1);
        });
    }
}
