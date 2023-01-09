import {EntityService} from "./entityService";
import {Category} from "../model/category";

export class CategoryService extends EntityService {

    constructor() {
        super(Category);
    }

    public getAllCategories(): Promise<Category[]> {
        return this.repository.find();
    }

    public getCategory(id: number): Promise<Category> {
        return this.repository.findOneBy({ id: id });
    }

    public addCategory(category: Category): Promise<Category> {
        return this.validateEntity(category).then(() => {
            return this.repository.save(category);
        });
    }

    public removeCategory(id: number): Promise<Category> {
        return this.getCategory(id).then(result => {
            return this.repository.remove(result);
        })
    }

    public editCategory(id: number, category: Category): Promise<Category> {
        return this.getCategory(id).then(result => {
            const merge = {...result, ...category};
            return this.validateEntity(merge).then(() => {
                return this.repository.save(merge);
            })
        })
    }
}