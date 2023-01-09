import { NextFunction, Request, Response } from "express"
import {ProductService} from "../service/productService";

export class ProductController {

    private productService: ProductService = new ProductService();

    async getAllProducts(request: Request, response: Response, next: NextFunction) {
        this.productService.getAllProducts().then(result => {
            return response.status(200).json(result);
        }).catch(e => {
            return response.status(422).json({'message': e.message});
        })
    }

    async getProduct(request: Request, response: Response, next: NextFunction) {
        this.productService.getProduct(request.params.id).then(result => {
            return response.status(200).json(result);
        }).catch(e => {
            return response.status(422).json({'message': e.message});
        })
    }

    async addProduct(request: Request, response: Response, next: NextFunction) {
        this.productService.addProduct(request.body).then(result => {
            return response.status(200).json(result);
        }).catch(e => {
            return response.status(422).json({'message': e.message});
        })
    }

    async editProduct(request: Request, response: Response, next: NextFunction) {
        this.productService.editProduct(request.params.id, request.body).then(result => {
            return response.status(200).json(result);
        }).catch(e => {
            return response.status(422).json({'message': e.message});
        })
    }

    async addCategoryToProduct(request: Request, response: Response, next: NextFunction) {
        this.productService.addCategoryToProduct(request.params.id, request.body).then(result => {
            return response.status(200).json(result);
        }).catch(e => {
            return response.status(422).json({'message': e.message});
        })
    }

    async removeCategoryFromProduct(request: Request, response: Response, next: NextFunction) {
        this.productService.removeCategoryFromProduct(request.params.id, request.body).then(result => {
            return response.status(200).json(result);
        }).catch(e => {
            return response.status(422).json({'message': e.message});
        })
    }

    async removeProduct(request: Request, response: Response, next: NextFunction) {
        this.productService.removeProduct(request.params.id).then(result => {
            return response.status(200).json(result);
        }).catch(e => {
            return response.status(422).json({'message': e.message});
        })
    }

}