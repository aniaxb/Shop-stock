import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Status {

    @PrimaryGeneratedColumn()
    private id: number;

    @Column()
    name: string;

}