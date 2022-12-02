import "reflect-metadata"
import { DataSource } from "typeorm"
import {User} from "../entity/User";
import {Product} from "../entity/Product";
import {Category} from "../entity/Category";
import {Order} from "../entity/Order";

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "admin",
    database: "aji",
    synchronize: true,
    logging: false,
    entities: [User, Product, Category, Order],
    migrations: ["/migrations/"],
    subscribers: []
});

AppDataSource.initialize()
    .then(async () => {
        console.log("Database connection successful!");
    })
    .catch((error) => console.log(error));

export const getDataSource = (delay = 3000): Promise<DataSource> => {
    if (AppDataSource.isInitialized) return Promise.resolve(AppDataSource);

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (AppDataSource.isInitialized) resolve(AppDataSource);
            else reject("Failed to create connection with database");
        }, delay);
    });
};