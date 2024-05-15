import express from "express";
import { billsController } from "../controllers/billsController.js";

const router = express.Router();

router.get('/', billsController.getAll);
router.post('/add', billsController.create);
router.delete('/:id', billsController.deleteBill)

export default router;