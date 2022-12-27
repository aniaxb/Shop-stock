import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinTable} from "typeorm"
import {Status} from "./status";
import {ArrayMinSize, Matches, Min, MinLength} from "class-validator";
import {ProductQuantity} from "./productQuantity";
import {ColumnNumericTransformer} from "../utils/ColumnNumericTransformer";

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: true
    })
    date: string;

    @MinLength(3, {
        message: 'userName is too short',
    })
    @Column()
    userName: string;

    @MinLength(3, {
        message: 'email is too short',
    })
    @Column()
    email: string;

    @Matches(/^[0-9]+$/, {
        message: 'phone number is not correct',
    })
    @MinLength(9, {
        message: 'phone number is too short',
    })
    @Column()
    phoneNumber: string;

    @Min(0, {
        message: 'total price cannot be less than 0',
    })
    @Column('numeric', {
        precision: 7,
        scale: 2,
        transformer: new ColumnNumericTransformer(),
    })
    totalPrice: number;

    @ManyToOne(() => Status)
    status: Status;

    @ArrayMinSize(1, {
        message: 'order must have at least one product',
    })
    @OneToMany(() => ProductQuantity, productQuantity => productQuantity.order, {
        cascade: true
    })
    productQuantities!: ProductQuantity[];
}
