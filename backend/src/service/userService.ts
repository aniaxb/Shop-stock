import {EntityService} from "./entityService";
import {User} from "../model/user";

export class UserService extends EntityService {

    constructor() {
        super(User);
    }

    public getAllUsers(): Promise<User[]> {
        return this.repository.find();
    }

    public getUser(id: number): Promise<User> {
        return this.repository.findOneBy({id: id});
    }

    public getUserByEmail(email: string): Promise<User> {
        return this.repository.findOneBy({email: email});
    }

    public addUser(user: User): Promise<User> {
        return this.validateEntity(user).then(() => {
            return this.repository.save(user);
        })
    }

    public removeUser(id: number): Promise<User> {
        return this.getUser(id).then(result => {
            return this.repository.remove(result);
        })
    }
}