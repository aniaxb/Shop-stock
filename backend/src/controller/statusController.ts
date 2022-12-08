import { NextFunction, Request, Response } from "express"
import {Category} from "../model/category";
import {Controller} from "./controller";
import {Status} from "../model/status";

export class StatusController extends Controller {

    constructor() {
        super(Status);
    }

    async getAllStatuses(request: Request, response: Response, next: NextFunction) {
        this.repository.find().then(y => {
            response.status(201).json(y);
        })
    }

}