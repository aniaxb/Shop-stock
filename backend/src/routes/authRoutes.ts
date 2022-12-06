import {AuthController} from "../controller/authController";

export const AuthRoutes = [{
    method: "post",
    route: "/login",
    controller: AuthController,
    action: "login"
}, {
    method: "post",
    route: "/register",
    controller: AuthController,
    action: "register"
}]