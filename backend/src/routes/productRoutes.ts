import {ProductController} from "../controller/productController";

export const ProductRoutes = [{
    method: "get",
    route: "/products",
    controller: ProductController,
    action: "getAllProducts"
}, {
    method: "get",
    route: "/products/:id",
    controller: ProductController,
    action: "getProduct"
}, {
    method: "post",
    route: "/products",
    controller: ProductController,
    action: "addProduct"
}, {
    method: "put",
    route: "/products",
    controller: ProductController,
    action: "editProduct"
}, {
    method: "delete",
    route: "/products/:id",
    controller: ProductController,
    action: "removeProduct"
}]