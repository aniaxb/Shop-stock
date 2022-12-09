import {CategoryController} from "../controller/categoryController";

export const CategoryRoutes = [{
    method: "get",
    route: "/categories",
    controller: CategoryController,
    action: "getAllCategories"
}, {
    method: "get",
    route: "/categories/:id",
    controller: CategoryController,
    action: "getCategory"
}, {
    method: "post",
    route: "/categories",
    controller: CategoryController,
    action: "addCategory"
}, {
    method: "put",
    route: "/categories/:id",
    controller: CategoryController,
    action: "editCategory"
}, {
    method: "delete",
    route: "/categories/:id",
    controller: CategoryController,
    action: "removeCategory"
}]