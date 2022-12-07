import { NextFunction, Request, Response } from "express"
import {Controller} from "./controller";
import {Order} from "../model/order";
import {Status} from "../model/status";

export class OrderController extends Controller {

    async getAllOrders(request: Request, response: Response, next: NextFunction) {
        this.init(Order).then(() => {
            this.repository.find({
                relations: {
                    products: true,
                    status: true
                }
            }).then(y => {
                response.status(201).json(y);
            })
        });
    }

    async getAllOrdersByStatus(request: Request, response: Response, next: NextFunction) {
        this.init(Order).then(() => {
            this.repository.find({
                relations: {
                    products: true,
                    status: true
                }
            }).then(y => {
                response.status(201).json(y);
            })
        });
    }

    async getOrder(request: Request, response: Response, next: NextFunction) {
        this.init(Order).then(() => {
            this.repository.findOneBy({
                id: request.params.id,
                relations: {
                    products: true,
                    status: true
                }
            }).then(y => {
                response.status(200).json(y);
            })
        });
    }

    async addOrder(request: Request, response: Response, next: NextFunction) {
        this.init(Order).then(() => {
            this.repository.save(request.body).then(y => {
                response.status(200).json(y);
            })
        });
    }

    async editOrder(request: Request, response: Response, next: NextFunction) {
        this.init(Order).then(() => { //TODO: by ID!
            this.repository.save(request.body).then(y => { //TODO: change only order state!
                response.status(200).json(y);
            })
        });
    }

    async addProductToOrder(request: Request, response: Response, next: NextFunction) {
        this.init(Order).then(() => { //TODO: by ID!
            this.repository.save(request.body).then(y => {
                response.status(200).json(y);
            })
        });
    }

    async removeProductFromOrder(request: Request, response: Response, next: NextFunction) {
        this.init(Order).then(() => { //TODO: by ID!
            this.repository.save(request.body).then(y => {
                response.status(200).json(y);
            })
        });
    }

    async removeOrder(request: Request, response: Response, next: NextFunction) {
        this.init(Order).then(() => {
            this.repository.findOneBy({ id: request.params.id }).then(async y => {
                await this.repository.remove(y)
                response.status(200).json(y);
            })
        });
    }

    async getAllStatuses(request: Request, response: Response, next: NextFunction) {
        response.status(201).json(Object.values(Status));
    }
}