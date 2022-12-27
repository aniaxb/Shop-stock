import { NextFunction, Request, Response } from "express"
import {Controller} from "./controller";
import {Order} from "../model/order";
import {validate} from "class-validator";
import {AppDataSource} from "../utils/dataSource";
import {Status} from "../model/status";
import {Product} from "../model/product";

export class OrderController extends Controller {

    constructor() {
        super(Order);
    }

    async getAllOrders(request: Request, response: Response, next: NextFunction) {
        this.repository.find({
            relations: {
                productQuantities: {
                    product: true
                },
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
                productQuantities: true,
                status: true
            },
            where: {
                status: {
                    name: request.body.name
                }
            }
        }).then(result => {
            response.status(200).json(result);
        }).catch(e => {
            return response.status(422).json({'message': e.message});
        })
    }

    async getOrder(request: Request, response: Response, next: NextFunction) {
        this.repository.find({
            relations: {
                productQuantities: true,
                status: true
            },
            where: {
                id: request.body.id
            }
        }).then(result => {
            response.status(200).json(result.pop());
        }).catch(e => {
            return response.status(422).json({'message': e.message});
        })
    }

    async addOrder(request: Request, response: Response, next: NextFunction) {
        validate(Object.assign(new Order() , request.body)).then(async error => {
            if (error.length > 0) {
                throw new Error(JSON.stringify(error.pop().constraints))
            } else {
                await this.repository.save(request.body).then(y => {
                    response.status(200).json(y);
                })
            }
        }).catch(e => {
            console.log(e)
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
            if (order.status.name.match("Done") || order.status.name.match("NotApproved")) {
                throw new Error('You cannot change the status of a completed order');
            } else {
                AppDataSource.getRepository(Status).findOneBy({
                    name: request.body.name
                }).then(status => {
                    if(!status) {
                        throw new Error('The specified state does not exist')
                    }
                    order.status = status;
                    this.repository.save(order).then(order => {
                        return response.status(200).json(order);
                    });
                }).catch(e => {
                    return response.status(422).json({'message': e.message});
                })
            }
        }).catch(e => {
            return response.status(422).json({'message': e.message});
        })
    }

    async addProductToOrder(request: Request, response: Response, next: NextFunction) {
        this.repository.find({
            relations: ['productQuantities'],
            where: {
                id: request.params.id,
            },
            take: 1
        }).then(async result => {
            const order = result.pop();
            AppDataSource.getRepository(Product).findOneBy({
                name: request.body.name
            }).then(res => {
                if (!res) {
                    throw new Error('The product with the given name does not exist')
                }
                order.addProduct(res);
                this.repository.save(order).then(() => {
                    return response.status(200).json(order);
                })
            }).catch(e => {
                return response.status(422).json({'message': e.message});
            })
        }).catch(e => {
            return response.status(422).json({'message': e.message});
        })
    }

    async removeProductFromOrder(request: Request, response: Response, next: NextFunction) {
        this.repository.find({
            relations: ['productQuantities'],
            where: {
                id: request.params.id,
            },
            take: 1
        }).then(async result => {
            const order = result.pop();
            AppDataSource.getRepository(Product).findOneBy({
                name: request.body.name
            }).then(res => {
                if (!res) {
                    throw new Error('The product with the given name does not exist')
                }
                order.removeProduct(res);
                this.repository.save(order).then(() => {
                    return response.status(200).json(order);
                })
            }).catch(e => {
                return response.status(422).json({'message': e.message});
            })
        }).catch(e => {
            return response.status(422).json({'message': e.message});
        })
    }

    async removeOrder(request: Request, response: Response, next: NextFunction) {
        this.repository.findOneBy({ id: request.params.id }).then(async y => {
            await this.repository.remove(y).then(() => {
                return response.status(200).json(y);
            }).catch(e => {
                return response.status(422).json({'message': e.message});
            })
        }).catch(e => {
            return response.status(422).json({'message': e.message});
        })
    }

}