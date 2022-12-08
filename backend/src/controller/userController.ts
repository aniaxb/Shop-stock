import { NextFunction, Request, Response } from "express"
import {User} from "../model/user";
import {Controller} from "./controller";
import {validate} from "class-validator";
import {Category} from "../model/category";

export class UserController extends Controller {

    constructor() {
        super(User);
    }

    async getAllUsers(request: Request, response: Response, next: NextFunction) {
        this.repository.find().then(y => {
            response.status(200).json(y);
        })
    }

    async getUser(request: Request, response: Response, next: NextFunction) {
        this.repository.findOneBy({ id: request.params.id }).then(y => {
            response.status(200).json(y);
        })
    }

    async addUser(request: Request, response: Response, next: NextFunction) {
        validate(Object.assign(new Category() , request.body)).then(async error => {
            if (error.length > 0) {
                throw new Error(JSON.stringify(error.pop().constraints))
            } else {
                await this.repository.save(request.body).then(y => {
                    response.status(200).json(y);
                })
            }
        }).catch(e => {
            return response.status(422).json({'message': e.message});
        })
    }

    async removeUser(request: Request, response: Response, next: NextFunction) {
        this.repository.findOneBy({ id: request.params.id }).then(async y => {
            await this.repository.remove(y)
            response.status(200).json(y);
        })
    }

}