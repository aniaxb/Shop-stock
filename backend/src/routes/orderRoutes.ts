import {OrderController} from "../controller/orderController";

export const OrderRoutes = [{
    method: "get",
    route: "/orders",
    controller: OrderController,
    action: "getAllOrders"
}, {
    method: "get",
    route: "/orders/:id",
    controller: OrderController,
    action: "getOrder"
}, {
    method: "post",
    route: "/orders",
    controller: OrderController,
    action: "addOrder"
}, {
    method: "put",
    route: "/orders/:id",
    controller: OrderController,
    action: "editOrder"
}, {
    method: "put",
    route: "/ordersAddProduct/:id",
    controller: OrderController,
    action: "addProductToOrder"
}, {
    method: "delete",
    route: "/ordersRemoveProduct/:id",
    controller: OrderController,
    action: "removeProductFromOrder"
}, {
    method: "get",
    route: "/orders/status/:id",
    controller: OrderController,
    action: "getAllOrdersByStatus"
}, {
    method: "delete",
    route: "/orders/:id",
    controller: OrderController,
    action: "removeOrder"
}]