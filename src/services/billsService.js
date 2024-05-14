import { Bill } from "../models/bill-model.js";

async function getAll() {
  return await Bill.findAll();
};

async function create(billData) {
  try {
    return await Bill.create(billData);
  } catch (err) {
    throw new Error('Error creating user: ' + err.message);
  }
  return 
}

export const billsService = {
  getAll,
  create,
}