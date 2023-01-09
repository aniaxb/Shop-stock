import {AppDataSource} from "../utils/dataSource";
import {validate} from "class-validator";

export abstract class EntityService {
    protected repository;
    protected type;

    protected constructor(type) {
        this.type = type;
        this.repository = AppDataSource.getRepository(type)
    }

    protected validateEntity(entity: Object): Promise<void> {
        return validate(Object.assign(new this.type() , entity)).then(async error => {
            if (error.length > 0) {
                throw new Error(JSON.stringify(error.pop().constraints));
            }
        })
    }
}