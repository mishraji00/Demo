const express = require('express');
const router = express.Router();

const EmployeeController = require('../Controllers/empController');

router.get('/employees/fetch', EmployeeController.getAllEmployees);
router.get('/employees/fetch/:id', EmployeeController.getEmployeeById);
router.post('/employees/insert', EmployeeController.insertEmployee);
router.put('/employees/update/:id', EmployeeController.updateEmployee);
router.delete('/employees/delete/:id', EmployeeController.deleteEmployee);

module.exports = router;
