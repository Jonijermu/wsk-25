import {
  addUser,
  deleteUserById,
  findUserById,
  listAllUsers,
  modifyUser,
} from "../models/user-model.js";

import bcrypt from "bcrypt";

const getUser = async (req, res) => {
  const users = await listAllUsers();
  res.json(users);
};

const getUserById = async (req, res) => {
  const user = await findUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

const postUser = async (req, res) => {
  console.log(req.body)
  req.body.password  =  bcrypt.hashSync(req.body.password,  10);
  const result = await addUser(req.body);
  if (result.user_id) {
    res.status(201);
    res.json(result);
  } else {
    res.sendStatus(400);
  }
};

const deleteUser = async (req, res) => {
  console.log(res.locals.user.user_id)
  if (res.locals.user.user_id === Number(req.params.id) || res.locals.user.role === "admin") {
    const user = await deleteUserById(req.params.id);
    if (user.message) {
      res.status(200);
      res.json({user});
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(403)
  }
};

const putUser = async (req, res) => {
  if (res.locals.user.user_id === Number(req.params.id) || res.locals.user.role === "admin") {
    const user = await modifyUser(req.body, req.params.id);
    if (user.message) {
      res.status(200);
      res.json(user);
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(403);
  }
};

export {getUser, getUserById, postUser, deleteUser, putUser};
