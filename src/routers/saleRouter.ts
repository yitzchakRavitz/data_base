import express, { Request, Response } from "express"
import { DB } from "../index";

export function createSaleRouter(db: DB) {
    const saleRouter = express.Router();

//insert sale
    saleRouter.post('/', async (req: Request, res: Response) => {
        const sale = await db.sale.insert(req.body);
        if (!sale) {
            res.status(404).json({ course: "Not Found" })
        }
        res.json(sale);
    })



    // saleRouter.get('/:supplierid/product/', async (req: Request, res: Response) => {
    //     //const { courseId } = req.params;
    
    
    //     const course = await db.product.getAllsalesOfSupplier(req.params.supplierid);
    //     if (!course) {
    //         res.status(404).json({ status: 'not found' });
    //     }
    //     else {
    //         res.status(200).json({ status: 'get course with his students succeeded !' });
    //     }
    //     console.log(course);
    
    // });




    return saleRouter;
}