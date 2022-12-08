import { NextFunction, Request, Response } from "express"
import {Category} from "../model/category";
import {Controller} from "./controller";

export class CategoryController extends Controller {

    constructor() {
        super(Category);
    }

    async getAllCategories(request: Request, response: Response, next: NextFunction) {
        this.repository.find().then(y => {
            response.status(201).json(y);
        })
    }

    async getCategory(request: Request, response: Response, next: NextFunction) {
        this.repository.findOneBy({ id: request.params.id }).then(y => {
            response.status(200).json(y);
        })
    }

    async addCategory(request: Request, response: Response, next: NextFunction) {
        this.repository.save(request.body).then(y => {
            response.status(200).json(y);
        })
    }

    async editCategory(request: Request, response: Response, next: NextFunction) {
        this.repository.save(request.body).then(y => {
            response.status(200).json(y);
        })
    }

    async removeCategory(request: Request, response: Response, next: NextFunction) {
        this.repository.findOneBy({ id: request.params.id }).then(async y => {
            await this.repository.remove(y)
            response.status(200).json(y);
        })
    }
    
}