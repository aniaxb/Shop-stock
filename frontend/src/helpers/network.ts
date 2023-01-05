import {Category} from "../model/category";
import axios from "axios";
import {Global} from "./global";

export class Network {

    static getCategories(token: string): Promise<Category[]> {
        return axios({
            method: 'GET',
            url: Global.BASE_URL + "/" + Global.CATEGORIES,
            // headers: {
            //     Authorization: "Bearer " + token,
            // },
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