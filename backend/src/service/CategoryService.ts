import {EntityService} from "./EntityService";
import {Category} from "../model/category";
import {validate} from "class-validator";

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
        return this.validateCategory(category).then(() => {
            console.log(category)
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
            return this.validateCategory(merge).then(() => {
                return this.repository.save(merge);
            })
        })
    }
    
    private validateCategory(category: Category): Promise<void> {
        return validate(Object.assign(new Category() , category)).then(async error => {
            if (error.length > 0) {
                throw new Error(JSON.stringify(error.pop().constraints))
            }
        })
    }
}