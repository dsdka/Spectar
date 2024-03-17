
import db_connector from '../services/db_connector.js';

export const insertUser = async (user_name, salt, passwordHash, first_name, last_name, phone, user_role_id) => {

  const queryParams = [user_name.toLowerCase(), salt, passwordHash, first_name, last_name, phone, user_role_id];
  const query = `INSERT INTO spc.user(user_name,password_salt, password_hash, first_name,last_name,tel, id_user_role) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING id`;
  const id = await db_connector.query(query, queryParams);
  return id;
}

export const getUserRole = async () => {
  const query = `SELECT * FROM spc.user_role`;
  const { rows } = await db_connector.query(query);
  return rows;
}

export const getUserByUserName = async (userName) => {
  const query = `SELECT spc.user.* , spc.user_role.name as role_name  FROM spc.user LEFT JOIN spc.user_role ON spc.user.id_user_role = spc.user_role.id WHERE user_name=$1`;
  try {
    const { rows } = await db_connector.query(query, [userName.toLowerCase()]);
    if (rows.length < 1) {
      throw new Error('noUser')
    }
    return rows[0];

  } catch (error) {
    throw new Error('DB error');
  }
}

export const getAllUsers = async () => {
  const query = `SELECT 
  spc.user.id, 
  spc.user.user_name, 
  spc.user.first_name, 
  spc.user.last_name, 
  spc.user.tel as phone, 
  spc.user.id_user_role as user_role_id,
  spc.user_role.name as user_role
  FROM spc.user
  LEFT JOIN spc.user_role ON spc.user.id_user_role = spc.user_role.id`
  const { rows } = await db_connector.query(query);
  return rows;
}

export const updateUser = async (id, user_name, first_name, last_name, phone, user_role_id) => {
  const queryParams = [id, user_name.toLowerCase(), first_name, last_name, phone, user_role_id];

  const query = `UPDATE spc.user SET
  user_name = $2,
  first_name = $3,
  last_name=$4,
  tel=$5,
  id_user_role=$6
  WHERE spc.user.id = $1
  RETURNING id`
  const resId = await db_connector.query(query, queryParams);
  return resId;
}

export const deleteUser = async (id) => {
  const queryParams = [id];
  const query = `DELETE FROM spc.user WHERE spc.user.id=$1 RETURNING id`
  const resId = await db_connector.query(query, queryParams);
  return resId;
}


