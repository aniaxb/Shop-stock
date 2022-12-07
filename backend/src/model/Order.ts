import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, ManyToOne} from "typeorm"
import {Product} from "./product";
import {Status} from "./status";
import {Category} from "./category";

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: string;

    @Column()
    userName: string;

    @Column()
    phoneNumber: string;

    @ManyToOne(() => Status)
    status: Status;

    @ManyToMany(() => Product, {
        cascade: true,
    })
    @JoinTable()
    products: Product[];

    constructor(status: Status, userName: string, phoneNumber: string) {
        this.status = status;
        this.userName = userName;
        this.phoneNumber = phoneNumber;
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
