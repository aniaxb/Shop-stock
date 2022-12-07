import {OrderController} from "../controller/orderController";

export const OrderRoutes = [{
    method: "get",
    route: "/orders",
    controller: OrderController,
    action: "getAllOrders"
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
    action: "addProductToOrder"//TODO: implement
}, {
    method: "delete",
    route: "/ordersRemoveProduct/:id",
    controller: OrderController,
    action: "removeProductFromOrder"//TODO: implement
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
}, {
    method: "get",
    route: "/status",
    controller: OrderController,
    action: "getAllStatuses"
}]