const db = require('../config/db');
const {log} =require('../config/loggerFile')


async function getAllUsers() {
  const sqlQueryGetAll = `Select id,first_name,last_name,gender,email,number from registration`;
  try {
  const rows = await db.query(sqlQueryGetAll);
  log.info(`Sql Query: ${sqlQueryGetAll}`);

  return rows[0];

} catch (error) {
  log.error(`Sql Query: ${sqlQueryGetAll}`);
  throw error;
}
}

async function getUserById(id) {
    const sqlQueryGetById =`Select id,first_name,last_name,gender,email,number from registration where id = ${id}`;
    try {
    const rows = await db.query(sqlQueryGetById);
    log.info(`Sql Query: ${sqlQueryGetById}`);

    return rows[0];
  } catch (error) {
    log.error(`Sql Query: ${sqlQueryGetById}`);

    throw error;
  }
}

async function insertUser(data) {


  

  try {
    const sqlQueryInsert = `INSERT INTO registration (first_name, last_name, gender, email, password, number) VALUES ('${data.first_name}', '${data.last_name}', '${data.gender}', '${data.email}', '${data.password}', ${data.number})`;
    const result = await db.query(sqlQueryInsert);
    log.info(`Sql Query: ${sqlQueryInsert}`);

     return result[0];

  } catch (error) {
    log.error(`Sql Query: ${sqlQueryInsert}`);

    throw error;
  }
}

async function updateUser(id, data) {

    const sqlQueryUpdateUser = `UPDATE registration SET first_name ='${data.first_name}', last_name ='${data.last_name}', gender = '${data.gender}', email ='${data.email}',password ='${data.password}', number =${data.number} WHERE id = ${id}`
    try {
    const results = await db.query(sqlQueryUpdateUser);
    log.info(`Sql Query: ${sqlQueryUpdateUser}`);

    return results[0];
  } catch (error) {
    log.error(`Sql Query: ${sqlQueryUpdateUser}`);

    throw error;
  }
}
async function deleteUser(id) {
    const sqlQueryDeleteUser =`delete from registration where id = ${id}`;
    try {
    const results =await db.query(sqlQueryDeleteUser);
    log.info(`Sql Query: ${sqlQueryDeleteUser}`);

    return results[0];
  } catch (error) {
    log.error(`Sql Query: ${sqlQueryDeleteUser}`);

    throw error;
  }
}
async function getUserByEmail(email) {
    const sqlQueryGetByEmail = (`select * from registration where email = ?`);
    try {
      const [results] = await db.query(sqlQueryGetByEmail,[email]);
      log.info(`Sql Query: ${sqlQueryGetByEmail}`);
      return results[0];
    }catch(error){
        log.error(`Sql Query: ${sqlQueryGetByEmail}`);
        throw error;

    }
}


module.exports = {
  getAllUsers,
  getUserById,
  insertUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  
};
