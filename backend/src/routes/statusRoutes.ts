import {StatusController} from "../controller/statusController";

export const StatusRoutes = [{
    method: "get",
    route: "/status",
    controller: StatusController,
    action: "getAllStatuses"
}]