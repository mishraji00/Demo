const db = require('../config/db');
const logger =require('../Controllers/loggerFile')

async function getAllEmployees() {
  const sqlQueryGetAll ='SELECT * FROM employees';
  try {
    const [rows] = await db.query(sqlQueryGetAll);
    logger.crudLogger.info(`Sql Query: ${sqlQueryGetAll}`);

    return rows;

  } catch (error) {
    logger.crudLogger.error(`Sql Query: ${sqlQueryGetAll}`);
    throw error;
  }
}

async function getEmployeeById(id) {
  const sqlQueryGetID = (`SELECT * FROM employees WHERE EmpID = ${id}` );
  try {
    const [rows] = await db.query(sqlQueryGetID);
    logger.crudLogger.info(`Sql Query: ${sqlQueryGetID}`);

    return rows;
  } catch (error) {
    logger.crudLogger.info(`Sql Query: ${sqlQueryGetID}`);

    throw error;
  }
}

async function insertEmployee(employee) {


  

  try {
    const sqlQueryInsert = `INSERT INTO employees (EmpID, EmpName, EmpSal) VALUES (${employee.EmpID}, '${employee.EmpName}', ${employee.EmpSal})`;
    const [result] = await db.query(sqlQueryInsert);
    logger.crudLogger.info(`Sql Query: ${sqlQueryInsert}`);

     return result.EmpID;

  } catch (error) {
    logger.crudLogger.info(`Sql Query: ${sqlQueryInsert}`);

    throw error;
  }
}

async function updateEmployee(id, employee) {

const sqlQueryUpdate = `UPDATE employees SET EmpName ='${employee.EmpName}' , EmpSal =${employee.EmpSal} WHERE EmpID = ${id}`
  try {
    await db.query(sqlQueryUpdate);
    logger.crudLogger.info(`Sql Query: ${sqlQueryUpdate}`);

    return true;
  } catch (error) {
    logger.crudLogger.info(`Sql Query: ${sqlQueryUpdate}`);

    throw error;
  }
}
async function deleteEmployee(id) {
  const sqlQueryDelete = `DELETE FROM employees WHERE EmpID =${id}`;
  try {
    await db.query(sqlQueryDelete);
    logger.crudLogger.info(`Sql Query: ${sqlQueryDelete}`);

    return true;
  } catch (error) {
    logger.crudLogger.info(`Sql Query: ${sqlQueryDelete}`);

    throw error;
  }
}

module.exports = {
  getAllEmployees,
  getEmployeeById,
  insertEmployee,
  updateEmployee,
  deleteEmployee,
  
};
