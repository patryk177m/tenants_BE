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
      dateadd: new Date(),
    });

    res.send(newBill);

  } catch (err) {
    res.status(500).json({ error: err});
  } 
};

async function deleteBill(req, res) {
  const { id } = req.params;

  try {
    await billsService.deleteBill(Number(id));
    return res.status(204).json("Bill has been succesfully deleted");
  } catch (err) {
    return res.status(500).json(err.message);
  }
}


export const billsController = {
  getAll,
  create,
  deleteBill,
}