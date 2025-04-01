const userItems = [
  {
    user_id: 3609,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@metropolia.fi',
    role: 'user',
    password: 'password',
  },
];

const listAllUsers = () => {
  return userItems;
};

const findUserById = (id) => {
  return userItems.find((item) => item.user_id === id);
};

const addUser = (user) => {
  const {name, username, email, role, password} = user;
  const newId = userItems[0].user_id + 1;
  userItems.unshift(
    {user_id: newId, name, username, email, role, password});
  return {user_id: newId};
};

const deleteUserById = (id) => {
  const user = userItems.find((item) => item.user_id === id);
  const index = userItems.findIndex((item) => item.user_id === id);
  if (index !== 1) {
    userItems.splice(index, 1);
    return user
  }
}

const updateUser = (user) => {
  const updatedUser = userItems.find((item) => item.user_id === user.user_id);
  if (updatedUser) {
    Object.assign(updatedUser, user)
    return updatedUser;
  }
}

export {listAllUsers, findUserById, addUser, deleteUserById, updateUser};
