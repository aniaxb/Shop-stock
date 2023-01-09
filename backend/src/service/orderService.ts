import {EntityService} from "./entityService";
import {Order} from "../model/order";
import {Product} from "../model/product";
import {Category} from "../model/category";
import {StatusService} from "./statusService";
import {ProductQuantity} from "../model/productQuantity";
import {validate} from "class-validator";

export class OrderService extends EntityService {

    private statusService: StatusService = new StatusService();

    constructor() {
        super(Order);
    }

    public getAllOrders(): Promise<Order[]> {
        return this.repository.find({
            relations: {
                productQuantities: {
                    product: true
                },
                status: true
            }
        })
    }

    public getAllOrdersByStatus(name: string): Promise<Order[]> {
        return this.repository.find({
            relations: {
                productQuantities: {
                    product: true
                },
                status: true
            },
            where: {
                status: {
                    name: name
                }
            }
        })
    }

    public getOrder(id: number): Promise<Order> {
        return this.repository.findOne({
            relations: {
                productQuantities: {
                    product: true
                },
                status: true
            },
            where: {
                id: id
            }
        })
    }

    public addOrder(order: Order): Promise<Order> {
        return this.validateEntity(order).then(() => {
            return this.repository.save(order);
        })
    }

    public removeOrder(id: number): Promise<Category> {
        return this.getOrder(id).then(result => {
            return this.repository.remove(result);
        })
    }

    public editOrder(id: number, name: string, date: string): Promise<Order> {
        return this.getOrder(id).then(result => {
            if (result.status.name.match("Done") || result.status.name.match("NotApproved")) {
                throw new Error('You cannot change the status of a completed order');
            } else {
                return this.statusService.getStatusByName(name).then(status => {
                    if(!status) {
                        throw new Error('The specified state does not exist')
                    }
                    result.status = status;
                    result.lastChangeDate = date;
                    return this.repository.save(result)
                })
            }
        })
    }

    public editProductInOrder(id: number, products: ProductQuantity[]): Promise<Order> {
        return this.getOrder(id).then(result => {
            result.productQuantities = products;
            return validate(result).then(() => {
                return this.addOrder(result);
            })
        })
    }

}