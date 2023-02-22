import express from 'express';
import { main as initDB } from '../index';
import { createSupplierRouter  } from './supplierRouter';
import { createProductRoute} from './productRouter';
import { createClientRouter} from './clientRouter';
import { createSaleRouter} from './saleRouter';

export async function mainRouter() {
    const app = express()
  
    const db = await initDB()
    app.use(express.json({ limit: "10kb" }))
    app.use("/supplier", createSupplierRouter(db))
    app.use("/product", createProductRoute(db))
    app.use("/sale", createSaleRouter(db))
    app.use("/client", createClientRouter(db))

    app.listen(8080, () => {
      console.log(`Example app listening on port 8088`)
    })
  }
  
  mainRouter().then(() => {
    console.log("Exiting")
  })
