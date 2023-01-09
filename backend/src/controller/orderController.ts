import { NextFunction, Request, Response } from "express"
import {OrderService} from "../service/orderService";

export class OrderController {

    private orderService: OrderService = new OrderService();


    async getAllOrders(request: Request, response: Response, next: NextFunction) {
        this.orderService.getAllOrders().then(result => {
            response.status(200).json(result);
        }).catch(e => {
            return response.status(422).json({'message': e.message});
        })
    }

    async getAllOrdersByStatus(request: Request, response: Response, next: NextFunction) {
        this.orderService.getAllOrdersByStatus(request.query.status).then(result => {
            response.status(200).json(result);
        }).catch(e => {
            return response.status(422).json({'message': e.message});
        })
    }

    async getOrder(request: Request, response: Response, next: NextFunction) {
        this.orderService.getOrder(request.params.id).then(result => {
            response.status(200).json(result);
        }).catch(e => {
            return response.status(422).json({'message': e.message});
        })
    }

    async addOrder(request: Request, response: Response, next: NextFunction) {
        this.orderService.addOrder(request.body).then(result => {
            return response.status(200).json(result);
        }).catch(e => {
            return response.status(422).json({'message': e.message});
        })
    }

    async editOrder(request: Request, response: Response, next: NextFunction) {
        this.orderService.editOrder(request.params.id,
            request.body.name,
            request.body.lastChangeDate).then(result => {
            return response.status(200).json(result);
        }).catch(e => {
            return response.status(422).json({'message': e.message});
        })
    }

    async editProductInOrder(request: Request, response: Response, next: NextFunction) {
        this.orderService.editProductInOrder(request.params.id, request.body).then(result => {
            return response.status(200).json(result);
        }).catch(e => {
            return response.status(422).json({'message': e.message});
        })
    }

    async removeOrder(request: Request, response: Response, next: NextFunction) {
        this.orderService.removeOrder(request.params.id).then(result => {
            return response.status(200).json(result);
        }).catch(e => {
            return response.status(422).json({'message': e.message});
        })
    }

}