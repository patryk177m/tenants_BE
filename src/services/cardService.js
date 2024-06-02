import { Card } from "../models/card-model.js";

async function getAll() {
  return Card.findAll({
    order: [["id", "DESC"]],
  });
}

async function getItemById(id) {
  try {
    if (!id) {
      throw new Error("The item with the given id does not exist");
    }

    const item = await Card.findByPk(id);

    if (!item) {
      throw new Error("Item not found");
    }

    return item;
  } catch (err) {
    throw new Error("Error item: " + err.message);
  }
}

async function create(item) {
  try {
    return await Card.create(item);
  } catch (err) {
    throw new Error("Error creating item: " + err.message);
  }
}

async function deleteItem(id) {
  try {
    return await Card.destroy({
      where: {
        id,
      },
    });
  } catch (err) {
    throw new Error("Error deleting item: " + err.message);
  }
}

export const cardService = {
  getAll,
  getItemById,
  create,
  deleteItem,
};
