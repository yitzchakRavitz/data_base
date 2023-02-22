import { Model, Sequelize } from "sequelize";
import { sale as Client_purchase } from "../models/sale";
import { ClientInterface } from "./client";
import { ProductInterface } from "./product";
import { supplierInterface } from "./supplier";

type ProductSchemaModel = Model<Client_purchase>

export interface ClientPurchaseeInterface {
  insert: (client_purchase: Client_purchase) => Promise<Client_purchase>
  getAllsalesOfSupplier: (id: string) => any
}

export async function createTable(sequelize: Sequelize, supplier: supplierInterface["Schema"],Client: ClientInterface["Schema"], Product: ProductInterface["Schema"]): Promise<ClientPurchaseeInterface> {
  const Client_purchase = sequelize.define<ProductSchemaModel>('client_purchase', {
  } as Client_purchase, {
    schema: "product",
    createdAt: false,
  })
  Client.belongsToMany(Product, { through: Client_purchase })
  Product.belongsTo(Client)
  await Client_purchase.sync()

  return {
    async getAllsalesOfSupplier(supplierName) {
      const result = await Client_purchase.findAll({
        include: [{
          model: Product,
          include: [{
            model: supplier,
            where: { name: supplierName }
          }]
        }, {
          model: supplier
        }]
      })
      return result;
    },
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


