import {Category} from "../model/category";
import axios from "axios";
import {Global} from "./global";

export class Network {
    static getCategories(): Promise<Category[]> {
        return axios({
            method: 'GET',
            url: Global.BASE_URL + "/" +Global.CATEGORIES,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        }).then(function (res) {
            return res.data
        }).catch(function (error) {
            throw error
        })
    }
}