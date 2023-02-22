import { Model, Sequelize, DataTypes, ModelStatic } from "sequelize";
import { supplier } from "../models/supplier";



type supplierSchemaModel = Model<supplier>

export interface supplierInterface {
    Schema: ModelStatic<supplierSchemaModel>
    insert: (client: supplier) => Promise<supplier>
    deleteSupplierById(id)
}



export async function createTable(sequelize: Sequelize): Promise<supplierInterface> {
    const supplierSchema = sequelize.define<supplierSchemaModel>("supplier", {
        companyNumber: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        schema: "store_managment",
        createdAt: false
    });
    
    await supplierSchema.sync();
    return {
        Schema: supplierSchema,
        async insert(supplier) {
            const result = await supplierSchema.create(supplier as supplier)
            return result.toJSON();
        },
        async deleteSupplierById(supplier) {
            const result = await supplierSchema.destroy({
                where: { name: supplier }
            });
            return result === 1;
        }
    };
}

export type supplierTable = Awaited<ReturnType<typeof createTable>>;
