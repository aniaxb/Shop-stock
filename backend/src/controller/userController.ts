import { NextFunction, Request, Response } from "express"
import {UserService} from "../service/userService";

export class UserController {

    private userService: UserService = new UserService();

    async getAllUsers(request: Request, response: Response, next: NextFunction) {
        this.userService.getAllUsers().then(result => {
            return response.status(200).json(result);
        }).catch(e => {
            return response.status(422).json({'message': e.message});
        })
    }

    async getUser(request: Request, response: Response, next: NextFunction) {
        this.userService.getUser(request.params.id).then(result => {
            return response.status(200).json(result);
        }).catch(e => {
            return response.status(422).json({'message': e.message});
        })
    }

    async addUser(request: Request, response: Response, next: NextFunction) {
        this.userService.addUser(request.body).then(result => {
            return response.status(200).json(result);
        }).catch(e => {
            return response.status(422).json({'message': e.message});
        })
    }

    async removeUser(request: Request, response: Response, next: NextFunction) {
        this.userService.removeUser(request.params.id).then(result => {
            return response.status(200).json(result);
        }).catch(e => {
            return response.status(422).json({'message': e.message});
        })
    }

}