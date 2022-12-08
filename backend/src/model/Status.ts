import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {MinLength} from "class-validator";

@Entity()
export class Status {

    @PrimaryGeneratedColumn()
    private id: number;

    @MinLength(3, {
        message: 'name is too short',
    })
    @Column()
    name: string;

}