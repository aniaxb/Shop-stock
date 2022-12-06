import {OrderController} from "../controller/orderController";

export const OrderRoutes = [{
    method: "get",
    route: "/orders",
    controller: OrderController,
    action: "getAllProducts"
}, {
    method: "post",
    route: "/orders",
    controller: OrderController,
    action: "getProduct"
}, {
    method: "put",
    route: "/orders/:id",
    controller: OrderController,
    action: "addProduct"
}, {
    method: "get",
    route: "/orders/status/:id",
    controller: OrderController,
    action: "editProduct"
}, {
    method: "delete",
    route: "/orders/:id",
    controller: OrderController,
    action: "removeProduct"
}, {
    method: "get",
    route: "/status",
    controller: OrderController,
    action: "removeProduct"
}]