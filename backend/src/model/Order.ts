import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, ManyToOne} from "typeorm"
import {Product} from "./product";
import {Status} from "./status";
import {ArrayMinSize, Matches, MinLength} from "class-validator";

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

    @Matches(/^[0-9]+$/, {
        message: 'phone number is not correct',
    })
    @MinLength(9, {
        message: 'phone number is too short',
    })
    @Column()
    phoneNumber: string;

    @ManyToOne(() => Status)
    status: Status;

    @ArrayMinSize(1, {
        message: 'order must have at least one product',
    })
    @ManyToMany(() => Product, {
        cascade: true,
    })
    @JoinTable()
    products: Product[];

    public addProduct(product: Product): void {
        this.products.push(product)
    }

    public removeProduct(product: Product): void {
        this.products.forEach( (item, index) => {
            if(item === product) this.products.splice(index,1);
        });
    }
}
