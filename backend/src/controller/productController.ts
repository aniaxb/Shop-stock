import { NextFunction, Request, Response } from "express"
import {Product} from "../model/product";
import {Controller} from "./controller";

export class ProductController extends Controller {

    async getAllProducts(request: Request, response: Response, next: NextFunction) {
        this.init(Product).then(() => {
            this.repository.find().then(y => {
                response.status(201).json(y);
            })
        });
    }

    async getProduct(request: Request, response: Response, next: NextFunction) {
        this.init(Product).then(() => {
            this.repository.findOneBy({ id: request.params.id }).then(y => {
                response.status(200).json(y);
            })
        });
    }

    async addProduct(request: Request, response: Response, next: NextFunction) {
        this.init(Product).then(() => {
            this.repository.save(request.body).then(y => {
                response.status(200).json(y);
            })
        });
    }

    async removeUser(request: Request, response: Response, next: NextFunction) {
        this.init(Product).then(() => {
            this.repository.findOneBy({ id: request.params.id }).then(async y => {
                await this.repository.remove(y)
                response.status(200).json(y);
            })
        });
        // let userToRemove = await this.userRepository.findOneBy({ id: request.params.id })
        // await this.userRepository.remove(userToRemove)
    }

}