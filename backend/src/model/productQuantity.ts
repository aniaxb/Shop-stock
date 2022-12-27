import {Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Min} from "class-validator";
import {Product} from "./product";
import {Order} from "./order";

@Entity()
export class ProductQuantity {

    @PrimaryGeneratedColumn()
    private id!: number;

    @Min(1, {
        message: 'number cannot be less than 1',
    })
    @Column({ type: "numeric" })
    quantity: number;

    @Column()
    public productId: number;

    @Column()
    public orderId: number;

    @ManyToOne(() => Product, product => product.productQuantities)
    public product: Product;

    @ManyToOne(() => Order, order => order.productQuantities)
    public order: Order;
}