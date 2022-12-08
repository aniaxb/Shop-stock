import {Entity, PrimaryGeneratedColumn, Column} from "typeorm"

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    private id: number;

    @Column()
    name: string;

}
