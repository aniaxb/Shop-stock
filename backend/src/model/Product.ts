import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany} from "typeorm"
import {Category} from "./category";
import {JoinTable} from 'typeorm';
import {ArrayMinSize, Min, MinLength} from "class-validator";
import {ColumnNumericTransformer} from "../utils/columnNumericTransformer";
import {ProductQuantity} from "./productQuantity";

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    private id: number;

    @MinLength(3, {
        message: 'product name is too short',
    })
    @Column()
    name: string;

    @MinLength(3, {
        message: 'description is too short',
    })
    @Column()
    description: string;

    @MinLength(3, {
        message: 'brand name is too short',
    })
    @Column()
    brand: string;

    @Column({
        length: 10000,
        nullable: true
    })
    img: string;

    @Min(0, {
        message: 'price cannot be less than 0',
    })
    @Column('numeric', {
        precision: 7,
        scale: 2,
        transformer: new ColumnNumericTransformer(),
    })
    price: number;

    @Min(0, {
        message: 'weight cannot be less than 0',
    })
    @Column('numeric', {
        precision: 7,
        scale: 2,
        transformer: new ColumnNumericTransformer(),
    })
    weight: number;

    @ArrayMinSize(1, {
        message: 'product must have at least one category',
    })
    @ManyToMany(() => Category, {
        cascade: true,
    })
    @JoinTable()
    categories: Category[];

    @OneToMany(() => ProductQuantity, productQuantity => productQuantity.product, {
        cascade: true
    })
    productQuantities!: ProductQuantity[];

    public addCategory(category: Category): void {
        this.categories.push(category);
    }

    public removeCategory(category: Category): void {
        this.categories.forEach( (item, index) => {
            if(item === category) this.categories.splice(index,1);
        });
    }
}
