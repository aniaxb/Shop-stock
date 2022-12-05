import { NextFunction, Request, Response } from "express"
import {User} from "../model/user"
import {Controller} from "./controller";

export class AuthController extends Controller {

    async login(request: Request, response: Response, next: NextFunction) {
        this.init(User).then(() => {
            this.repository.find().then(y => {
                response.status(201).json(y);
            })
        });
    }

    async register(request: Request, response: Response, next: NextFunction) {
        this.init(User).then(() => {
            this.repository.save(request.body).then(y => {
                response.status(200).json(y);
            })
        });
    }

}