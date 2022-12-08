import { NextFunction, Request, Response } from "express"
import {Controller} from "./controller";
import {Order} from "../model/order";
import {validate} from "class-validator";
import {Category} from "../model/category";

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
        })
    }

    async addOrder(request: Request, response: Response, next: NextFunction) {//TODO: validate
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

    async editOrder(request: Request, response: Response, next: NextFunction) {//TODO: by ID!
        this.repository.save(request.body).then(y => { //TODO: change only order state!
            response.status(200).json(y);
        })
    }

    async addProductToOrder(request: Request, response: Response, next: NextFunction) {//TODO: by ID!
        this.repository.save(request.body).then(y => {
            response.status(200).json(y);
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
        })
    }

}