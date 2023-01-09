import { NextFunction, Request, Response } from "express"
import {StatusService} from "../service/statusService";

export class StatusController {

    private statusService: StatusService = new StatusService();

    async getAllStatuses(request: Request, response: Response, next: NextFunction) {
        this.statusService.getAllStatuses().then(result => {
            return response.status(200).json(result);
        }).catch(e => {
            return response.status(422).json({'message': e.message});
        })
    }

}