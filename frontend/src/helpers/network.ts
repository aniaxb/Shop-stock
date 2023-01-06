import {Category} from "../model/category";
import axios from "axios";
import {Global} from "./global";
import {Product} from "../model/product";
import {ProductQuantity} from "../model/productQuantity";
import {Order} from "../model/order";
import {Status} from "../model/status";

export class Network {

    static getCategories(): Promise<Category[]> {
        return axios({
            method: 'GET',
            url: Global.BASE_URL + "/" + Global.CATEGORIES,
        }).then(function (res) {
            return res.data
        }).catch(function (error) {
            throw error
        })
    }

    static getProducts(): Promise<Product[]> {
        return axios({
            method: 'GET',
            url: Global.BASE_URL + "/" + Global.PRODUCTS,
        }).then(function (res) {
            return res.data
        }).catch(function (error) {
            throw error
        })
    }

    static addOrder(token: string, userName: string,
                    phoneNumber: string,
                    email: string,
                    totalPrice: number,
                    statusId: number,
                    productQuantities: []): Promise<ProductQuantity> {
        return axios({
            method: 'POST',
            url: Global.BASE_URL + "/" + Global.ORDERS,
            data: {
                userName: userName,
                phoneNumber: phoneNumber,
                email: email,
                totalPrice: totalPrice,
                status: {
                    id: statusId
                },
                productQuantities: productQuantities
            },
            headers: {
                Authorization: "Bearer " + token,
            },
        }).then(function (res) {
            return res.data
        }).catch(function (error) {
            throw error
        })
    }

    static loginUser(email: string, password: string): Promise<string> {
        return axios({
            method: 'POST',
            url: Global.BASE_URL + "/" + Global.LOGIN,
            data: {
                email: email,
                password: password,
            }
        }).then(function (res) {
            return res.data.token
        }).catch(function (error) {
            throw error
        })
    }

    static getOrder(token: string, id: number): Promise<Order> {
        return axios({
            method: 'GET',
            url: Global.BASE_URL + "/" + Global.ORDERS + "/" + id,
            headers: {
                Authorization: "Bearer " + token,
            },
        }).then(function (res) {
            return res.data
        }).catch(function (error) {
            throw error
        })
    }

    static getOrders(token: string): Promise<Order[]> {
        return axios({
            method: 'GET',
            url: Global.BASE_URL + "/" + Global.ORDERS,
            headers: {
                Authorization: "Bearer " + token,
            },
        }).then(function (res) {
            return res.data
        }).catch(function (error) {
            throw error
        })
    }

    static getStatus(token: string): Promise<Status> {
        return axios({
            method: 'GET',
            url: Global.BASE_URL + "/" + Global.STATUS,
            headers: {
                Authorization: "Bearer " + token,
            },
        }).then(function (res) {
            return res.data
        }).catch(function (error) {
            throw error
        })
    }

    static getOrderByStatus(token: string, status: string): Promise<Order> {
        return axios({
            method: 'GET',
            url: Global.BASE_URL + "/" + Global.ORDERS + "/" + Global.BY_STATUS,
            params: {
                status: status
            },
            headers: {
                Authorization: "Bearer " + token,
            },
        }).then(function (res) {
            return res.data
        }).catch(function (error) {
            throw error
        })
    }

    static editOrder(token: string, id: number, name: string): Promise<Order> {
        return axios({
            method: 'PUT',
            url: Global.BASE_URL + "/" + Global.ORDERS + "/" + id,
            data: {
                name: name
            },
            headers: {
                Authorization: "Bearer " + token,
            },
        }).then(function (res) {
            return res.data
        }).catch(function (error) {
            throw error
        })
    }

    static addProduct(token: string,
                      brand: string,
                      name: string,
                      description: string,
                      price: string,
                      weight: string,
                      img: string,
                      categories: []): Promise<Product> {
        return axios({
            method: 'POST',
            url: Global.BASE_URL + "/" + Global.PRODUCTS,
            data: {
                name: name,
                brand: brand,
                img: img,
                description: description,
                price: parseFloat(price),
                weight: parseFloat(weight),
                categories: categories,
            },
            headers: {
                Authorization: "Bearer " + token,
            },
        }).then(function (res) {
            return res.data
        }).catch(function (error) {
            throw error
        })
    }

    static getProduct(token: string, id: number): Promise<Product> {
        return axios({
            method: 'GET',
            url: Global.BASE_URL + "/" + Global.PRODUCTS + "/" + id,
            headers: {
                Authorization: "Bearer " + token,
            },
        }).then(function (res) {
            return res.data
        }).catch(function (error) {
            throw error
        })
    }

    static editProduct(token: string, id: number, product: Product): Promise<Product> {
        return axios({
            method: 'PUT',
            url: Global.BASE_URL + "/" + Global.PRODUCTS + "/" + id,
            data: {
                name: product.name,
                brand: product.brand,
                description: product.description,
                price: parseFloat(String(product.price)),
                weight: parseFloat(String(product.weight)),
            },
            headers: {
                Authorization: "Bearer " + token,
            },
        }).then(function (res) {
            return res.data
        }).catch(function (error) {
            throw error
        })
    }
}