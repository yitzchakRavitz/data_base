import { createTable as createClientTable } from './schemas/client';
import { createTable as createProductTable } from './schemas/product';
import { createTable as createSaleTable } from './schemas/sale';
import { createTable as createSupplierTable } from './schemas/supplier';


import { Sequelize } from 'sequelize';


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

export async function createTables() {
    const connection = getConnection()
    const product = await createProductTable(connection);
    const client = await createClientTable(connection);
    const supplier = await createSupplierTable(connection);
    const sale = await createSaleTable(connection, supplier.Schema,client.Schema, product.Schema);


    
   
    return {
        sale,
        product,
        client,
        supplier,
       
    }
}