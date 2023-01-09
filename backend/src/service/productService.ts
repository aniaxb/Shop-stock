import {EntityService} from "./entityService";
import {Product} from "../model/product";
import {Category} from "../model/category";

export class ProductService extends EntityService {

    constructor() {
        super(Product);
    }

    public getAllProducts(): Promise<Product[]> {
        return this.repository.find({
            relations: ['categories']
        });
    }

    public getProduct(id: number): Promise<Product> {
        return this.repository.findOne({
            relations: ['categories'],
            where: {
                id: id,
            },
        });
    }

    public addProduct(product: Product): Promise<Product> {
        return this.validateEntity(product).then(() => {
            return this.repository.save(product);
        })
    }

    public removeProduct(id: number): Promise<Category> {
        return this.getProduct(id).then(result => {
            return this.repository.remove(result);
        })
    }

    public editProduct(id: number, category: Category): Promise<Category> {
        return this.getProduct(id).then(result => {
            const merge = {...result, ...category};
            return this.validateEntity(merge).then(() => {
                return this.repository.save(merge);
            })
        })
    }

    public addCategoryToProduct(id: number, category: Category): Promise<Category> {
        return this.getProduct(id).then(result => {
            result.addCategory(category);
            return this.validateEntity(result).then(() => {
                return this.repository.save(result);
            })
        })
    }

    public removeCategoryFromProduct(id: number, category: Category): Promise<Category> {
        return this.getProduct(id).then(result => {
            result.removeCategory(category);
            return this.validateEntity(result).then(() => {
                return this.repository.save(result);
            })
        })
    }
}