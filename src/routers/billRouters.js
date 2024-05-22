import express from "express";
import { billsController } from "../controllers/billsController.js";

const billRouter = express.Router();

billRouter.get('/', billsController.getAll);
billRouter.get('/:id', billsController.getBillById);
billRouter.post('/add', billsController.create);
billRouter.put('/:id', billsController.updateBill);
billRouter.delete('/:id', billsController.deleteBill);


export default billRouter;