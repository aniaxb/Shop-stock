import {Entity, PrimaryGeneratedColumn, Column} from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    private id: number

    @Column()
    userName: string

    @Column()
    password: string

    constructor(userName: string, password: string) {
        this.userName = userName;
        this.password = password;
    }
    
}
