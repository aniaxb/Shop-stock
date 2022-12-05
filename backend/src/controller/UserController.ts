import { NextFunction, Request, Response } from "express"
import { User } from "../model/user"
import {getDataSource} from "../utils/data-source";
import {Product} from "../model/product";

export class UserController {
    private userRepository;

    public init = async () => {
        this.userRepository = (await getDataSource()).getRepository(Product);
    };


    async all(request: Request, response: Response, next: NextFunction) {
        this.init().then(() => {
            this.userRepository.find().then(y => {
                response.status(201).json(y);
            })
        })
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.findOne(request.params.id)
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.save(request.body)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.userRepository.findOneBy({ id: request.params.id })
        await this.userRepository.remove(userToRemove)
    }

}