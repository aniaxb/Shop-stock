import {Entity, PrimaryGeneratedColumn, Column} from "typeorm"
import {MinLength} from "class-validator";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    private id: number

    @MinLength(5, {
        message: 'email is too short',
    })
    @Column()
    email: string

    @MinLength(5, {
        message: 'password is too short',
    })
    @Column()
    password: string
    
}
