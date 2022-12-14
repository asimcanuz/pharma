const Employee = require("../models").Employee;

const getAllEmployees = async (req, res) => {
  await Employee.findAll()
    .then((employees) => {
      res.status(200).send(employees);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(err.code)
        .send({ message: err.message || "Something went wrong" });
    });
};

const getEmployeeById = async (req, res) => {
  const { id } = req.params;
  await Employee.findOne({ where: { id } })
    .then((emp) => {
      if (!emp) return res.status(404).send({ message: "Employee Not found." });
      res.status(200).send(emp);
    })
    .catch((err) => res.status(err.code).send({ message: err.message }));
};

const getEmployeeGivingDate = async (req, res) => {
  const { startDate, endDate } = req.body;
  if (!startDate) return res.status(500).send({ message: "Enter start date" });
  const where = {
    from: { createdAt: [startDate, endDate] },
  };
  await Employee.findAll(where)
    .then((emps) => {
      if (!emps)
        return res.status(404).send({ message: "Employee Not found." });
      res.status(200).send(emps);
    })
    .catch((err) => res.status(err.code).send({ message: err.message }));
};

const addNewEmployee = async (req, res) => {
  try {
    const body = req.body;
    if (!body.firstname)
      return res.status(400).send({ message: "firstname is required" });
    if (!body.lastname)
      return res.status(400).send({ message: "lastname is required" });

    await Employee.create(body).then((employee) => {
      res.status(201).send(employee);
    });
  } catch (error) {
    res.status(error.code).send({
      message: error.message || "Something went wrong",
    });
  }
};

const updateEmployee = async (req, res) => {
  console.log(req.params.id);
  try {
    const { id: empId } = req.params;
    const body = req.body;
    await Employee.update(body, { where: { id: empId } });
    res.status(200).send({ message: "user updated" });
  } catch (error) {
    res
      .status(error.code)
      .send({ message: error.message || "Something went wrong" });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id: empId } = req.params;
    await Employee.destroy({ where: { id: empId } }).then((num) => {
      if (num === 1) {
        res.send({ message: "Employe deleted" });
      } else {
        res.send({ message: "Cannot delete Emloyee" });
      }
    });
  } catch (error) {
    res
      .status(error.code)
      .send({ message: error.message || "Something went wrong" });
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  getEmployeeGivingDate,
  addNewEmployee,
  updateEmployee,
  deleteEmployee,
};
