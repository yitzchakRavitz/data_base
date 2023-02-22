import express, { Request, Response } from "express"
import { DB } from "../index";

export function createClientRouter(db: DB) {
    const clientRouter = express.Router();

    //insert client
    clientRouter.post('/', async (req: Request, res: Response) => {
        const client = await db.client.insert(req.body);
        if (!client) {
            res.status(404).json({ course: "Not Found" })
        }
        res.json(client);
    })

    return clientRouter;
}