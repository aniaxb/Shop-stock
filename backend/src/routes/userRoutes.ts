import {UserController} from "../controller/userController";

export const UserRoutes = [{
    method: "get",
    route: "/user",
    controller: UserController,
    action: "getAllUsers"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "getUser"
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "addUser"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "removeUser"
}]