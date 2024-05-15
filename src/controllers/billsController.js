import { billsService } from "../services/billsService.js";

async function getAll(req, res) {
  try {
    const billsData = await billsService.getAll();
    res.send(billsData);
  } catch (err) {
    res.status(500).json({ err: message });
  };
};

async function getBillById(req, res) {
  const { id } = req.params;

  try {
    const bill = await billsService.getBillById(id);
    return res.status(200).json({ bill });
  } catch (err) {
    return res.status(500).json(err.message);
  };
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
    res.status(500).json({ error: err });
  };
};

async function updateBill(req, res) {
  const { id } = req.params;
  try {
    const bill = await billsService.updateBill(Number(id), req.body);
    return res.status(201).json(bill);
  } catch (err) {
    return res.status(400).json(err.message);
  };
};

async function deleteBill(req, res) {
  const { id } = req.params;

  try {
    await billsService.deleteBill(Number(id));
    return res.status(204).json("Bill has been succesfully deleted");
  } catch (err) {
    return res.status(500).json(err.message);
  };
};

export const billsController = {
  getAll,
  getBillById,
  create,
  updateBill,
  deleteBill,
};
