import express from "express";
import { billsController } from "../controllers/billsController.js";

const router = express.Router();

router.get('/', billsController.getAll);
router.get('/:id', billsController.getBillById);
router.post('/add', billsController.create);
router.put('/:id', billsController.updateBill);
router.delete('/:id', billsController.deleteBill);


export default router;