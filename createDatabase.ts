import {  Sequelize } from "sequelize";
import { createTable as createProduct } from "./product";
import { createTable as createClient } from "./client";
import { createTable as createProductClient } from "./productClients";



export async function createSchema(sequelize: Sequelize) {
    const result = await sequelize.query("CREATE SCHEMA store_managment")
    console.log(result)
}

export function getConnection() {
    const sequelize = new Sequelize({
        dialect: "postgres",
        host: "localhost",
        port: 5432,
        database: "store_managment",
        username: 'student_server',
        password: '1234',
        logging: (sql) => {
            console.log("Query: %s", sql)
        }
    })
    return sequelize;
} 

export async function createTables(sequelize: Sequelize) {
    const connection = getConnection()
    const Product = await createProduct(connection);
    const Client = await createClient(connection);
    const ProductClient = await createProductClient(connection, Client.Schema, Product.Schema);
    return {
        Product,
        Client,
        ProductClient
    }
}