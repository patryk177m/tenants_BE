import { billsService } from "../services/billsService.js";


 async function getAll(req, res) {
  try {
    const billsData = await billsService.getAll();
    res.send(billsData);
  } catch (err) {
    res.status(500).json({ err: message});
  }
};

async function create(req, res) {
  const { supplier, title, sum, datepay, status } = req.body;
  try {
    const newBill = await billsService.create({
      supplier,
      title,
      sum,
      datepay,
      status,
    });

    res.send(newBill);

  } catch (err) {
    res.status(500).json({ error: err});
  } 
};


export const billsController = {
  getAll,
  create,
}