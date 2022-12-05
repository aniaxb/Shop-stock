import {getDataSource} from "../utils/data-source";

export abstract class Controller {
    protected repository;

    public init = async (type) => {
        this.repository = (await getDataSource()).getRepository(type);
    };
}