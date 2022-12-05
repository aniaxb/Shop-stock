import { NextFunction, Request, Response } from "express"
import {getDataSource} from "../utils/data-source";
import {User} from "../model/user"

export class AuthController {
    private userRepository;

    public init = async () => {
        this.userRepository = (await getDataSource()).getRepository(User);
    };

    async login(request: Request, response: Response, next: NextFunction) {
        this.init().then(() => {
            this.userRepository.find().then(y => {
                response.status(201).json(y);
            })
        });
    }

    async register(request: Request, response: Response, next: NextFunction) {
        this.init().then(() => {
            this.userRepository.save(request.body).then(y => {
                response.status(200).json(y);
            })
        });
    }

}