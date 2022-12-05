import { NextFunction, Request, Response } from "express"
import {getDataSource} from "../utils/data-source";
import {User} from "../model/user";

export class UserController {
    private userRepository;

    public init = async () => {
        this.userRepository = (await getDataSource()).getRepository(User);
    };

    async getAllUsers(request: Request, response: Response, next: NextFunction) {
        this.init().then(() => {
            this.userRepository.find().then(y => {
                response.status(201).json(y);
            })
        });
    }

    async getUser(request: Request, response: Response, next: NextFunction) {
        this.init().then(() => {
            this.userRepository.findOneBy({ id: request.params.id }).then(y => {
                response.status(200).json(y);
            })
        });
    }

    async addUser(request: Request, response: Response, next: NextFunction) {
        this.init().then(() => {
            this.userRepository.save(request.body).then(y => {
                response.status(200).json(y);
            })
        });
    }

    async removeUser(request: Request, response: Response, next: NextFunction) {
        this.init().then(() => {
            this.userRepository.findOneBy({ id: request.params.id }).then(async y => {
                await this.userRepository.remove(y)
                response.status(200).json(y);
            })
        });
        // let userToRemove = await this.userRepository.findOneBy({ id: request.params.id })
        // await this.userRepository.remove(userToRemove)
    }

}