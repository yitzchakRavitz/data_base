import { Model, Sequelize, DataTypes, ModelStatic } from "sequelize";
import { Client } from "../models/client";



type ClientSchemaModel = Model<Client>

export interface ClientInterface {
    Schema: ModelStatic<ClientSchemaModel>
    insert: (client: Client) => Promise<Client>
}


export async function createTable(sequelize: Sequelize): Promise<ClientInterface> {
    const ClientSchema = sequelize.define<ClientSchemaModel>("Client", {
        id: {
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
    
    await ClientSchema.sync();
    return {
        Schema: ClientSchema,
        async insert(client) {
            const result = await ClientSchema.create(client as Client)
            return result.toJSON();
        },
    };
}

export type ClientTable = Awaited<ReturnType<typeof createTable>>;
