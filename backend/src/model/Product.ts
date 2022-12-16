import {Entity, PrimaryGeneratedColumn, Column, ManyToMany} from "typeorm"
import {Category} from "./category";
import {JoinTable} from 'typeorm';
import {ArrayMinSize, Min, MinLength} from "class-validator";

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
    @Column({ type: "numeric" })
    price: number;

    @Min(0, {
        message: 'weight cannot be less than 0',
    })
    @Column({ type: "numeric" })
    weight: number;

    @ArrayMinSize(1, {
        message: 'product must have at least one category',
    })
    @ManyToMany(() => Category, {
        cascade: true,
    })
    @JoinTable()
    categories: Category[];

    public addCategory(category: Category): void {
        this.categories.push(category);
    }

    public removeCategory(category: Category): void {
        this.categories.forEach( (item, index) => {
            if(item === category) this.categories.splice(index,1);
        });
    }
}
