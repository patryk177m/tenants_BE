import { where } from "sequelize";
import { Bill } from "../models/bill-model.js";

async function getAll() {
  return await Bill.findAll();
};

async function create(billData) {
  try {
    return await Bill.create(billData);
  } catch (err) {
    throw new Error('Error creating bill: ' + err.message);
  }
}

async function deleteBill(id) {
  try {
    return await Bill.destroy({
      where: {
        id,
      }
    });
  } catch (err) {
    throw new Error('Error deleting bill: ' + err.message);
  }
}

export const billsService = {
  getAll,
  create,
  deleteBill,
}