import { NextFunction, Request, Response } from "express"
import {CategoryService} from "../service/categoryService";

export class CategoryController {

    private categoryService: CategoryService = new CategoryService();

    async getAllCategories(request: Request, response: Response, next: NextFunction) {
        this.categoryService.getAllCategories().then(result => {
            return response.status(200).json(result);
        }).catch(e => {
            return response.status(422).json({'message': e.message});
        })
    }

    async getCategory(request: Request, response: Response, next: NextFunction) {
        this.categoryService.getCategory(request.params.id).then(result => {
            return response.status(200).json(result);
        }).catch(e => {
            return response.status(422).json({'message': e.message});
        })
    }

    async addCategory(request: Request, response: Response, next: NextFunction) {
        this.categoryService.addCategory(request.body).then(result => {
            return response.status(200).json(result);
        }).catch(e => {
            return response.status(422).json({'message': e.message});
        })
    }

    async editCategory(request: Request, response: Response, next: NextFunction) {
        this.categoryService.editCategory(request.params.id, request.body).then(result => {
            return response.status(200).json(result);
        }).catch(e => {
            return response.status(422).json({'message': e.message});
        })
    }

    async removeCategory(request: Request, response: Response, next: NextFunction) {
        this.categoryService.removeCategory(request.params.id).then(result => {
            return response.status(200).json(result);
        }).catch(e => {
            return response.status(422).json({'message': e.message});
        })
    }
    
}