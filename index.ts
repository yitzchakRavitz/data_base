import { createTables, getConnection } from "./createDatabase";


// SKU: string;
// name: string;
// description: string; 
// customerPrice: string;
// purchasePrice: string; 
// Quantity: string;

async function main() {
    const connection = getConnection();
    const DB = await createTables(connection);

    const product = await DB.Product.insert({
        SKU: "123456789",
        name: "car",
        description: "toyCar",
        customerPrice: "50",
        purchasePrice: "20",
        quantity: "100"
    });
    const product2 = await DB.Product.insert({
        SKU: "4444444",
        name: "plane",
        description: "planeToy",
        customerPrice: "50",
        purchasePrice: "20",
        quantity: "100"
    });
   

    // id: string;
    // name: string;
    // address: string; 
    // phoneNumber: string;


    const client = await DB.Client.insert({
        id: "123456789",
        name: "Yitzchak",
        address: "Israel",
        phoneNumber: "05412345678"
    })
    const client2 = await DB.Client.insert({
        id: "464646464",
        name: "Moshe",
        address: "Israel",
        phoneNumber: "0245631145"
    })


    // purchaseNumber: string,
    // SKU: string,
    // customerID: string,
    // customerPrice: string,
    // discountPercentage: string,
    // dateTimePurchase: string
    const client_purchase = await DB.ProductClient.insert({
        purchaseNumber: "1",
        SKU: "4444444",
        customerID: "464646464",
        customerPrice: "50",
        discountPercentage: "20",
        dateTimePurchase: "01/01/2023"
    })

   

    const VIEW1 = await connection.query(
        `CREATE VIEW client_purchase_history AS
        SELECT 
        client.id , 
          client.name , 
          product.name , 
          clientPurchase.date , 
          clientPurchase.price 
        FROM    
          client 
          JOIN clientPurchase 
            ON client.id = clientPurchase.client_id
          JOIN  product
            ON clientPurchase.product_id = product.id;`
    )
    
    const VIEW2 = await connection.query(
        ` CREATE VIEW last_month_buyers AS
        SELECT 
          client.id AS client_id, 
          client.name AS client_name, 
          COUNT(product_client.id) AS purchases
        FROM 
          clients AS client
          JOIN product_clients AS product_client
            ON client.id = product_client.client_id
          JOIN products AS product
            ON product_client.product_id = product.id
        WHERE 
          product_client.purchase_date >= DATE_SUB(NOW(), INTERVAL 1 MONTH)
        GROUP BY 
          client.id;`
    )

   

}

main().then(() => {
    console.log("Exiting")
})



