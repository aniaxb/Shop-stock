import {Entity, PrimaryGeneratedColumn, Column, ManyToMany} from "typeorm"
import {Category} from "./category";
import {JoinTable} from 'typeorm';

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    private id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    imgUrl: string;

    @Column({ type: "numeric" })
    price: number;

    @Column({ type: "numeric" })
    weight: number;

    @ManyToMany(() => Category, {
        cascade: true,
    })
    @JoinTable()
    categories: Category[];

    constructor(name: string, imgUrl: string, price: number, description: string, weight: number) {
        this.name = name;
        this.imgUrl = imgUrl;
        this.price = price;
        this.description = description;
        this.weight = weight;
    }

    public addCategory(category: Category): void {
        this.categories.push(category);
    }

    public removeCategory(category: Category): void {
        this.categories.forEach( (item, index) => {
            if(item === category) this.categories.splice(index,1);
        });
    }
}
