import express from 'express';
import { cardControllers } from '../controllers/cardController.js';

const cardRouter = express.Router();

cardRouter.get('/', cardControllers.getAll);
cardRouter.get('/:id', cardControllers.getItemById);
cardRouter.post('/add', cardControllers.create);



export default cardRouter;