import {AppDataSource} from "../utils/dataSource";

export abstract class Controller {
    protected repository;

    protected constructor(type) {
        this.repository = AppDataSource.getRepository(type)
    }
}