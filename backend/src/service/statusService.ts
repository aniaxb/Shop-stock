import {EntityService} from "./entityService";
import {Status} from "../model/status";

export class StatusService extends EntityService {

    constructor() {
        super(Status);
    }

    public getAllStatuses(): Promise<Status[]> {
        return this.repository.find();
    }

    public getStatusByName(name: string): Promise<Status> {
        return this.repository.findOneBy({
            name: name
        });
    }
}