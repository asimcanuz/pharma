"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Companies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Companies.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      city: DataTypes.STRING,
      region: DataTypes.STRING,
      postal_code: DataTypes.INTEGER,
      country_id: DataTypes.INTEGER,
      phone: DataTypes.STRING,
      fax: DataTypes.STRING,
      company_type_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Companies",
    }
  );
  return Companies;
};
