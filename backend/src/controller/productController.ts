import { NextFunction, Request, Response } from "express"
import {getDataSource} from "../utils/data-source";
import {Product} from "../model/product";

export class ProductController {
    private productRepository;

    public init = async () => {
        this.productRepository = (await getDataSource()).getRepository(Product);
    };

    async getAllProducts(request: Request, response: Response, next: NextFunction) {
        this.init().then(() => {
            this.productRepository.find().then(y => {
                response.status(201).json(y);
            })
        });
    }

    async getProduct(request: Request, response: Response, next: NextFunction) {
        this.init().then(() => {
            this.productRepository.findOneBy({ id: request.params.id }).then(y => {
                response.status(200).json(y);
            })
        });
    }

    async addProduct(request: Request, response: Response, next: NextFunction) {
        this.init().then(() => {
            this.productRepository.save(request.body).then(y => {
                response.status(200).json(y);
            })
        });
    }

    async removeUser(request: Request, response: Response, next: NextFunction) {
        this.init().then(() => {
            this.productRepository.findOneBy({ id: request.params.id }).then(async y => {
                await this.productRepository.remove(y)
                response.status(200).json(y);
            })
        });
        // let userToRemove = await this.userRepository.findOneBy({ id: request.params.id })
        // await this.userRepository.remove(userToRemove)
    }

}