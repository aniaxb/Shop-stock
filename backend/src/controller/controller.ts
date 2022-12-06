import {getDataSource} from "../utils/dataSource";

export abstract class Controller {
    protected repository;

    public init = async (type) => {
        this.repository = (await getDataSource()).getRepository(type);
    };
}