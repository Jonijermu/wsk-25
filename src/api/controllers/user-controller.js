import {listAllUsers, findUserById, addUser} from "../models/user-model.js"

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

export {getUser, getUserById, postUser}
