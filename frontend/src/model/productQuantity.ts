import {IdentityProperties} from "./base/identityProperties";
import {Product} from "./product";

export interface ProductQuantity extends IdentityProperties {
    quantity: number;
    productId: number;
    orderId: number;
    product: Product;
}