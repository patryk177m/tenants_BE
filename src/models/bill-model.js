import { sequelize } from "../utils/db.js";
import { DataTypes } from "sequelize";

export const Bill = sequelize.define('Bill', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    validate: { isInt: true },
  },
  supplier: {
    type: DataTypes.STRING(32),
    allowNull: false,
    validate: { len: [1, 32] }
  },
  title: {
    type: DataTypes.STRING(64),
    allowNull: false,
    validate: { len: [1, 64] },
  },
  sum: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { isInt: true }
  },
  datepay: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('opłacone', 'nieopłacone', 'oczekujące', 'odrzucone', 'anulowane'),
    defaultValue: 'oczekujące',
    allowNull: false,
  },
  dateadd: {
    type: DataTypes.DATE,
    allowNull: true,
  },
})