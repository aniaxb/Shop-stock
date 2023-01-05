import {BaseProperties} from "./base/baseProperties";
import {Category} from "./category";

export interface Product extends BaseProperties {
    description: string;
    brand: string;
    img: string;
    price: number;
    weight: number;
    categories: Category[];
}