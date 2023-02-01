import { Sequelize, DataTypes, Model, ModelStatic } from "sequelize";
import { Product } from "./MODEL/product"

type ProductSchemaModel = Model<Product>

export interface ProductInterface {
    Schema: ModelStatic<ProductSchemaModel>
    insert: (product: Omit<Product, "id" | "completeRegistration">) => Promise<Product>
    search: ()=> Promise<Product[]>
    getProduct(id: string): Promise<Product | undefined>;
}


// SKU: string;
// name: string;
// description: string; 
// customerPrice: string;
// purchasePrice: string; 
// Quantity: string;



export async function createTable(sequelize: Sequelize): Promise<ProductInterface> {
    const ProductSchema = sequelize.define<ProductSchemaModel>("Product", {
        SKU: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        description: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        customerPrice: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        purchasePrice: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.TEXT,
            allowNull: false, 
        },
        completeRegistration: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        }
       
    }, {
        
        schema: "store_managment",
        createdAt: false,
    })
    
    await ProductSchema.sync()
    return {
        Schema: ProductSchema,
        async insert(product) {
            const result = await ProductSchema.create(product as Product)
            return result.toJSON();
        },
        async search(){
            const product = await ProductSchema.findAll();
            return product.map((product) => product.toJSON());
        },
        async getProduct(id) {
            const result = await ProductSchema.findByPk(id);
            return result?.toJSON(); 
        }
    };
}
