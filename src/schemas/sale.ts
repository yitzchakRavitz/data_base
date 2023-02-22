import { Model, Sequelize } from "sequelize";
import { sale as Client_purchase } from "../models/sale";
import { ClientInterface } from "./client";
import { ProductInterface } from "./product";

type ProductSchemaModel = Model<Client_purchase>

export interface ClientPurchaseeInterface {
  insert: (client_purchase: Client_purchase) => Promise<Client_purchase>
  //getAllsalesOfSupplier: (id: string) => Promise<Client_purchase>
}

export async function createTable(sequelize: Sequelize, Client: ClientInterface["Schema"], Product: ProductInterface["Schema"]): Promise<ClientPurchaseeInterface> {
  const Client_purchase = sequelize.define<ProductSchemaModel>('client_purchase', {
  } as Client_purchase, {
    schema: "product",
    createdAt: false,
  })
  Client.belongsToMany(Product, { through: Client_purchase })
  Product.belongsTo(Client)
  await Client_purchase.sync()

  return {
    // async getAllsalesOfSupplier(id) {
    //   const result = Client_purchase.findAll
      
    // },
    async insert(client_purchase) {
      const newSale = {
        Product: client_purchase.Product,
        client: client_purchase.client,
        Price: client_purchase.Price
      };

      const result = await Client_purchase.create(newSale)
      return result.toJSON();
    }
  }
}


