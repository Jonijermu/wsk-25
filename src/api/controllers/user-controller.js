import {
  addUser,
  deleteUserById,
  findUserById,
  listAllUsers,
  updateUser
} from "../models/user-model.js"

const getUser = (req, res) => {
  res.json(listAllUsers())
}

const getUserById = (req, res) => {
  const user = findUserById(parseInt(req.params.id, 10));
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

const postUser = (req, res) => {
  const result = addUser(req.body);
  if (result.user_id) {
    res.status(201);
    res.json({message: 'New user added.', result});
  } else {
    res.sendStatus(400);
  }
};

const deleteUser = (req, res) => {
  const user = deleteUserById(parseInt(req.params.id), 10);
  if (user.user_id) {
    res.status(201);
    res.json({message: 'User item deleted.'})
  } else {
    res.sendStatus(404)
  }
}

const putUser = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const newData = {user_id: id, ...req.body};
  const user = updateUser(newData);
  if (user) {
    res.status(201);
    res.json({message: 'User item updated'})
  } else {
    res.sendStatus(404)
  }
}

export {getUser, getUserById, postUser, deleteUser, putUser}
