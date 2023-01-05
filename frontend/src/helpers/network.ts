import {Category} from "../model/category";
import axios from "axios";
import {Global} from "./global";
import {Product} from "../model/product";
import {ProductQuantity} from "../model/productQuantity";

export class Network {

    // static getCategories(token: string): Promise<Category[]> {
    //     return axios({
    //         method: 'GET',
    //         url: Global.BASE_URL + "/" + Global.CATEGORIES,
    //         // headers: {
    //         //     Authorization: "Bearer " + token,
    //         // },
    //     }).then(function (res) {
    //         return res.data
    //     }).catch(function (error) {
    //         throw error
    //     })
    // }

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


}