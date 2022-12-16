'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Products.init({
    name: DataTypes.STRING,
    supplier_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    quantity_per_unit: DataTypes.INTEGER,
    unit_net_price: DataTypes.DOUBLE,
    unit_gross_price: DataTypes.DOUBLE,
    units_in_stock: DataTypes.INTEGER,
    units_in_order: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};