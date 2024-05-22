import { cardService } from "../services/cardService.js";


async function getAll(req, res) {
  try {
    const cardsData = await cardService.getAll();
    res.send(cardsData);
  } catch (err) {
    res.status(500).json({ err: err.message });
  };
};

async function getItemById(req, res) {
  const { id } = req.params;
  try {
    const item = await cardService.getItemById(id);
    return res.status(200).json({ item });
  } catch (err) {
    return res.status(500).json(err.message);
  };
};

async function create(req, res) {
  const { supplier, title, sum, datepay, status, dateadd, issending } = req.body;
  try {
    const newItem = await cardService.create({
      supplier,
      title,
      sum,
      datepay,
      status,
      dateadd,
      issending,
    });

    res.send(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  };
};

async function deleteItem(req, res) {
  const { id } = req.params;
  try {
    await cardService.deleteItem(Number(id));
    return res.status(204).json("Item has been succesfully deleted");
  } catch (err) {
    return res.status(500).json(err.message);
  }
}


export const cardControllers = {
  getAll,
  getItemById,
  create,
  deleteItem,
}