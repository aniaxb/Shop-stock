import { NextFunction, Request, Response } from "express"
import {Controller} from "./controller";
import {Order} from "../model/order";
import {validate} from "class-validator";
import {Category} from "../model/category";
import {AppDataSource} from "../utils/dataSource";
import {Status} from "../model/status";

export class OrderController extends Controller {

    constructor() {
        super(Order);
    }

    async getAllOrders(request: Request, response: Response, next: NextFunction) {
        this.repository.find({
            relations: {
                products: true,
                status: true
            }
        }).then(result => {
            response.status(200).json(result);
        }).catch(e => {
            return response.status(422).json({'message': e.message});
        })
    }

    async getAllOrdersByStatus(request: Request, response: Response, next: NextFunction) {
        this.repository.find({
            relations: {
                products: true,
                status: true
            },
            where: {
                status: {
                    id: request.params.id
                }
            }
        }).then(result => {
            response.status(200).json(result);
        }).catch(e => {
            return response.status(422).json({'message': e.message});
        })
    }

    async getOrder(request: Request, response: Response, next: NextFunction) {
        this.repository.findOneBy({
            id: request.params.id,
            relations: {
                products: true,
                status: true
            }
        }).then(result => {
            response.status(200).json(result);
        }).catch(e => {
            return response.status(422).json({'message': e.message});
        })
    }

    async addOrder(request: Request, response: Response, next: NextFunction) {
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

    async editOrder(request: Request, response: Response, next: NextFunction) {
        this.repository.find({
            relations: {
                status: true
            },
            where: {
                id: request.params.id
            },
            take: 1
        }).then(async result => {
            const order = result.pop();
            console.log(order)
            if (!order.status.name.match("Done")) {
                AppDataSource.getRepository(Status).findOneBy({
                    name: request.body.status
                }).then(status => {
                    if(!status) {
                        throw new Error('The specified state does not exist')
                    }
                    order.status = status;
                    console.log(order)
                    this.repository.save(order).then(order => {
                        return response.status(200).json(order);
                    });
                })
            } else {
                throw new Error('You cannot change the status of a completed order')
            }
        }).catch(e => {
            return response.status(422).json({'message': e.message});
        })
    }

    async addProductToOrder(request: Request, response: Response, next: NextFunction) {//TODO: by ID!
        this.repository.save(request.body).then(y => {
            response.status(200).json(y);
        }).catch(e => {
            return response.status(422).json({'message': e.message});
        })
    }

    async removeProductFromOrder(request: Request, response: Response, next: NextFunction) {//TODO: by ID!
        this.repository.save(request.body).then(y => {
            response.status(200).json(y);
        })
    }

    async removeOrder(request: Request, response: Response, next: NextFunction) {
        this.repository.findOneBy({ id: request.params.id }).then(async y => {
            await this.repository.remove(y)
            response.status(200).json(y);
        }).catch(e => {
            return response.status(422).json({'message': e.message});
        })
    }

}