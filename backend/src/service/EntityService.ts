import {AppDataSource} from "../utils/dataSource";

export abstract class EntityService {
    protected repository;

    protected constructor(type) {
        this.repository = AppDataSource.getRepository(type)
    }
}