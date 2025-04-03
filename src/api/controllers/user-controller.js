import {
  addUser,
  deleteUserById,
  findUserById,
  listAllUsers,
  modifyUser,
} from "../models/user-model.js";

const getUser = async (req, res) => {
  const users = await listAllUsers();
  res.json(users);
};

const getUserById = async (req, res) => {
  const user = await findUserById(parseInt(req.params.id, 10));
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

const postUser = async (req, res) => {
  const result = await addUser(req.body);
  if (result.user_id) {
    res.status(201);
    res.json({message: 'New user added.', result});
  } else {
    res.sendStatus(400);
  }
};

const deleteUser = async (req, res) => {
  const user = await deleteUserById(parseInt(req.params.id), 10);
  if (user) {
    res.status(201);
    res.json({message: 'User item deleted.'});
  } else {
    res.sendStatus(404);
  }
};

const putUser = async (req, res) => {
  const user = await modifyUser(req.body, req.params.id);
  if (user) {
    res.status(200);
    res.json(user);
  } else {
    res.sendStatus(400);
  }
};

export {getUser, getUserById, postUser, deleteUser, putUser};
