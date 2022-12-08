import "reflect-metadata"
import { DataSource } from "typeorm"
import {User} from "../model/user";
import {Product} from "../model/product";
import {Category} from "../model/category";
import {Order} from "../model/order";
import {Status} from "../model/status";
require('dotenv').config()

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    database: process.env.DB,
    synchronize: true,
    logging: false,
    entities: [User, Product, Category, Order, Status],
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
