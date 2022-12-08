import {Product} from "../model/product";
import {Order} from "../model/order";
import {Category} from "../model/category";

export function validateUser(email: string, password: string) {
    return !(email.length < 5 || password.length < 5);
}

export function validateProduct(product: Product) {
    if (!product.name || !product.description || product.price < 0 || product.weight < 0) {
        throw new Error('xdd'); //TODO: nie dziala
    } else {
        return product;
    }
}

export function validateOrder(order: Order) {
    return !(order.userName.length < 5 || order.phoneNumber.length < 9 ||
        !order.phoneNumber.match(/^[0-9]+$/) || order.products.length <= 0);
}

export function validateCategory(category: Category) {
    return !(category.name.length < 1);
}