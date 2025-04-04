// Note: db functions are async and must be called with await from the controller
// How to handle errors in controller?
import promisePool from '../../utils/database.js';


const listAllCats = async () => {
  const [rows] = await promisePool.query(`
                SELECT wsk_cats.*, wsk_users.name
                AS owner_name
                FROM wsk_cats
                INNER JOIN wsk_users
                ON wsk_cats.owner = wsk_users.user_id; `);

  console.log('rows', rows);
  return rows;
};


const findCatById = async (id) => {
  const [rows] = await promisePool.execute(`
                 SELECT wsk_cats.*, wsk_users.name
                 AS owner_name FROM wsk_cats
                 INNER JOIN wsk_users
                 ON wsk_cats.owner = wsk_users.user_id
                 WHERE cat_id = ?;`,
                 [id]);

  console.log('rows', rows);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const addCat = async (cat) => {
  const {cat_name, weight, owner, filename, birthdate} = cat;
  const sql = `INSERT INTO wsk_cats
                      (cat_name, weight, owner, filename, birthdate)
                      VALUES (?, ?, ?, ?, ?)`;

  const params = [cat_name, weight, owner, filename, birthdate];
  const rows = await promisePool.execute(sql, params);
  console.log('rows', rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return {cat_id: rows[0].insertId};
};

const modifyCat = async (cat, id, locals) => {
  const sql = promisePool.format(`
                    UPDATE wsk_cats
                    SET ?
                    WHERE owner = ?
                    AND cat_id = ?`,
             [cat, locals.user_id, id]);

  const rows = await promisePool.execute(sql);
  console.log('rows', rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return {message: 'success'};
};

const removeCat = async (id, locals) => {
  const [rows] = await promisePool.execute(`
                 DELETE FROM wsk_cats
                 WHERE owner = ?
                 AND cat_id = ?`,
                 [locals.user_id, id]);

  console.log('rows', rows);
  if (rows.affectedRows === 0) {
    return false;
  }
  return {message: 'success'};
}

const findCatByOwnerId = async (id) => {
  const [rows] =  await  promisePool.execute(`
                  SELECT * FROM wsk_cats
                  WHERE owner = ?`,
                  [id]);

  console.log('rows', rows);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

export {listAllCats, findCatById, addCat, modifyCat, removeCat, findCatByOwnerId};
