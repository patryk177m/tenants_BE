import { Card } from "../models/card-model.js";


async function getAll() {
  return Card.findAll();
};

async function getItemById(id) {
  try {
    
    if (!id) {
      throw new Error('The bill with the given id does not exist');
    }

    const item = await Card.findByPk(id);

    if (!item) {
      throw new Error('Bill not found');
    }

    return item;

  } catch (err) {
    throw new Error('Error bill: ' + err.message);
  }
}

async function create(item) {
  try {
    return await Card.create(item);
  } catch (err) {
    throw new Error('Error creating item: ' + err.message);
  }
};

export const cardService = {
  getAll,
  getItemById,
  create,
}