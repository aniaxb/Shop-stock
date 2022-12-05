import { getRepository } from "typeorm"
import { NextFunction, Request, Response } from "express"
import { User } from "../model/user"
import {getDataSource} from "../utils/data-source";
import {Product} from "../model/product";

export class UserController {
    private userRepositoryy;

    public init = async () => {
        this.userRepositoryy = (await getDataSource()).getRepository(Product);
    };


    async all(request: Request, response: Response, next: NextFunction) {
        this.init().then(() => {
            this.userRepositoryy.find().then(y => {
                response.status(201).json(y);
            })
        })
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.userRepositoryy.findOne(request.params.id)
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.userRepositoryy.save(request.body)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.userRepositoryy.findOneBy({ id: request.params.id })
        await this.userRepositoryy.remove(userToRemove)
    }

}