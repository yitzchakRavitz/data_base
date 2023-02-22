import express, { Request, Response } from "express"
import { DB } from "../index";

export function createSupplierRouter(db: DB) {
    const supplierRouter = express.Router();

//insert supplier
    supplierRouter.post('/', async (req: Request, res: Response) => {
        const supplier = await db.supplier.insert(req.body);
        if (!supplier) {
            res.status(404).json({ course: "Not Found" })
        }
        res.json(supplier);
    })

//get all supplier products
supplierRouter.get('/:supplierid/product/', async (req: Request, res: Response) => {



    const Product = await db.product.getAllProductOfSupplier(req.params.supplierid);
    if (!Product) {
        res.status(404).json({ status: 'not found' });
    }
    else {
        res.status(200).json({ status: 'get course with his students succeeded !' });
    }
    console.log(Product);

});


supplierRouter.delete('/:supplierName', async (req: Request, res: Response) => {
    const supplierName = req.params.supplierName;
    const supplier = await db.supplier.deleteSupplierById(supplierName);
    if (supplier) {
        return res.status(200).json({ status: 'deleted' });
    } else {
        return res.status(404).json({ status: 'not found' });
    }
});


    return supplierRouter;
}