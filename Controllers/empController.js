const EmployeeModel = require('../models/empModel');
const logger =require('../Controllers/loggerFile')

async function getAllEmployees(req, res) {
  try {
    const queryParameters = req.query;
    const employees = await EmployeeModel.getAllEmployees();

    logger.crudLogger.info({
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      message: 'Successfully fetched the employees',
      queryParameters,
      requestBody: req.body,
      //sqlQuery: 'SELECT * FROM employees',
      responseBody: employees, // Include the response body in the log
    });

    if (employees) {
      res.status(200).json(employees);
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (error) {
    logger.crudLogger.error({
      method: req.method,
      url: req.originalUrl,
      statusCode: 500,
      message: 'Error while fetching employees',
      error: error.message,
      requestBody: req.body,
    });

    res.status(500).json({ error: 'Could not fetch employees', details: error.message });
  }
}

async function getEmployeeById(req, res) {
  const id = req.params.id;
  try {
    const employees = await EmployeeModel.getEmployeeById(id);

    if (!employees || employees.length === 0) {
      logger.crudLogger.error({
        method: req.method,
        url: req.originalUrl,
        statusCode: 404,
        message: `Employee with ID ${id} not found`, // Include the actual ID value
        error: 'Employee not found',
        //sqlQuery:EmployeeModel.getEmployeeById.sqlQuery, // Include the actual ID value in the SQL query
        requestBody: req.body,
      });

      res.status(404).json({ error: 'Employee not found' });
    } else {
      logger.crudLogger.info({
        method: req.method,
        url: req.originalUrl,
        statusCode: res.statusCode,
        message: 'Successfully fetched the employee',
        requestBody: req.body,
        responseBody: employees, // Include the response body in the log
        //sqlQuery: EmployeeModel.getEmployeeById.sqlQuery, // Include the actual ID value in the SQL query

      });

      res.status(200).json(employees);
    }
  } catch (error) {
    logger.crudLogger.error({
      method: req.method,
      url: req.originalUrl,
      statusCode: 500,
      message: 'Error while fetching employee',
      error: error.message,
      queryParameters: { EmpID: id },
      requestBody: req.body,
     // sqlQuery: EmployeeModel.getEmployeeById.sqlQuery, // Include the actual ID value in the SQL query

    });

    res.status(500).json({ error: 'Could not fetch employee', details: error.message });
  }
}

async function insertEmployee(req, res) {
  
  const employee = req.body;

  try {
    const insertId = await EmployeeModel.insertEmployee(employee);

    logger.crudLogger.info({
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      message: 'Employee inserted successfully',
      requestBody: req.body,
     // sqlQuery: EmployeeModel.insertEmployee.sqlQuery,
      responseBody: { insertId }, // Include the response body in the log
    });

    res.status(201).json({ message: 'Employee inserted successfully', insertId });
  } catch (error) {
    logger.crudLogger.error({
      method: req.method,
      url: req.originalUrl,
      statusCode: 500,
      message: 'Error while inserting employee',
      error: error.message,
      requestBody: req.body,
      //sqlQuery: EmployeeModel.insertEmployee.sqlQuery ,
    });

    res.status(500).json({ error: 'Could not insert employee', details: error.message });
  }
}

async function updateEmployee(req, res) {
  const id = req.params.id;
  const employee = req.body;
  try {
    const isUpdated = await EmployeeModel.updateEmployee(id, employee);

    if (isUpdated) {
      logger.crudLogger.info({
        method: req.method,
        url: req.originalUrl,
        statusCode: res.statusCode,
        message: 'Employee updated successfully',
        requestBody: req.body,
       // sqlQuery:EmployeeModel.updateEmployee.sqlQuery,
      });

      res.status(200).json({ message: 'Employee updated successfully' });
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (error) {
    logger.crudLogger.error({
      method: req.method,
      url: req.originalUrl,
      statusCode:500,
      message: 'Error while updating employee',
      error: error.message,
      requestBody: req.body,
       // sqlQuery: EmployeeModel.updateEmployee.sqlQuery,
    });

    res.status(500).json({ error: 'Could not update employee', details: error.message });
  }
}
async function deleteEmployee(req, res) {
  const id = req.params.id;
  try {
    const isDeleted = await EmployeeModel.deleteEmployee(id);

    if (isDeleted) {
      logger.crudLogger.info({
        method: req.method,      
        url: req.originalUrl,
        statusCode: res.statusCode,
        message: 'Employee deleted successfully',
        requestBody: req.body,
       // sqlQuery: EmployeeModel.deleteEmployee.sqlQuery,
        responseBody: { message: 'Employee deleted successfully' }, // Include the response body in the log
      });

      res.status(200).json({ message: 'Employee deleted successfully' });
    } else {
      logger.crudLogger.error({
        method: req.method,
        url: req.originalUrl,
        statusCode: 404,
        message: 'Employee not found',
        error: 'Employee not found',
        queryParameters: { EmpID: id },
        requestBody: req.body,
      });

      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (error) {
    logger.crudLogger.error({
      method: req.method,
      url: req.originalUrl,
      statusCode: 500,
      message: 'Error while deleting employee',
      error: error.message,
      queryParameters: { EmpID: id },
      requestBody: req.body,
      //sqlQuery:EmployeeModel.deleteEmployee.sqlQuery,
    });

    res.status(500).json({ error: 'Could not delete employee', details: error.message });
  }
}
module.exports = {
  getAllEmployees,
  getEmployeeById,
  insertEmployee,
  updateEmployee,
  deleteEmployee,
};






