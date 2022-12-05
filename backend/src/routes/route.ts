import {UserController} from "../controller/userController";
import {ProductController} from "../controller/productController";
import {AuthController} from "../controller/authController";

export const Routes = [{
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
}, {
    method: "post",
    route: "/login",
    controller: AuthController,
    action: "login"
}, {
    method: "post",
    route: "/register",
    controller: AuthController,
    action: "register"
}, {
    method: "get",
    route: "/products",
    controller: ProductController,
    action: "getAllProducts"
}
]