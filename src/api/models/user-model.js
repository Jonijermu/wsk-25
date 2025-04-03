import promisePool from '../../utils/database.js'

const listAllUsers = async () => {
  const [rows] = await promisePool.query('SELECT * FROM wsk_users');

  console.log('row', rows);
  return rows;
};

const findUserById = async (id) => {
  const [rows] = await promisePool.query(`Select wsk_users.*, wsk_cats.cat_name
          FROM wsk_users
          INNER JOIN wsk_cats ON wsk_users.user_id = wsk_cats.owner
          WHERE wsk_users.user_id = ? `, [id]);

  console.log('row', rows);
  if (rows.length === 0) {
    return false;
  }
  const ownedCats = rows.map(row => row.cat_name);
  return {
    user_id: rows[0].user_id,
    name: rows[0].name,
    username: rows[0].username,
    email: rows[0].email,
    password: rows[0].password,
    role: rows[0].role,
    ownedCtas: ownedCats
  };
};


const addUser = async (user) => {
  const {name, username, email, role, password} = user;
  const sql = `INSERT INTO wsk_users (name, username, email, role, password)
               VALUES (?, ?, ?, ?, ?)`;

  const params = [name, username, email, role, password];
  const rows = await promisePool.query(sql, params);
  console.log('row', rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return {user_id: rows[0].insertId};
};

const deleteUserById = async (id) => {
  const connection = await promisePool.getConnection();
  try {
    await connection.beginTransaction();

  await connection.execute(`DELETE FROM wsk_cats Where owner = ?`, [id]);
  const [rows] = await connection.execute(`DELETE  FROM wsk_users
        Where user_id = ?`, [id]);

    console.log('row', rows)
    if (rows.affectedRows === 0) {
      return {message: 'User not found'};
    }
    await connection.commit();
    return {message: 'success'};
  } catch (error) {
    await connection.rollback();
    console.error('Transaction rolled back due to error:', error);
    return {message: 'Transaction failed'};
  } finally {
    connection.release();
  }
};

const modifyUser = async (user, id) => {
  const sql = promisePool.format(`UPDATE wsk_users SET ?
                 WHERE user_id =  ?`, [user, id]);

  const rows = await promisePool.execute(sql);
  console.log('row', rows);
  if (rows[0].length === 0) {
    return false;
  }
  return rows[0];
}

export {listAllUsers, findUserById, addUser, deleteUserById, modifyUser};
