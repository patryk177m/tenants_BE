import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';
import { User } from "../models/schemas.js";

 
const getAll = async () => {
  return await User.findAll({});
};

const getAllUsersByRole = async (role) => {
  return await User.findAll({
    where: {
      role,
    },
  });
};

const createUser = async (userData) => {
  const salt = await bcrypt.genSalt(10);
  userData.password = await bcrypt.hash(userData.password, salt);

  const userDb = await User.create(userData);

  return userDb;
};

const validPassword = async (password, userDb) => {
  try {
    return await bcrypt.compare(password, userDb.password);
  } catch (error) {
    throw new Error(error);
  }
};

const getUserById = async (id) => {
  return await User.findByPk(id);
};

const updateUserById = async (id, userData) => {
  const updateUser = await User.update(
    {
      ...userData,
    },
    {
      where: {
        id,
      },
    }
  );

  return updateUser;
};

const getUserByEmail = async (email) => {
  return await User.findOne({
    where: {
      email,
    },
  });
};

export const usersController = {
  getAll,
  getAllUsersByRole,
  createUser,
  validPassword,
  getUserById,
  updateUserById,
  getUserByEmail,
};
