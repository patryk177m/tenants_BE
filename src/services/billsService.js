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

async function getBillById(id) {
  try {
    
    if (!id) {
      throw new Error('The bill with the given id does not exist');
    }

    const bill = await Bill.findByPk(id);

    if (!bill) {
      throw new Error('Bill not found');
    }

    return bill;

  } catch (err) {
    throw new Error('Error bill: ' + err.message);
  }
}

async function updateBill(id, data) {
  try {
    const bill = await Bill.findByPk(id);

    if (!bill) {
      throw new Error('Bill not found');
    }

    return await bill.update(data);

  } catch (err) {
    throw new Error('Error updating bill: ' + err.message);
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
  getBillById,
  create,
  updateBill,
  deleteBill,
}