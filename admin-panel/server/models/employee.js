"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Employee.init(
    {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      title: DataTypes.STRING,
      birth_date: DataTypes.DATE,
      hire_date: DataTypes.DATE,
      address: DataTypes.STRING,
      city: DataTypes.STRING,
      region: DataTypes.STRING,
      photo: DataTypes.BLOB,
      home_phone: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Employee",
    }
  );
  return Employee;
};
