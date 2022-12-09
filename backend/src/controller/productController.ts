import { NextFunction, Request, Response } from "express"
import {Product} from "../model/product";
import {Controller} from "./controller";
import {validate} from "class-validator";

export class ProductController extends Controller {

    constructor() {
        super(Product);
    }

    async getAllProducts(request: Request, response: Response, next: NextFunction) {
        this.repository.find({
            relations: ['categories']
        }).then(result => {
            return response.status(200).json(result);
        })
    }

    async getProduct(request: Request, response: Response, next: NextFunction) {
        this.repository.find({
            relations: ['categories'],
            where: {
                id: request.params.id,
            },
            take: 1
        }).then(result => {
            return response.status(200).json(result.pop());
        })
    }

    async addProduct(request: Request, response: Response, next: NextFunction) {
        validate(Object.assign(new Product() , request.body)).then(async error => {
            if (error.length > 0) {
                throw new Error(JSON.stringify(error.pop().constraints))
            } else {
                await this.repository.save(request.body).then(product => {
                    return response.status(200).json(product);
                })
            }
        }).catch(e => {
            return response.status(422).json({'message': e.message});
        })
    }

    async editProduct(request: Request, response: Response, next: NextFunction) {
        this.repository.find({
            relations: ['categories'],
            where: {
                id: request.params.id,
            },
            take: 1
        }).then(async result => {
            const merge = {...result.pop(), ...request.body};
            validate(Object.assign(new Product() , merge)).then(async error => {
                if (error.length > 0) {
                    throw new Error(JSON.stringify(error.pop().constraints))
                } else {
                    await this.repository.save(merge).then(() => {
                        return response.status(200).json(merge);
                    })
                }
            }).catch(e => {
                return response.status(422).json({'message': e.message});
            })
        })
    }

    async addCategoryToProduct(request: Request, response: Response, next: NextFunction) {
        this.repository.find({
            relations: ['categories'],
            where: {
                id: request.params.id,
            },
            take: 1
        }).then(async result => {
            const merge = result.pop();
            merge.addCategory(request.body);
            await this.repository.save(merge)
            return response.status(200).json(merge);
        })
    }

    async removeCategoryFromProduct(request: Request, response: Response, next: NextFunction) {
        this.repository.find({
            relations: ['categories'],
            where: {
                id: request.params.id,
            },
            take: 1
        }).then(async result => {
            const merge = result.pop();
            merge.removeCategory(request.body);
            validate(Object.assign(new Product() , merge)).then(async error => {
                if (error.length > 0) {
                    throw new Error(JSON.stringify(error.pop().constraints))
                } else {
                    await this.repository.save(merge).then(() => {
                        return response.status(200).json(merge)
                    })
                }
            }).catch(e => {
                return response.status(422).json({'message': e.message});
            })
        })
    }

    async removeProduct(request: Request, response: Response, next: NextFunction) {
        this.repository.findOneBy({ id: request.params.id }).then(async y => {
            await this.repository.remove(y)
            return response.status(200).json(y);
        })
    }

}