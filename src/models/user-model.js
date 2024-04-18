
import { sequelize } from "../utils/db.js";
import { DataTypes } from "sequelize";

export const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    validate: { isInt: true },
  },
  name: {
    type: DataTypes.STRING(32),
    allowNull: false,
    validate: { len: [1, 32] }
  },
  surname: {
    type: DataTypes.STRING(64),
    allowNull: false,
    validate: { len: [1, 64] }
  },
  email: {
    type: DataTypes.STRING(200),
    allowNull: false,
    unique: true,
    validate: { isEmail: true, len: [1, 200] },
  },
  password: {
    type: DataTypes.STRING,
    required: true,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Password is needed!",
      },
      notEmpty: {
        msg: "Please provide a password",
      },
    },
  },
  isActiveEmail: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  phone: {
    type: DataTypes.STRING(14),
    allowNull: false,
    validate: { len: [9, 14] }
  },
  postalcode: {
    type: DataTypes.STRING(6),
    allowNull: false,
    validate: { len: [5, 6] }
  },
  city: {
    type: DataTypes.STRING(128),
    allowNull: false,
    validate: { len: [2, 128] }
  },
  address: {
    type: DataTypes.STRING(128),
    allowNull: false,
    validate: { len: [2, 128] }
  },
  role: {
    type: DataTypes.ENUM("admin", "tenant", "lodger"),
    defaultValue: "lodger",
    allowNull: false,
    validate: { len: [5, 6] },
  },
});
