import {User} from "../model/user";
import {Product} from "../model/product";
import {Order} from "../model/order";
import {Category} from "../model/category";

export function validateUser(email: string, password: string) {
    return !(email.length < 5 || password.length < 5);
}

export function validateProduct(product: Product) {
    return !(!product.name || !product.description || product.price < 0 || product.weight < 0);
}

export function validateOrder(order: Order) {

}

export function validateCategory(category: Category) {

}