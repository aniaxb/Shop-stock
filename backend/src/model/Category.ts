import {Entity, PrimaryGeneratedColumn, Column, ManyToMany} from "typeorm"
import {MinLength} from "class-validator";

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    private id: number;

    @MinLength(3, {
        message: 'name is too short',
    })
    @Column()
    name: string;

}
