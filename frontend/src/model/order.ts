import {Status} from "./status";
import {ProductQuantity} from "./productQuantity";
import {IdentityProperties} from "./base/identityProperties";

export interface Order extends IdentityProperties {
    date?: string;
    userName: string;
    email: string;
    phoneNumber: string;
    totalPrice: number;
    productQuantities: ProductQuantity[];
    status: Status;
    placeDate: string,
    lastChangeDate: string
}