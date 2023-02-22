import express, { Request, Response } from "express"
import { DB } from "../index"

export function createProductRoute(db: DB) {
    const productRouter = express.Router();


    //insert product
    productRouter.post('/', async (req: Request, res: Response) => {
        const student = await db.product.insert(req.body);
        res.json(student);
    })




  
    return productRouter;
}