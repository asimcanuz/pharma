var express = require("express");
var router = express.Router();
var employeeControllers = require("../controllers/employees.controller");
// get requets

//get all employees
router.get("/", employeeControllers.getAllEmployees);

//get employee by id
router.get("/:id", employeeControllers.getEmployeeById);
//get employees date
router.get("/date", employeeControllers.getEmployeeGivingDate);

// post requests

router.post("/add", employeeControllers.addNewEmployee);

// put

router.put("/update/:id", employeeControllers.updateEmployee);

// delete
router.delete("/delete/:id", employeeControllers.deleteEmployee);

module.exports = router;
