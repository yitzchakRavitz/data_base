import express, { Request, Response } from "express"
import { DB } from "../index";

export function createSupplierRouter(db: DB) {
    const courseRouter = express.Router();

//insert supplier
    courseRouter.post('/', async (req: Request, res: Response) => {
        const supplier = await db.supplier.insert(req.body);
        if (!supplier) {
            res.status(404).json({ course: "Not Found" })
        }
        res.json(supplier);
    })

//get all supplier products
courseRouter.get('/:supplierid/product/', async (req: Request, res: Response) => {
    //const { courseId } = req.params;


    const course = await db.product.getAllProductOfSupplier(req.params.supplierid);
    if (!course) {
        res.status(404).json({ status: 'not found' });
    }
    else {
        res.status(200).json({ status: 'get course with his students succeeded !' });
    }
    console.log(course);

});
    return courseRouter;
}