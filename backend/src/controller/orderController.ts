import { NextFunction, Request, Response } from "express"
import {Category} from "../model/category";
import {Controller} from "./controller";
import {Product} from "../model/product";

export class OrderController extends Controller {

    async getAllOrders(request: Request, response: Response, next: NextFunction) {
        this.init(Product).then(() => {
            this.repository.find().then(y => {
                response.status(201).json(y);
            })
        });
    }

    async getAllOrdersByStatus(request: Request, response: Response, next: NextFunction) {
        this.init(Product).then(() => {
            this.repository.find().then(y => {
                response.status(201).json(y);
            })
        });
    }

    async getOrder(request: Request, response: Response, next: NextFunction) {
        this.init(Product).then(() => {
            this.repository.findOneBy({ id: request.params.id }).then(y => {
                response.status(200).json(y);
            })
        });
    }

    async addOrder(request: Request, response: Response, next: NextFunction) {
        this.init(Product).then(() => {
            this.repository.save(request.body).then(y => {
                response.status(200).json(y);
            })
        });
    }

    async editOrder(request: Request, response: Response, next: NextFunction) {
        this.init(Product).then(() => {
            this.repository.save(request.body).then(y => {
                response.status(200).json(y);
            })
        });
    }

    async removeOrder(request: Request, response: Response, next: NextFunction) {
        this.init(Product).then(() => {
            this.repository.findOneBy({ id: request.params.id }).then(async y => {
                await this.repository.remove(y)
                response.status(200).json(y);
            })
        });
        // let userToRemove = await this.userRepository.findOneBy({ id: request.params.id })
        // await this.userRepository.remove(userToRemove)
    }

    async getAllStatuses(request: Request, response: Response, next: NextFunction) {
        this.init(Product).then(() => {
            this.repository.find().then(y => {
                response.status(201).json(y);
            })
        });
    }
}