import { sequelize } from "../utils/db.js";
import { DataTypes } from "sequelize";

export const Card = sequelize.define('Card', {
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
    get() {
      const dateadd = this.getDataValue('datepay');
      return dateadd ? dateadd.toISOString().slice(0, 10) : null; // Convert to string if not null
    }
  },
  status: {
    type: DataTypes.ENUM('opłacone', 'nieopłacone', 'oczekujące', 'odrzucone', 'anulowane'),
    defaultValue: 'oczekujące',
    allowNull: false,
  },
  dateadd: {
    type: DataTypes.DATE,
    allowNull: true,
    get() {
      const dateadd = this.getDataValue('dateadd');
      return dateadd ? dateadd.toISOString().slice(0, 10) : null;
    }
  },
  issending: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
})