import { NextFunction, Request, Response } from "express"
import {Controller} from "./controller";
import {Order} from "../model/order";

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
            response.status(201).json(result);
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
            response.status(201).json(result);
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
        this.repository.save(request.body).then(y => {
            response.status(200).json(y);
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