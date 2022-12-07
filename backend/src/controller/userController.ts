import { NextFunction, Request, Response } from "express"
import {User} from "../model/user";
import {Controller} from "./controller";

export class UserController extends Controller {

    async getAllUsers(request: Request, response: Response, next: NextFunction) {
        this.init(User).then(() => {
            this.repository.find().then(y => {
                response.status(201).json(y);
            })
        });
    }

    async getUser(request: Request, response: Response, next: NextFunction) {
        this.init(User).then(() => {
            this.repository.findOneBy({ id: request.params.id }).then(y => {
                response.status(200).json(y);
            })
        });
    }

    async addUser(request: Request, response: Response, next: NextFunction) {
        this.init(User).then(() => {
            this.repository.save(request.body).then(y => {
                response.status(200).json(y);
            })
        });
    }

    async removeUser(request: Request, response: Response, next: NextFunction) {
        this.init(User).then(() => {
            this.repository.findOneBy({ id: request.params.id }).then(async y => {
                await this.repository.remove(y)
                response.status(200).json(y);
            })
        });
    }

}