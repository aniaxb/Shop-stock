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
    route: "/ordersProduct/:id",
    controller: OrderController,
    action: "editProductInOrder"
}, {
    method: "get",
    route: "/orders/selectBy/status",
    controller: OrderController,
    action: "getAllOrdersByStatus"
}, {
    method: "delete",
    route: "/orders/:id",
    controller: OrderController,
    action: "removeOrder"
}]